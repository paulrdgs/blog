// Importations
import React from 'react';
import { Outlet } from 'react-router';

// Components
import Header from '../Header/Header';

// Interfaces

// Scss
import './Container.scss'

// Datas

// Images

// Composant SVG avec les marqueurs
const Container = () => {

  return (
    <div id="container">
      <Header />
      <Outlet />
    </div>
  );
};

export default Container;