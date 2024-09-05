import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import logo from "/logo.svg";
import { Link } from "react-router-dom";
import "../index.css";
import useSignIn from "react-auth-kit/hooks/useSignIn";

const LOGIN_URL = "http://127.0.0.1:3000/login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        { email, password },
        { withCredentials: true }
      );
      if (response.status === 200) {
        const signInSuccess = signIn({
          auth: {
            token: response.data.Token,
            type: "Bearer",
          },
        });
        console.log("SignIn Success:", signInSuccess);
        if (signInSuccess) {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Pas de réponse du serveur");
      } else if (err.response?.status === 401) {
        setErrMsg("Mail / Mot de passe invalide");
      } else {
        setErrMsg("Connexion échoué");
      }
    }
  };

  return (
    <div className="main--content">
      <img src={logo} alt="Logo" />
      <form onSubmit={handleSubmit}>
        {errMsg && <p className="errmsg">{errMsg}</p>}
        <p className="login-text">Adresse e-mail</p>
        <input
          type="text"
          className="login"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <p className="login-text">Mot de passe</p>
        <input
          type="password"
          className="login"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Connexion</button>
        <p className="login-text">
          Vous n'avez pas encore de compte ?
          <Link to="/register">
            <p style={{ color: "red", fontWeight: '700' }}>Inscrivez-vous</p>
          </Link>
          <Link to="#">
            <p style={{ color: "gray", fontWeight: '700', opacity: '70%' }}>Mot de passe oublié ?</p>
          </Link>
        </p>
      </form>
      <footer>
        <Link to="/Admindashboard">
          <p style={{ textAlign: "center", marginTop: "30px", color: "gray" }}>
            Admin Panel
          </p>
        </Link>
      </footer>
    </div>
  );
}
