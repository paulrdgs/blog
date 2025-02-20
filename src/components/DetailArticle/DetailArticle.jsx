// Importations
import React, { useEffect, useState, useRef  } from 'react';
import { useNavigate, useParams } from "react-router";
import axios from 'axios';

// Components
import { useToken } from '../../context/context';

// Interfaces

// Scss
import './DetailArticle.scss'

// Datas

// Images

// Composant SVG avec les marqueurs
const DetailArticle = () => {

  const { id } = useParams();

  const { isAuthenticated } = useToken()
  const navigate = useNavigate()

  const [article, setArticle] = useState({})
  const textareaRef = useRef(null);
  const [update, setUpdate] = useState(false)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState(1)

  useEffect(() => {
    console.log(id)
    if(id !== "0") {
      recupDetailArticle()
    }
  }, [])

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto'; // Réinitialise la hauteur avant de l'ajuster
      textarea.style.height = `${textarea.scrollHeight}px`; // Ajuste la hauteur en fonction du contenu
    }
  }, [article.content]);

  const recupDetailArticle = () => {
    axios.get(`http://localhost:5000/articles/${id}`)
      .then((response) => {
        setArticle(response.data)
        setTitle(response.data.title)
        setContent(response.data.content)
        console.log(response.data)
      })
      .catch((err) => {
        console.log("mauvaise requete")
      });
  }

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

  const deleteArticle = () => {
    let config = {
      method: 'delete',
      maxBodyLength: Infinity,
      url: `http://localhost:5000/articles/${id}`,
      headers: { 
        'Authorization': `Bearer ${isAuthenticated}`
      }
    };
    
    axios.request(config)
    .then(() => {
      navigate("/")
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const updateArticle = () => {
    let data = JSON.stringify({
      "title": title,
      "content": content,
      "category_id": article.category_id
    });
    
    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: `http://localhost:5000/articles/${id}`,
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${isAuthenticated}`
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      setUpdate(!update)
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const createarticle = () => {
    let data = JSON.stringify({
      "title": title,
      "content": content,
      "category_id": category
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/articles',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${isAuthenticated}`
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      navigate("/")
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
    {
      id === "0" ? (
        <div id="block">
          <div id="theArticle">
            <input type="text" value={ title } placeholder="votre titre" id="titre update" onChange={(e) => setTitle(e.target.value)}/> 
            <textarea id="texte-limite update" placeholder="votre content" value={ content } onChange={(e) => setContent(e.target.value)}/>
              <select onChange={(e) => setCategory(Number(e.target.value))}>
                <option value="2">Article</option>
                <option value="1">Tuto</option>
              </select>
              <button onClick={createarticle}>Créer</button>
          </div>
        </div>
      ) : (
        <div id="block">
          <div id="theArticle">
            <div id="title">
              <input disabled={!update} type="text" value={ title } id={update ? "titre update" : "titre"} onChange={(e) => setTitle(e.target.value)}/> 
              <div id="listbtn">
                <button id="up" onClick={update ? updateArticle : () => setUpdate(!update)}>{ update ? "Valider" : "Modifier" }</button>
                <button id="del" onClick={deleteArticle}>supprimer</button>
              </div>
            </div>
            <textarea disabled={!update} ref={textareaRef} id={update ? "texte-limite update" : "texte-limite"} value={ content } onChange={(e) => setContent(e.target.value)}/>
            <div id="bottom">
              <p> { article.lastname } { article.firstname } </p>
              <p>le { formatDate(article.created_at) } </p>
            </div>
          </div>
        </div>
      )
    }
    </>
  );
};

export default DetailArticle;