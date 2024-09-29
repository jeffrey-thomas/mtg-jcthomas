import React, { useState } from "react"

import './Menu.css'
import { AuthCheck } from "../Auth/AuthCheck/AuthCheck";
import { SignOutLink } from "../Auth/SignOutLink";
import { GoogleSignInButton } from "../Auth/GoogleSignInButton/GoogleSignInButton";
import { Link } from "react-router-dom";


export const Menu = () => {

    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(!open)
    }

    return (
        <div>
            <Link id='menu' to={{}} onClick={toggleMenu}>{open ? 'x' : '≡'}</Link>

            <nav className={open ? 'open' : ''} >
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <AuthCheck
                onAuthorized={<React.Fragment>
                    <Link to='/dashboard'>Dashboard</Link>
                    <SignOutLink/>
                </React.Fragment>
                }
                onUnauthorized={<GoogleSignInButton/>}
            />
            </nav>
        </div>
    )
}