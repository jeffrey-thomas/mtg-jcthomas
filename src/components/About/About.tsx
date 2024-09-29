import React from "react"

import './About.css'

export const About=()=>{

  return (
    <div id='about'>
      <h1>About</h1>
      <p>This is a project for a class that uses React to organize Magic: the Gathering cards.</p>
      <p>Card information is retrieved via the <a href='https://scryfall.com/docs/api'>Scryfall API.</a></p>
      <p>Authenication and user data are stored via Firebase.</p>
    </div>
  )
}
