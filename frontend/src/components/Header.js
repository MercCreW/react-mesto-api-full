import React from 'react';
import headLogo from "../images/header-logo.svg";

import { Link, useLocation } from 'react-router-dom';
import AuthInfo from './AuthInfo';


function Header({ loggedIn, email, signOut }) {

    const { pathname } = useLocation();
    const linkText = `${pathname === '/signin' ? 'Регистрация' : 'Войти'}`;
    const linkPath = `${pathname === '/signin' ? '/signup' : '/signin'}`;

    return (
        <header className ="header">
            <img className = "header__logo" src={headLogo} alt="Логотип два слова. Место.Россия. В белом исполнении." />
            {loggedIn
            ? (<> 
                <AuthInfo email={email} signOut={signOut} />
              </>) 
              : (<Link to={linkPath} className="header__authLink">{linkText}</Link>)
      }
      </header>
    );
}

export default Header;