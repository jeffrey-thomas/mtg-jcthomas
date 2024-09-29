import { Link, useNavigate } from "react-router-dom";
import { Firebase } from "../../../Firebase";
import React from "react";

type SignOutLinkProps = { path?:string};

//Button to sign out
export const SignOutLink = ({path='/'}:SignOutLinkProps)=>{

    const nav = useNavigate();
    // const dispatch = useDispatch()

    const signout = async()=>{
        Firebase.signOut().then(
            ()=>{
                nav(path);
                // dispatch(clearCollection())
                // dispatch(clearCardData())
            }
        )
    }

    return (
            <Link to={{}} onClick={signout}>Sign Out</Link>
        
    )
}