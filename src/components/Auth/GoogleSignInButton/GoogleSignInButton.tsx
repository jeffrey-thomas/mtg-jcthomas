/// <reference types="vite-plugin-svgr/client" />
import { Firebase } from "../../../Firebase"
import GLogo from '../../../assets/GoogleLogo.svg?react'
import React from "react"

import './GoogleSignInButton.css'

export const GoogleSignInButton = () => {

    // const dispatch = useDispatch<AppDispatch>()

    const signin = async () => {
        Firebase.signIn()
    }

    return (
        <button onClick={signin} className='signin'>
            <div id='GLogo'><GLogo /></div>
            Sign in with Google
        </button>
    )
}