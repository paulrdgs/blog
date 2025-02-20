// Importations
import React from 'react';
import { NavLink } from 'react-router';

// Components
import { useToken } from '../../context/context';

// Interfaces

// Scss
import './Header.scss'

// Datas

// Images

// Composant SVG avec les marqueurs
const Header = () => {

  const { logout } = useToken()

  const deconnexion = () => {
    logout()
  }

  return (
    <div id="header">
      <div id="name">Votre nom</div>
      <div id="link">
        <NavLink to="/article" className="oneLink">Articles</NavLink>
      </div>
      <button onClick={deconnexion}>Déconnexion</button>
    </div>
  );
};

export default Header;