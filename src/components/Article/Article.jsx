// Importations
import React from 'react';
import { Link } from 'react-router';

// Components

// Interfaces

// Scss
import './Article.scss'

// Datas

// Images

// Composant SVG avec les marqueurs
const Article = ({article}) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).replace(",", " à");
  };

  return (
    <>
      {
        article != null ? (
          <Link to={`/article/${article.id}`} id="article">
            <h3> { article.title } </h3>
              <div id="texte-limite">
                { article.content }
              </div>
              <div id="bottom">
                <p> { article.lastname } { article.firstname } </p>
                <p>le { formatDate(article.created_at) } </p>
              </div>
          </Link>
        ) : (
          <Link to="/article/0" id="createArticle">
            <p>+</p>
            <p>Créer un article</p>
          </Link>
        )
      }
    </>
  );
};

export default Article;