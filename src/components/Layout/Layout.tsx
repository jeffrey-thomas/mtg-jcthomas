import React from "react"
import { Outlet } from "react-router-dom"
import { Logo } from "../Logo"
import { Menu } from "../Menu"

import './Layout.css'

//React component for the basic layout of the app
export const Layout = ()=>{


    return (
        <div id='app'>
            <header>
                <div id='title'><Logo></Logo><h1>MtG Organizer</h1></div>
                <Menu></Menu>
            </header>
            <main><Outlet/></main>
            <footer>
                &copy; 2024 - Jeff Thomas    
            </footer>   
        </div>
    )
}