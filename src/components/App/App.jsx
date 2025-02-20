// Importations
import React from 'react';
import { Routes, Route } from 'react-router';
import { Navigate } from 'react-router';

// Components
import { useToken } from '../../context/context';
import Container from '../Container/Container';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import ListArticle from '../ListArticles/ListArticle';
import DetailArticle from '../DetailArticle/DetailArticle';

// Interfaces

// Scss
import './App.scss'

// Datas

// Images

// Composant SVG avec les marqueurs
const App = () => {

  const { isAuthenticated } = useToken()

  return (
    <Routes>
        <Route path="/" element={<Navigate to="/article" />} />

        {/* Protéger la route /article et ses sous-routes */}
        <Route path="/article/*" element={isAuthenticated ? <Container /> : <Navigate to="/signin" />}>
          <Route index element={<ListArticle />} /> {/* Affiche la liste des articles par défaut */}
          <Route path=":id" element={<DetailArticle />} /> {/* Page de détail d’un article */}
        </Route>

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
  );
};

export default App;