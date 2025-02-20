// Importations
import { Link } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

// Components
import { useToken } from '../../context/context';

// Interfaces

// Scss
import './SignIn.scss'

// Datas

// Images

// Composant SVG avec les marqueurs
const SignIn = () => {

  const { login } = useToken()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const sign = () => {
    const data = {
      email: email,
      password: password
    }

    axios.post(`http://localhost:5000/auth/login`, data)
      .then((response) => {
        login(response.data.token)
        navigate("/article")
      })
      .catch((err) => {
        if(err.response.status === 401) {
          console.log("mail ou mot de passe incorrect")
        }
        if(err.response.status === 500) {
          console.log("erreur avec l'api")
        }
      });
  }

  return (
    <div id="signin">
      <h1>Connexion</h1>
      <div id="mail" className="form">
        <label htmlFor="">Mail</label>
        <input type="email" placeholder="exemple@exemple.fr" onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div id="password" className="form">
        <div id="label">
          <label htmlFor="">Mot de passe</label>
          <Link>J'ai oublié mon mot de passe</Link>
        </div>
        <input type="password" placeholder="**********" onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <div id="question">
        <p>Vous n'avez pas de compte ? </p>
        <Link to="/signup">S'inscrire</Link>
      </div>
      <button onClick={sign}>Se connecter</button>
    </div>
  );
};

export default SignIn;