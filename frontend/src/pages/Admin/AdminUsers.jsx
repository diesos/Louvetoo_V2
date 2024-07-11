import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios.js";
import UserCards from "../../Component/UserCards.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlus,
  faTrashCan,
  faUsersViewfinder,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const AdminUsers = () => {
  const [formData, setFormData] = useState({
    id: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    telephone: "",
    role: "parent",
  });

  const [successData, setSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [currentAction, setCurrentAction] = useState("add");
  const [suggestions, setSuggestions] = useState([]);
  const [succesDelete, setSuccesDelete] = useState(null);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Fetch suggestions based on firstname or lastname
    if (name === "firstname" || name === "lastname") {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/search?prenom=${value}`
        );
        setSuggestions(response.data.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }
    if (name === "firstname" && value === "") {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData({
      ...formData,
      id: suggestion.id,
      firstname: suggestion.prenom,
      lastname: suggestion.nom,
      email: suggestion.email,
      password: suggestion.password,
      telephone: suggestion.telephone,
      role: suggestion.role,
    });
    setSuggestions([]); // Hide suggestions after click
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      prenom: formData.firstname,
      nom: formData.lastname,
      email: formData.email,
      password: formData.password,
      telephone: formData.telephone,
      role: formData.role,
    };

    try {
      let response;
      if (currentAction === "edit") {
        response = await axios.put(
          `http://localhost:3000/api/users/updateuser/${formData.id}`,
          data
        );
      } else if (currentAction === "add") {
        response = await axios.post(
          "http://localhost:3000/api/users/adduser",
          data
        );
      }
      console.log(response.data); // Log response data
      setSuccessData({
        message: response.data.message,
        data: response.data.data,
      });
      setFormData({
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        telephone: "",
        role: "parent",
      });
      setCurrentAction("add");
      setErrorMessage(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage(error.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/users/deleteuser/${formData.id}`
      );
      console.log(response.data); // Log response data
      setSuccessData({
        message: response.data.message + " " + response.data.data.nom + " " + response.data.data.prenom + " avec succès ✅",
      });
      setFormData({
        id: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        telephone: "",
        role: "parent",
      });
      setCurrentAction("add");
      setErrorMessage(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      setErrorMessage(error.message);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/users/getallusers"
      );
      console.log(response.data); // Log response data
      setAllUsers(response.data.data);
      setErrorMessage(null);
    } catch (error) {
      console.error("Error fetching all users:", error);
      setErrorMessage(error.message);
    }
  };

  const fetchUserById = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/getuser/${formData.id}`
      );
      console.log(response.data); // Log response data
      setSuccessData({
        message: response.data.message,
        data: response.data.data,
      });
      setErrorMessage(null);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      setErrorMessage(error.response.data.error);
    }
  };

  const handleUserSelection = (e) => {
    const selectedUserId = e.target.value;
    if (selectedUserId) {
      const selectedUser = allUsers.find(user => user.id === parseInt(selectedUserId));
      if (selectedUser) {
        setFormData({
          id: selectedUser.id,
          firstname: selectedUser.prenom,
          lastname: selectedUser.nom,
          email: selectedUser.email,
          password: selectedUser.password,
          telephone: selectedUser.telephone,
          role: selectedUser.role,
        });
      }
    }
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button onClick={() => setCurrentAction("add")}>
          <FontAwesomeIcon style={{ margin: "0px 10px" }} icon={faPlus} />
          Ajouter un Utilisateur
        </button>
        <button onClick={() => setCurrentAction("edit")}>
          <FontAwesomeIcon style={{ margin: "0px 10px" }} icon={faEdit} />
          Éditer un Utilisateur
        </button>
        <button onClick={() => setCurrentAction("delete")}>
          <FontAwesomeIcon style={{ margin: "0px 10px" }} icon={faTrashCan} />
          Supprimer un Utilisateur
        </button>
        <button onClick={() => setCurrentAction("getAll")}>
          <FontAwesomeIcon
            style={{ margin: "0px 10px" }}
            icon={faUsersViewfinder}
          />
          Voir tous les Utilisateurs
        </button>
        <button onClick={() => setCurrentAction("getById")}>
          <FontAwesomeIcon
            style={{ margin: "0px 10px" }}
            icon={faMagnifyingGlass}
          />
          Rechercher un Utilisateur
        </button>
      </div>
      <h1 style={{ textAlign: "center", margin: "15px" }}>
        {currentAction === "edit"
          ? "Modifier un Utilisateur"
          : currentAction === "delete"
          ? "Supprimer un Utilisateur"
          : currentAction === "add"
          ? "Ajouter un Utilisateur"
          : currentAction === "getById"
          ? "Rechercher un Utilisateur"
          : ""}
        {currentAction === "getAll" ? "Tous les Utilisateurs" : ""}
      </h1>

      {successData && (
        <div
          className="popup"
          style={{
            border: "1px solid #000",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          <p>{successData.message}</p>
          {successData.data && (
            <>
              <p>Résultat:</p>
              <div>
                <UserCards
                    key={successData.data.id}
                    id={successData.data.id}
                    prenom={successData.data.prenom}
                    nom={successData.data.nom}
                    email={successData.data.email}
                    telephone={successData.data.telephone}
                    role={successData.data.role}
                  /></div>
            </>
          )}
          <button onClick={() => setSuccessData(null)}>Fermer</button>
        </div>
      )}

      {errorMessage && (
        <div
          className="error-message"
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          <p>Error: {errorMessage}</p>
        </div>
      )}

      {currentAction === "getAll" ? (
        <div style={{ textAlign: "center" }}>
          <button onClick={fetchAllUsers}>Voir tous les Utilisateurs</button>
          <button onClick={() => setAllUsers([])} style={{ margin: "10px" }}>
            Réinitialiser
          </button>

          {allUsers.length > 0 && (
            <div>
              <h2 style={{ margin: "15px" }}>
                Résultat total : {allUsers.length}
              </h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  gap: "30px",
                }}
              >
                {allUsers.map((user) => (
                  <UserCards
                    key={user.id}
                    id={user.id}
                    prenom={user.prenom}
                    nom={user.nom}
                    email={user.email}
                    telephone={user.telephone}
                    role={user.role}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <form
          onSubmit={
            currentAction === "delete"
              ? handleDelete
              : currentAction === "getById"
              ? fetchUserById
              : handleSubmit
          }
        >
          {(currentAction === "edit" ||
            currentAction === "delete" ||
            currentAction === "getById") && (
            <div>
              <label htmlFor="id">ID de l'Utilisateur: </label>
              <select
                id="id"
                name="id"
                value={formData.id}
                onChange={handleUserSelection}
              >
                <option value="">Sélectionner un utilisateur</option>
                {allUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.id} - {user.prenom} {user.nom}
                  </option>
                ))}
              </select>
            </div>
          )}
          {(currentAction === "add" ||
            currentAction === "edit" ||
            currentAction === "getById") && (
            <>
              <div>
                <label htmlFor="firstname">Prénom:</label>
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                />
                {suggestions.length > 0 && (
                  <ul>
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion.prenom} {suggestion.nom}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <label htmlFor="lastname">Nom:</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password">Mot de passe:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="telephone">Téléphone:</label>
                <input
                  type="text"
                  id="telephone"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="role">Rôle:</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="parent">Parent</option>
                  <option value="grand parent">Grand-Parent</option>
                  <option value="staff">Staff</option>
                </select>
              </div>
            </>
          )}
          <button type="submit">
            {currentAction === "edit"
              ? "Modifier"
              : currentAction === "delete"
              ? "Supprimer"
              : currentAction === "add"
              ? "Ajouter"
              : currentAction === "getById"
              ? "Rechercher"
              : ""}
          </button>
        </form>
      )}
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
    </>
  );
};

export default AdminUsers;
