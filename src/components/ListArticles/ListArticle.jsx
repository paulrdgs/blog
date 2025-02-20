// Importations
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Components
import Article from '../Article/Article';

// Interfaces

// Scss
import './ListArticle.scss'

// Datas

// Images

// Composant SVG avec les marqueurs
const ListArticle = () => {

  const [articles, setArticles] = useState([])
  const [pseudolist, setPseudoList] = useState([])

  const [category, setCategory] = useState([])
  const [autor, setAutor] = useState([])
  const [date, setDate] = useState() // filtre article ecrit avant date 

  const [choiceCat, setChoiceCat] = useState("")
  const [choiceName, setChoiceName] = useState("")

  useEffect(() => {
    allList()
  }, [])

  const allList = () => {
    axios.get(`http://localhost:5000/articles`)
      .then((response) => {
        setArticles(response.data)
        setPseudoList(response.data)
        listCat(response.data)
        listName(response.data)
      })
      .catch((err) => {
        console.log("mauvaise requete")
      });
  }

  const listCat = (listarticles) => {
    let cat = []
    listarticles.map((article) => {
      if(!cat.includes(article.category_title)) {
        cat.push(article.category_title)
      }
    })
    setCategory(cat);
  }

  const listName = (listarticles) => {
    let name = []
    listarticles.map((article) => {
      if(!name.includes(article.lastname + ' ' + article.firstname)) {
        name.push(article.lastname + ' ' + article.firstname)
      }
    })
    setAutor(name)
  }

  const changeListArticle = (e, index) => {
    let data = {
      cat: choiceCat,
      name: choiceName
    }

    if(index === 1) {
      setChoiceCat(e.target.value === "all" ? "" : e.target.value)
      data = {
        cat: e.target.value === "all" ? "" : e.target.value,
        name: choiceName
      }
    }
    if(index === 2) {
      setChoiceName(e.target.value === "all" ? "" : e.target.value)
      data = {
        cat: choiceCat,
        name: e.target.value === "all" ? "" : e.target.value
      }
    }
    let newList = []

    if(data.cat !== "" && data.name !== "") {
      articles.map((art) => {        
        const fullname = art.lastname + ' ' + art.firstname
        if(art.category_title === data.cat && fullname === data.name) {
          newList.push(art)
        }      
      })
      setPseudoList(newList)
    }
    else {
      if(data.cat !== "") {
        articles.map((art) => {        
          if(art.category_title === data.cat) {
            newList.push(art)
          }      
        })
        setPseudoList(newList)
      } else {
        if(data.name !== "") {
          articles.map((art) => {        
            const fullname = art.lastname + ' ' + art.firstname
            if(fullname === data.name) {
              newList.push(art)
            }      
          })
          setPseudoList(newList)
        } else {
          allList()
        }
      }
    }
  }

  return (
    <div id="principalpage">
      <div id="filtre">
        <select onChange={(e) => changeListArticle(e, 1)}>
          <option value="all">All</option>
          {
            category.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))
          }
        </select>
        <select onChange={(e) => changeListArticle(e, 2)}>
          <option value="all">All</option>
          {
            autor.map((name, index) => (
              <option key={index} value={name}>{name}</option>
            ))
          }
        </select>
      </div>
      <div id="listArticle">
        {
          pseudolist.map((article, index) => (
            <Article key={index} article={article}/>
          ))
        }
        <Article article={null}/>
      </div>
    </div>
  );
};

export default ListArticle;