import { ReactNode, useEffect, useState } from "react"
import { Firebase } from "../../../Firebase"
import React from "react";

interface CheckAuthProps {
    onAuthorized?: ReactNode,
    onUnauthorized?: ReactNode
}

export const AuthCheck = (props: CheckAuthProps) => {
    
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        setAuthorized(Firebase.auth.currentUser!=null)
        Firebase.auth.onAuthStateChanged(
            (user)=>{
                setAuthorized(Firebase.auth.currentUser!=null)
            }
        );
      }, []);

    return (
        authorized ? props.onAuthorized : props.onUnauthorized
    )
}