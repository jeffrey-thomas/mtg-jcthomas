
import {FormProvider, useForm } from 'react-hook-form';

import React from "react";
import { Firestore } from '../../../Firebase/Firestore';
import { Firebase } from '../../../Firebase';
import { FormInput } from '../../FormInput/FormInput';
import { Dialog } from '../Dialog';


interface CreateDeckProps{
    open:boolean;
    process:(name:string)=>void;
    onClose:()=>void;
    onError:(message:string)=>void;
    onSuccess:(message:string)=>void;
}

interface CreateDeckFormState{
    name:string,
}

export const CreateDeck = (props:CreateDeckProps) =>{

    const methods = useForm<CreateDeckFormState>({});
    const {handleSubmit} = methods;

    const user = Firebase.useUser()

    const onSubmit = async(data:CreateDeckFormState) => {
        if(!user)
            props.onError('Error! User is not authenticated.')
        else{
            await props.process(data.name)   
        }    
        
        props.onClose()
    }



    return(
        <Dialog>
            <h2>Create Deck</h2>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormInput field='name' placeholder='Enter Deck Name' required>Deck Name</FormInput>
                    <button type='submit'>Create</button>
                    <br/>
                    <button onClick={props.onClose}>cancel</button>
                    
                </form>
            </FormProvider>
        </Dialog>
    );
}