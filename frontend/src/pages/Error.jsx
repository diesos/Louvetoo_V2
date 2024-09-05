import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "./loading.json";

const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "16px",
      }}
    >
      <p style={{ fontSize: "36px", fontWeight: "700" }}>Erreur 404</p>
      <p style={{ fontSize: "36px", fontWeight: "700" }}>Page non trouvée</p>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: 300, height: 300 }}
      />
      <strong>Retour à la page d'accueil...</strong>
    </div>
  );
};

export default ErrorPage;
