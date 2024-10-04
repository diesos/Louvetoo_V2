import { useState, useEffect } from "react";
import { fetchUserInfo } from "../services/userSelfServices";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Link } from "react-router-dom";

export default function Profile() {
  const token = useAuthHeader();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usersData = await fetchUserInfo(token);
        setUser(usersData);
        console.log(user);
      } catch (error) {
        console.error("Error: Failed to fetch user data :", error);
      } finally {
        setLoading(true);
      }
    };
    if (token) {
      fetchUser();
    }
  }, [token]);

  return (
    <>
      {loading && (
        <div className="main--content">
          <h1>Profil</h1>
          <p>Prénom : {user?.prenom}</p>
          <p>Nom : {user?.nom}</p>
          <p>Email: {user?.email}</p>
          <p>Phone: {user?.telephone}</p>
        </div>
      )}
      <Link to="/dashboard">
        <button
          style={{
            textAlign: "center",
            marginLeft: "15px",
            marginTop: "15px",
            position: "fixed",
            bottom: "80px",
          }}
        >
          Retour au Dashboard
        </button>
      </Link>
    </>
  );
}
