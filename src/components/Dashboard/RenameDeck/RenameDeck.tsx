
import {FormProvider, useForm } from 'react-hook-form';

import React from "react";
import { Firestore } from '../../../Firebase/Firestore';
import { Firebase } from '../../../Firebase';
import { FormInput } from '../../FormInput/FormInput';
import { Dialog } from '../Dialog';


interface RenameDeckProps{
    open:boolean;
    oldName:string;
    process:(next:string)=>void;
    onClose:()=>void;
    onError:(message:string)=>void;
    onSuccess:(message:string)=>void;
}

interface RenameDeckFormState{
    name:string,
}

//Dialog for renaming a deck
export const RenameDeck = (props:RenameDeckProps) =>{

    const methods = useForm<RenameDeckFormState>({});
    const {handleSubmit} = methods;

    const user = Firebase.useUser()

    const onSubmit = async(data:RenameDeckFormState) => {
        if(!user)
            props.onError('Error! User is not authenticated.')
        else{
            await props.process(data.name)  
        }    
        
        props.onClose()
    }



    return(
        <Dialog>
            <h2>Rename Deck</h2>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormInput field='name' defaultValue={props.oldName} required>Deck Name</FormInput>
                    <button type='submit'>Rename</button>
                    <br/>
                    <button onClick={props.onClose}>cancel</button>
                    
                </form>
            </FormProvider>
        </Dialog>
    );
}