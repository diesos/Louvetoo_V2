import { useState } from "react";
import { Link } from "react-router-dom";
import axios from '../../api/axios.js';
import ChildCards from "../../Component/ChildCards.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faEdit, faPlus, faPen, faTrashCan, faUsersViewfinder, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const ChildForm = () => {
    const [formData, setFormData] = useState({
        id: "",
        firstname: "",
        lastname: "",
        birthdate: "",
        allergy: "",
        diet: ""
    });

    const [successData, setSuccessData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [allChildren, setAllChildren] = useState([]);
    const [currentAction, setCurrentAction] = useState('add');
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Fetch suggestions based on firstname or lastname
        if (name === 'firstname' || name === 'lastname') {
            try {
                const response = await axios.get(`http://localhost:3000/api/children/search?prenom=${value}`);
                setSuggestions(response.data);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        }
        if (name === 'firstname' && value === '') {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setFormData({
            ...formData, // Conserver les autres valeurs du formulaire
            id: suggestion.id,
            firstname: suggestion.prenom,
            lastname: suggestion.nom,
            birthdate: suggestion.date_naissance,
            allergy: suggestion.allergie,
            diet: suggestion.diet
        });
        setSuggestions([]); // Cacher les suggestions après le clic
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            prenom: formData.firstname,
            nom: formData.lastname,
            date_naissance: formData.birthdate,
            allergie: formData.allergy,
            diet: formData.diet
        };

        try {
            let response;
            if (currentAction === 'edit') {
                response = await axios.put(`http://localhost:3000/api/children/updatechild/${formData.id}`, data);
            } else if (currentAction === 'add') {
                response = await axios.post('http://localhost:3000/api/children/addchild', data);
            }
            console.log(response.data); // Log response data
            const { createdAt, updatedAt, ...filteredData } = response.data.data;
            filteredData.date_naissance = new Date(filteredData.date_naissance).toLocaleDateString('fr-FR');
            setSuccessData({
                message: response.data.message,
                data: filteredData
            });
            setFormData({
                id: "",
                firstname: "",
                lastname: "",
                birthdate: "",
                allergy: "",
                diet: ""
            });
            setCurrentAction('add');
            setErrorMessage(null);
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrorMessage(error.message);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:3000/api/children/deletechild/${formData.id}`);
            console.log(response.data); // Log response data
            setSuccessData({
                message: response.data.message
            });
            setFormData({
                id: "",
                firstname: "",
                lastname: "",
                birthdate: "",
                allergy: "",
                diet: ""
            });
            setCurrentAction('add');
            setErrorMessage(null);
        } catch (error) {
            console.error("Error deleting child:", error);
            setErrorMessage(error.message);
        }
    };

    const fetchAllChildren = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/children/getallchildren');
            console.log(response.data); // Log response data
            setAllChildren(response.data.data);
            setErrorMessage(null);
            console.log(allChildren.length)
        } catch (error) {
            console.error("Error fetching all children:", error);
            setErrorMessage(error.message);
        }
    };

    const fetchChildById = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/api/children/getchild/${formData.id}`);
            console.log(response.data); // Log response data
            const { createdAt, updatedAt, ...filteredData } = response.data.data;
            filteredData.date_naissance = new Date(filteredData.date_naissance).toLocaleDateString('fr-FR');
            setSuccessData({
                message: response.data.message,
                data: filteredData
            });
            setErrorMessage(null);
        } catch (error) {
            console.error("Error fetching child by ID:", error);
            setErrorMessage(error.response.data.error);
        }
    };

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>

                <button
                 onClick={() => setCurrentAction('add')} >
                    <FontAwesomeIcon style={{margin:'0px 10px'}} icon={faPlus} />
                    Ajouter un Enfant</button>
                <button onClick={() => setCurrentAction('edit')}>
                <FontAwesomeIcon style={{margin:'0px 10px'}} icon={faEdit} />
                    Éditer un Enfant</button>
                <button onClick={() => setCurrentAction('delete')}>
                <FontAwesomeIcon style={{margin:'0px 10px'}} icon={faTrashCan} />
                Supprimer un Enfant</button>
                <button onClick={() => setCurrentAction('getAll')}>
                <FontAwesomeIcon style={{margin:'0px 10px'}} icon={faUsersViewfinder} />
                    Voir tous les Enfants</button>
                <button onClick={() => setCurrentAction('getById')}>
                <FontAwesomeIcon style={{margin:'0px 10px'}} icon={faMagnifyingGlass} />

                    Rechercher un Enfant</button>
            </div>
            <h1 style={{textAlign: 'center', margin: '15px'}}>
                {currentAction === 'edit' ? "Modifier un Enfant" :
                currentAction === 'delete' ? "Supprimer un Enfant" :
                currentAction === 'add' ? "Ajouter un Enfant" :
                currentAction === 'getById' ? "Rechercher un Enfant" : ""}
                {currentAction === 'getAll' ? "Tous les Enfants": ""}
            </h1>

            {successData && (
                <div className="popup" style={{ border: "1px solid #000", padding: "10px", marginBottom: "20px" }}>
                    <p>{successData.message}</p>
                    {successData.data && (
                        <>
                            <p>Résultat:</p>
                                <ChildCards
                                    style={{maxWidth: '100px'}}
                                    key={successData.data.id}
                                    id= {successData.data.id}
                                    prenom={successData.data.prenom}
                                    nom={successData.data.nom}
                                    date_naissance={successData.data.date_naissance}
                                    allergie={successData.data.allergie? successData.data.allergie : "Aucune"}
                                    diet={successData.data.diet? successData.data.diet : "Aucun"}
                                />
                            {console.log(successData.data)}
                        </>
                    )}
                    <button onClick={() => setSuccessData(null)}>Fermer</button>
                </div>
            )}

            {errorMessage && (
                <div className="error-message" style={{ backgroundColor: "red", color: "white", padding: "10px", marginBottom: "20px" }}>
                    <p>Error: {errorMessage}</p>
                </div>
            )}

{currentAction === 'getAll' ? (
            <div style={{ textAlign: 'center' }}>
<button onClick={fetchAllChildren}>Voir tous les Enfants</button>
<button onClick={() => setAllChildren([])} style={{margin:'10px'}}>Réinitialiser</button>

                {allChildren.length > 0 && (
                    <div>
                        <h2 style={{margin: '15px'}}>Résultat total : {allChildren.length}</h2>
                        <div style={{display:'flex', justifyContent:'center' ,flexWrap: 'wrap', gap:'30px'}}>
                            {console.log(allChildren)}
                            {allChildren.map((child) => (
                                <ChildCards
                                    key={child.id}
                                    id= {child.id}
                                    prenom={child.prenom}
                                    nom={child.nom}
                                    date_naissance={child.date_naissance}
                                    allergie={child.allergie}
                                    diet={child.diet}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        ) : (
                <form onSubmit={currentAction === 'delete' ? handleDelete : currentAction === 'getById' ? fetchChildById : handleSubmit}>
                    {(currentAction === 'edit' || currentAction === 'delete' || currentAction === 'getById') && (
                        <div>
                            <label htmlFor="id">ID de l'Enfant: </label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                value={formData.id}
                                onChange={handleChange}
                            />
                        </div>
                    )}
                    {(currentAction === 'add' || currentAction === 'edit' || currentAction === 'getById') && (
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
                                            <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
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
                                <label htmlFor="birthdate">Date de naissance:</label>
                                <input
                                    type="date"
                                    id="birthdate"
                                    name="birthdate"
                                    value={formData.birthdate}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="allergy">Allergie(s):</label>
                                <input
                                    type="text"
                                    id="allergy"
                                    name="allergy"
                                    value={formData.allergy}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="diet">Diet:</label>
                                <input
                                    type="text"
                                    id="diet"
                                    name="diet"
                                    value={formData.diet}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}

                    <button type="submit">
                        {currentAction === 'edit' ? "Modifier un Enfant" :
                        currentAction === 'delete' ? "Supprimer un Enfant" :
                        currentAction === 'getById' ? "Rechercher un Enfant" : "Ajouter un Enfant"}
                    </button>
                    <button type="reset" onClick={() => setFormData({
                        id: "",
                        firstname: "",
                        lastname: "",
                        birthdate: "",
                        allergy: "",
                        diet: ""
                    })}>Réinitialiser
                    </button>
            </form>
            )}

            <Link to='/admindashboard'>
                <button style={{textAlign:'center', marginLeft: '15px', marginTop:'15px', position: 'fixed', bottom:'80px' }}>Retour à l'Admin Dashboard</button>
            </Link>
        </>
    );
}

export default ChildForm;
