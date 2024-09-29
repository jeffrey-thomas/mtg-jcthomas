import React from 'react';
import { AuthCheck } from '../Auth/AuthCheck/AuthCheck';
import { Logo } from '../Logo/Logo';
import { NavLink } from 'react-router-dom';
import { GoogleSignInButton } from '../Auth/GoogleSignInButton/GoogleSignInButton';

import './Home.css';

export const Home= () => {

  return (

    <div className='home'>
      <Logo></Logo>
      <AuthCheck
        onAuthorized={<NavLink to='/dashboard'>Go to Dashboard</NavLink>}
        onUnauthorized={<GoogleSignInButton/>}
      ></AuthCheck>
    </div>

  )
}
