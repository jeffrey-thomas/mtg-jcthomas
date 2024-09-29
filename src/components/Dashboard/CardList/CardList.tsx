import React from "react";
import { Card } from "../../../Data/Card";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { Deck } from "../../../Data/Deck";
import { CardCollection } from "../../../Data/CardCollection";

import './CardList.css'

export interface CardListProps{
    deck:Deck,
    cards:CardCollection
    increment:(card:string)=>void,
    decrement: (card:string)=>void,
    remove:(card:string)=>void
}

//React component that displays the cards in a deck and controls to change them
export const CardList = ({deck,cards, increment, decrement, remove}:CardListProps)=>{

    return(
        <div key={`list-${deck}`} className = 'card-list'>
            <div className='card-list-header'>Controls</div>
            <div className='card-list-header'>Qty</div>
            <div className='card-list-header'>Name</div>
            <div className='card-list-header'>Type</div>
            <div className='card-list-header'>Text</div>
            <div className='card-list-header'>P</div>
            <div className='card-list-header'>T</div>
            

            {
                Object.keys(deck.cards).map((id, index)=>{
                    const card = cards[id]
                    return(
                        <React.Fragment key={id}>
                            <Link to={{}} className={`card-list-row tooltip-${id} ${index%2==0?'even':'odd'}`}>
                                <div>
                                    <button onClick={()=>{ remove(id) }}>x</button>
                                    <button onClick={()=>{ decrement(id) }}>-</button>
                                    <button onClick={()=>{ increment(id) }}>+</button>
                                </div>
                                <div>{deck.cards[id]}</div>
                                <div>{card.name}</div>
                                <div>{card.type_line}</div>
                                <div>{card.oracle_text}</div>
                                <div>{card.power}</div>
                                <div>{card.toughness}</div>
                                
                                <Tooltip anchorSelect={`.tooltip-${id}`}>
                                    <img src={card.image_uris['small']}></img>
                                </Tooltip>
                            </Link>
                        </React.Fragment>
                    )
                })
            }
        </div>
    )

}