import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminRelation = () => {
  const [userId, setUserId] = useState("");
  const [childId, setChildId] = useState("");
  const [users, setUsers] = useState([]);
  const [children, setChildren] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsersAndChildren = async () => {
      try {
        const usersResponse = await axios.get(
          "http://localhost:3000/api/users/getallusers"
        );
        const childrenResponse = await axios.get(
          "http://localhost:3000/api/children/getallchildren"
        );

        console.log("Users response:", usersResponse.data);
        console.log("Children response:", childrenResponse.data);

        setUsers(usersResponse.data.data);
        setChildren(childrenResponse.data.data);
      } catch (error) {
        setMessage("Erreur lors du chargement des données");
      }
    };

    fetchUsersAndChildren();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/associate-child",
        {
          userId,
          childId,
        }
      );
      setMessage(`Relation établie: ${response.data.message}`);

      setUserId("");
      setChildId("");
    } catch (error) {
      setMessage(error.response.data.error || "Une erreur s'est produite");
    }
  };

  return (
    <div>
      <h2 style={{ margin: "15px 0px", textAlign: "center" }}>
        Associer un enfant à un utilisateur
      </h2>
      <form onSubmit={handleSubmit}>
        <div>
          {message && (
            <p style={{ textAlign: "center", color: "red", fontWeight: "800" }}>
              {message}
            </p>
          )}
          <label style={{ margin: "15px 0px" }}>Parent/Grand-Parent:</label>
          <select value={userId} onChange={(e) => setUserId(e.target.value)}>
            <option value="">Sélectionner un utilisateur</option>
            {Array.isArray(users) &&
              users.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                >{`${user.prenom} ${user.nom} (ID: ${user.id})`}</option>
              ))}
          </select>
        </div>
        <div>
          <label>Enfant:</label>
          <select value={childId} onChange={(e) => setChildId(e.target.value)}>
            <option value="">Sélectionner un enfant</option>
            {Array.isArray(children) &&
              children.map((child) => (
                <option
                  key={child.id}
                  value={child.id}
                >{`${child.prenom} ${child.nom} (ID: ${child.id})`}</option>
              ))}
          </select>
        </div>
        <button type="submit">Associer l'enfant à l'utilisateur</button>
      </form>

      <Link to="/admindashboard">
        <button
          style={{
            textAlign: "center",
            marginLeft: "15px",
            marginTop: "15px",
            position: "fixed",
            bottom: "80px",
          }}
        >
          Retour à l'Admin Dashboard
        </button>
      </Link>
    </div>
  );
};

export default AdminRelation;
