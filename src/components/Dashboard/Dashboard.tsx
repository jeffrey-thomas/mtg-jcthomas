import React, { ChangeEvent, ChangeEventHandler, ReactNode, useEffect, useState } from "react";
import { Firestore } from "../../Firebase/Firestore";
import { Firebase } from "../../Firebase";
import { Deck } from "../../Data/Deck";
import { CardCollection } from "../../Data/CardCollection";
import { CreateDeck } from "./CreateDeck";

import './Dashboard.css'
import { RenameDeck } from "./RenameDeck";
import { CardList } from "./CardList";
import { Search } from "./Search";
import { Card } from "../../Data/Card";
import { AuthCheck } from "../Auth/AuthCheck/AuthCheck";

export const Dashboard = () => {

    const fs = Firestore.useDeckData()

    const [deckSelection, setDeckSelection] = useState<string>('')  //currently selected deck

    const [createOpen, setCreateOpen] = useState(false)
    const [renameOpen, setRenameOpen] = useState(false)
    const [findOpen, setFindOpen] = useState(false)

    //Change deck state when dropdown menu selection changes
    const handleDeckSelection = (event) => {
        setDeckSelection(event.target.value);
    };

    //toggle dialog
    const toggleCreate = () => { setCreateOpen(!createOpen) }
    const toggleRename = () => { setRenameOpen(!renameOpen) }
    const toggleFind = () => { setFindOpen(!findOpen) }


    const handleCreate = async (name: string) => {
        await fs.createDeck(name)
        setDeckSelection(name)
    }

    const handleRename = async (newName: string) => {
        await fs.renameDeck(deckSelection, newName)
        setDeckSelection(newName)
    }

    const handleIncrement = async (card: string) => {
        await fs.increment(deckSelection, card)
    }

    const handleDecrement = async (card: string) => {
        await fs.decrement(deckSelection, card)
    }

    const handleRemove = async (card: string) => {
        await fs.remove(deckSelection, card)
    }

    const handleAddCard = async (card:Card, qty:number)=>{
        await fs.addCard(deckSelection, card, qty)
    }

    //Construct options for the dropdown menu based on data
    const deckOptions = () => {
        let options: ReactNode[] = [
            <option key='' value='' disabled>Select a deck.</option>
        ]
        if (fs.data.decks) {
            Object.keys(fs.data.decks).forEach((name) => {
                options.push(
                    <option key={name} value={name}>{name}</option>
                )
            })
        }
        return options
    }

    return (
        <React.Fragment>
            <AuthCheck 
                onAuthorized={<React.Fragment>
                    <h1>Dashboard</h1>
                    <div className='deck-controls'>
                        <label> Deck:
        
                            <select value={deckSelection} onChange={handleDeckSelection}>
                                {deckOptions()}
                            </select>
        
                            <button onClick={() => {
                                fs.deleteDeck(deckSelection)
                                setDeckSelection('')
                            }
                            }>Delete</button>
        
                            <button onClick={toggleRename}>Rename</button>
        
                        </label>
                        <div>
                            <button onClick={toggleCreate}>Create Deck</button>
                            {
                                fs.data.status == 'complete' && deckSelection &&
                                <button onClick={toggleFind}>Add Card</button>
                            }
                        </div>
        
        
                    </div>
        
                    {fs.data.status == 'complete' && deckSelection != '' &&
                        <CardList
                            deck={fs.data.decks![deckSelection]}
                            cards={fs.data.cards!}
                            increment={handleIncrement}
                            decrement={handleDecrement}
                            remove={handleRemove}
                        ></CardList>
                    }
        
        
                    {createOpen &&
                        <CreateDeck
                            open={createOpen}
                            process={handleCreate}
                            onClose={toggleCreate}
                            onError={(message: string) => console.log(message)}
                            onSuccess={(message: string) => setDeckSelection(message)}
                        />
                    }
        
                    {renameOpen &&
                        <RenameDeck
                            open={createOpen}
                            oldName={deckSelection}
                            process={handleRename}
                            onClose={toggleRename}
                            onError={(message: string) => console.log(message)}
                            onSuccess={(message: string) => console.log(message)}
                        />
                    }
        
                    {findOpen &&
                        <Search
                            open={findOpen}
                            addCard={handleAddCard}
                            onClose={toggleFind}
                            onError={(message: string) => console.log(message)}
                            onSuccess={(message: string) => console.log(message)}
                        />
                    }
                </React.Fragment>
                }
                onUnauthorized={
                    <React.Fragment>
                        <h1>Unauthorized</h1>
                        <h6>You must be signed in to use the dashboard.</h6>
                    </React.Fragment>
                }
            />
        
        </React.Fragment>
    )

}
