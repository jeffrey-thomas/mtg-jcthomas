
import { FormProvider, useForm } from 'react-hook-form';

import React, { useState } from "react";
import { Firestore } from '../../../Firebase/Firestore';
import { Firebase } from '../../../Firebase';
import { FormInput } from '../../FormInput/FormInput';
import { Dialog } from '../Dialog';
import { Card } from '../../../Data/Card';
import { Scryfall } from '../../Scryfall';

import './Search.css'
import { AddCard } from '../AddCard/AddCard';

interface SearchProps {
    open: boolean;
    addCard:(card:Card, qty:number)=>{};
    onClose: () => void;
    onError: (message: string) => void;
    onSuccess: (message: string) => void;
}

interface SearchState {
    name: string,
    set: string
}

export interface searchResult {
    total_cards: number | null,
    has_more: boolean,
    data: Card[] | null
}

const emptyResult = { has_more: false, total_cards: null, data: null }

export const Search = (props: SearchProps) => {

    const methods = useForm<SearchState>({});
    const { handleSubmit } = methods;


    const [results, setResults] = useState<searchResult>(emptyResult)

    const [cardToAdd, setCardToAdd] = useState<Card>();
    const [addCardOpen, setAddCardOpen] = useState(false)
    const handleAddCardOpen = (card: Card) => {
        setCardToAdd(card)
        setAddCardOpen(true)
    }
    const handleAddCarClose = () => { setAddCardOpen(false) }

    const user = Firebase.useUser()

    const onSubmit = async (data: SearchState) => {
        Scryfall.search(data.name, data.set).then(
            (result: searchResult) => {
                if (result)
                    setResults(result);
                else
                    setResults(emptyResult)
            }
        );

    }



    return (
        <Dialog>
            <h2>Search</h2>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormInput field='name' placeholder='Enter search term here' required>Search</FormInput>
                    <FormInput field='set'>Set Code</FormInput>
                    <button type='submit'>Search</button>
                    <br />
                    {results.total_cards ? `Found ${results.total_cards} cards.` : `No results found.`}
                    <br />
                    {results.data ? results.data.map(
                        (card) =>
                            <div key={card.id} className='result'>
                                <button onClick={() => handleAddCardOpen(card)}>Add</button>
                                <div>{`${card.name} (${card.set})`}</div>
                            </div>
                    ) : ''}
                    <br />
                    <button onClick={props.onClose}>Done</button>

                </form>
            </FormProvider>
            {
                        addCardOpen && 
                        <AddCard 
                            open={addCardOpen}
                            card={cardToAdd!}
                            addCard = {props.addCard}
                            onClose={handleAddCarClose}
                            onError={(message:string)=>{console.log(message)}}
                            onSuccess={(message:string)=>{console.log(message)}}
                        />
                    }
        </Dialog>
    );
}