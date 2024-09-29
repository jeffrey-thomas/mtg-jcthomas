import {FormProvider, useForm } from 'react-hook-form';
import { Card } from '../../../Data/Card';
import { Firebase } from '../../../Firebase';
import { Dialog } from '../Dialog';
import React from 'react';
import { FormInput } from '../../FormInput/FormInput';


interface AddCardProps{
    card:Card;
    open:boolean;
    addCard:(card:Card,qty:number)=>{};
    onClose:()=>void;
    onError:(message:string)=>void;
    onSuccess:(message:string)=>void;
}

interface AddCardFormState{
    qty:number
}

export const AddCard = (props:AddCardProps) =>{

    const methods = useForm<AddCardFormState>({});
    const {handleSubmit} = methods;

    const user = Firebase.useUser()
    
    const onSubmit = async(data:AddCardFormState) => {

        if(!user)
            props.onError('Error! User is not authenticated.')
        else
            await props.addCard(props.card,data.qty)

        props.onClose()
    }

    return(

        <Dialog>
            <h2>Add Card</h2>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {
                        props.card.card_faces && !props.card.image_uris &&
                        <div>
                            <img src={props.card.card_faces![0].image_uris!.normal}/>
                            <img src={props.card.card_faces![1].image_uris!.normal}/>
                        </div>
                    }
                    {
                        props.card.image_uris && <img src={props.card.image_uris!.normal}/>
                    }
                    <h3>{props.card.name} - {props.card.set}</h3>
                    <br/>
                    <FormInput field='qty' type='number' defaultValue='1' required>Quantity</FormInput>

                    <button type='submit'>Add Card</button>
                    <br />
                    <button onClick={props.onClose}>Cancel</button>

                </form>
            </FormProvider>
        </Dialog>

    );
}