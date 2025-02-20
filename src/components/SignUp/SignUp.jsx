// Importations
import { Link } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

// Components

// Interfaces

// Scss
import './SignUp.scss'

// Datas

// Images

// Composant SVG avec les marqueurs
const SignUp = () => {

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const navigate = useNavigate()

  const sign = () => {
    if(password === confirmPassword) {
      const data = {
        firstname: firstName,
        lastname: lastName,
        email: email,
        password: password
      }
  
      axios.post(`http://localhost:5000/auth/register`, data)
        .then((response) => {
          navigate("/signin")
        })
        .catch((err) => {
          if(err.response.status === 400) {
            console.log("mauvaise requete")
          }
          if(err.response.status === 409) {
            console.log("email déjà existant")
          }
          if(err.response.status === 500) {
            console.log("erreur avec l'api")
          }
        });
    }
  }

  return (
    <div id="signup">
      <h1>Inscription</h1>
      <div id="name-firstname">
        <div className="form">
          <label htmlFor="">Nom</label>
          <input type="text" placeholder="Dupont" onChange={(e) => setFirstName(e.target.value)}/>
        </div>
        <div className="form">
          <label htmlFor="">Prénom</label>
          <input type="text" placeholder="Jean" onChange={(e) => setLastName(e.target.value)}/>
        </div>
      </div>
      <div className="form">
        <label htmlFor="">Mail</label>
        <input type="email" placeholder="exemple@exemple.fr" onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div className="form">
        <label htmlFor="">Mot de passe</label>
        <input type="password" placeholder="********" onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <div className="form">
        <label htmlFor="">Confirmer votre mot de passe</label>
        <input type="password" placeholder="********" onChange={(e) => setConfirmPassword(e.target.value)}/>
      </div>
      <div id="question">
        <p>Vous avez déjà un compte ?</p>
        <Link to="/signin">Se connecter</Link>
      </div>
      <button onClick={sign}>S'inscrire</button>
    </div>
  );
};

export default SignUp;