import { doc, getDoc, getDocs, collection, setDoc, DocumentReference, addDoc, deleteDoc, updateDoc, deleteField } from "firebase/firestore";
import { Firebase } from "./Firebase";
import { useEffect, useState } from "react";
import { DeckCollection } from "../Data/DeckCollection";
import { CardCollection } from "../Data/CardCollection";
import { Scryfall } from "../components/Scryfall";
import { Card } from "../Data/Card";

export namespace Firestore {

    export interface DeckData {
        status: string,
        decks?: DeckCollection,
        cards?: CardCollection
    }

    const getUsersDecks = async (uid: string) => {
        const docsSnap = await getDocs(collection(Firebase.db, `users/${uid}/decks`));
        let result = {}
        docsSnap.forEach((doc) => {
            result[doc.id] = doc.data()
        });
        return result;
    }

    export const useDeckData = () => {

        const [data, setData] = useState<DeckData>({ status: 'pending' })
        const user = Firebase.useUser()

        let result: DeckData = { status: 'pending' }

        useEffect(() => {
            // declare the async data fetching function
            const retrieveData = async () => {
                if (user) {
                    result = await getData(user.uid)
                    if (result.status == 'not found') {   //User not found in firestore
                        await setDoc(doc(Firebase.db, "users", user.uid), {}) //Create their record
                        result = await getData(user.uid)
                    }
                    if (result.status == 'complete')
                        setData(result)
                }
                else  //User not authenticated
                    setData({ status: "Error: No User ID" })
            }

            retrieveData()
        }, [user])

        const createDeck = async (name: string) => {
            const docRef = doc(Firebase.db, "users", user!.uid, "decks", name)

            //Check that deck doesn't already exist
            const snapshot = await getDoc(docRef);
            if (snapshot.exists())
                throw "A deck with that name already exists."

            await setDoc(docRef, { cards: {} }) //Create their record
            let newData = { ...data }

            if (!newData.decks)
                newData.decks = {}
            newData.decks[name] = { cards: {} }
            setData(newData)
        }

        const deleteDeck = async (name: string) => {
            const docRef = doc(Firebase.db, "users", user!.uid, "decks", name)

            await deleteDoc(docRef) //Delete record

            let newData = { ...data }
            if (!newData.decks)
                return

            delete newData.decks[name]
            setData(newData)
        }

        const renameDeck = async (previous: string, newName: string) => {
            const oldRef = doc(Firebase.db, "users", user!.uid, "decks", previous)
            const snapshot = await getDoc(oldRef)

            if (snapshot && snapshot.exists()) {
                //copy to new record and delete old record
                const deck = snapshot.data()
                const newRef = doc(Firebase.db, "users", user!.uid, "decks", newName)
                await setDoc(newRef, deck)

                let newData = { ...data }
                if (!newData.decks)
                    return

                newData.decks![newName] = newData.decks[previous]
                delete newData.decks[previous]

                await deleteDoc(oldRef)

                setData(newData)
            }
        }

        const addCard = async (deck: string, card: Card, qty:number) => {
            const ref = doc(Firebase.db, "users", user!.uid, "decks", deck)
            const snapshot = await getDoc(ref)

            if (snapshot && snapshot.exists()) {
                //copy to new record and delete old record
                const field = {}
                const id = card.multiverse_ids[0];
                field[`cards.${id}`] = qty
                await updateDoc(ref, field)

                let newData = { ...data }
                if (!newData.decks)
                    return

                newData.decks![deck].cards[id] = qty
                newData.cards![id] = card
                setData(newData)
            }
        }

        const increment = async (deck: string, card: string) => {
            const ref = doc(Firebase.db, "users", user!.uid, "decks", deck)
            const snapshot = await getDoc(ref)

            if (snapshot && snapshot.exists()) {
                //copy to new record and delete old record
                const qty = snapshot.data().cards[card] + 1
                const field = {}
                field[`cards.${card}`] = qty
                await updateDoc(ref, field)

                let newData = { ...data }
                if (!newData.decks)
                    return

                newData.decks![deck].cards[card] = qty
                setData(newData)
            }
        }

        const decrement = async (deck: string, card: string) => {
            const ref = doc(Firebase.db, "users", user!.uid, "decks", deck)
            const snapshot = await getDoc(ref)

            if (snapshot && snapshot.exists()) {
                
                const qty = snapshot.data().cards[card] - 1
                const field = {}
                if (qty > 0)
                    field[`cards.${card}`] = qty
                else
                    field[`cards.${card}`] = deleteField()

                await updateDoc(ref, field)

                let newData = { ...data }
                if (!newData.decks)
                    return
                if (qty > 0)
                    newData.decks![deck].cards[card] = qty
                else
                    delete newData.decks![deck].cards[card]

                setData(newData)
            }
        }
            
        const remove = async (deck: string, card: string) => {
            const ref = doc(Firebase.db, "users", user!.uid, "decks", deck)
            const snapshot = await getDoc(ref)

            if (snapshot && snapshot.exists()) {
                const field = {}
                field[`cards.${card}`] = deleteField()
    
                await updateDoc(ref, field)
    
                let newData = { ...data }
                if (!newData.decks)
                    return

                delete newData.decks![deck].cards[card]
    
                setData(newData)
            }
        }
        

        return {
            data: data,
            createDeck: createDeck,
            deleteDeck: deleteDeck,
            renameDeck: renameDeck,
            increment: increment,
            decrement: decrement,
            remove:remove,
            addCard:addCard
        }
    }

    const getData = async (uid: string): Promise<DeckData> => {
        const docRef = doc(Firebase.db, "users", uid);
        const snapshot = await getDoc(docRef);

        let result: DeckData = { status: 'pending' }
        //User successfully retrieved
        if (snapshot.exists()) {
            result.status = 'complete'
            result.decks = await getUsersDecks(uid)

            const cardIds = Object.keys(result.decks).map((deck) => {
                return Object.keys(result.decks![deck].cards).map((id) => {
                    return parseInt(id)
                })
            }).flat()

            const cardData = await Scryfall.getByIds(cardIds)
            let cards: CardCollection = {}
            cardData?.forEach((card) => {
                cards[card.multiverse_ids[0]] = card
            })
            result.cards = cards
            return result
        }
        else {
            return { status: 'not found' }
        }
    }
}