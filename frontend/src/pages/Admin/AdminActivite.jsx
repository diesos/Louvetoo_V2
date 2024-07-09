import { useState } from "react";
import { Link } from "react-router-dom";
import axios from '../../api/axios.js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrashCan, faUsersViewfinder, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const AdminActivite = () => {
    const [formData, setFormData] = useState({
        id: "",
        activity: "",
        autres: "",
        id_enfant: "",
        firstname: "",
        lastname: "",
        date: "",
        duree: "",
        photo: ""
    });

    const [suggestions, setSuggestions] = useState([]);
    const [successData, setSuccessData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [allActivities, setAllActivities] = useState([]);
    const [currentAction, setCurrentAction] = useState('add');

    const activityOptions = ['entree', 'sortie', 'dodo', 'repas', 'change', 'loisir', 'autre'];

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Fetch suggestions based on firstname
        if (name === 'firstname') {
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
            ...formData,
            id_enfant: suggestion.id,
            firstname: suggestion.prenom,
            lastname: suggestion.nom
        });
        setSuggestions([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            activity: formData.activity,
            autres: formData.autres || null,
            id_enfant: formData.id_enfant,
            date: formData.date,
            duree: formData.duree,
            photo: formData.photo
        };

        try {
            let response;
            if (currentAction === 'edit') {
                response = await axios.put(`http://localhost:3000/api/activites/updateactivite/${formData.id}`, data);
            } else if (currentAction === 'add') {
                response = await axios.post('http://localhost:3000/api/activites/addactivite', data);
            }
            setSuccessData({
                message: response.data.message,
                data: response.data.data
            });
            setFormData({
                id: "",
                activity: "",
                autres: "",
                id_enfant: "",
                firstname: "",
                lastname: "",
                date: "",
                duree: "",
                photo: ""
            });
            setCurrentAction('add');
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:3000/api/activites/deleteactivite/${formData.id}`);
            setSuccessData({
                message: response.data.message
            });
            setFormData({
                id: "",
                activity: "",
                autres: "",
                id_enfant: "",
                firstname: "",
                lastname: "",
                date: "",
                duree: "",
                photo: ""
            });
            setCurrentAction('add');
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const fetchAllActivities = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/activites/getallactivites');
            setAllActivities(response.data.data);
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const fetchActivityById = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/api/activites/getactivite/${formData.id}`);
            setSuccessData({
                message: response.data.message,
                data: response.data.data
            });
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage(error.response.data.error);
        }
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button onClick={() => setCurrentAction('add')}>
                    <FontAwesomeIcon style={{ margin: '0px 10px' }} icon={faPlus} />
                    Ajouter une Activité
                </button>
                <button onClick={() => setCurrentAction('edit')}>
                    <FontAwesomeIcon style={{ margin: '0px 10px' }} icon={faEdit} />
                    Éditer une Activité
                </button>
                <button onClick={() => setCurrentAction('delete')}>
                    <FontAwesomeIcon style={{ margin: '0px 10px' }} icon={faTrashCan} />
                    Supprimer une Activité
                </button>
                <button onClick={() => setCurrentAction('getAll')}>
                    <FontAwesomeIcon style={{ margin: '0px 10px' }} icon={faUsersViewfinder} />
                    Voir toutes les Activités
                </button>
                <button onClick={() => setCurrentAction('getById')}>
                    <FontAwesomeIcon style={{ margin: '0px 10px' }} icon={faMagnifyingGlass} />
                    Rechercher une Activité
                </button>
            </div>
            <h1 style={{ textAlign: 'center', margin: '15px' }}>
                {currentAction === 'edit' ? "Modifier une Activité" :
                    currentAction === 'delete' ? "Supprimer une Activité" :
                        currentAction === 'add' ? "Ajouter une Activité" :
                            currentAction === 'getById' ? "Rechercher une Activité" : ""}
                {currentAction === 'getAll' ? "Toutes les Activités" : ""}
            </h1>

            {successData && (
                <div className="popup" style={{ border: "1px solid #000", padding: "10px", marginBottom: "20px" }}>
                    <p>{successData.message}</p>
                    {successData.data && (
                        <>
                            <p>Résultat:</p>
                            <pre>{JSON.stringify(successData.data, null, 2)}</pre>
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
                    <button onClick={fetchAllActivities}>Voir toutes les Activités</button>
                    <button onClick={() => setAllActivities([])} style={{ margin: '10px' }}>Réinitialiser</button>
                    {allActivities.length > 0 && (
                        <div>
                            <h2 style={{ margin: '15px' }}>Résultat total : {allActivities.length}</h2>
                            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '30px' }}>
                                {allActivities.map((activity) => (
                                    <div key={activity.id} style={{ border: "1px solid #000", padding: "10px", marginBottom: "10px" }}>
                                        <p>ID: {activity.id}</p>
                                        <p>Activité: {activity.activity}</p>
                                        <p>Autres: {activity.autres}</p>
                                        <p>ID Enfant: {activity.id_enfant}</p>
                                        <p>Prénom Enfant: {activity.Enfant.prenom}</p>
                                        <p>Nom Enfant: {activity.Enfant.nom}</p>
                                        <p>Date: {new Date(activity.date).toLocaleDateString('fr-FR')}</p>
                                        <p>Durée: {activity.duree} minutes</p>
                                        <p>Photo: <a href={activity.photo} target="_blank" rel="noopener noreferrer">Voir la photo</a></p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <form onSubmit={currentAction === 'delete' ? handleDelete : currentAction === 'getById' ? fetchActivityById : handleSubmit}>
                    {(currentAction === 'edit' || currentAction === 'delete' || currentAction === 'getById') && (
                        <div>
                            <label htmlFor="id">ID:</label>
                            <input
                                type="text"
                                id="id"
                                name="id"
                                value={formData.id}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    {(currentAction === 'add' || currentAction === 'edit') && (
                        <>
                            <div>
                                <label htmlFor="activity">Activité:</label>
                                <select
                                    id="activity"
                                    name="activity"
                                    value={formData.activity}
                                    onChange={handleChange}
                                >
                                    {activityOptions.map((option) => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            {formData.activity === 'autre' && (
                                <div>
                                    <label htmlFor="autres">Autres:</label>
                                    <input
                                        type="text"
                                        id="autres"
                                        name="autres"
                                        value={formData.autres}
                                        onChange={handleChange}
                                    />
                                </div>
                            )}
                            <div>
                                <label htmlFor="id_enfant">ID de l'enfant:</label>
                                <input
                                    type="text"
                                    id="id_enfant"
                                    name="id_enfant"
                                    value={formData.id_enfant}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="firstname">Prénom de l'enfant:</label>
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
                                <label htmlFor="date">Date:</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="duree">Durée (minutes):</label>
                                <input
                                    type="number"
                                    id="duree"
                                    name="duree"
                                    value={formData.duree}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="photo">Photo URL:</label>
                                <input
                                    type="text"
                                    id="photo"
                                    name="photo"
                                    value={formData.photo}
                                    onChange={handleChange}
                                />
                            </div>
                        </>
                    )}
                    <button type="submit">
                        {currentAction === 'edit' ? "Modifier une Activité" :
                            currentAction === 'delete' ? "Supprimer une Activité" :
                                currentAction === 'getById' ? "Rechercher une Activité" : "Ajouter une Activité"}
                    </button>
                    <button type="reset" onClick={() => setFormData({
                        id: "",
                        activity: "",
                        autres: "",
                        id_enfant: "",
                        firstname: "",
                        lastname: "",
                        date: "",
                        duree: "",
                        photo: ""
                    })}>Réinitialiser
                    </button>
                </form>
            )}

            <Link to='/admindashboard'>
                <button style={{ textAlign: 'center', marginLeft: '15px', marginTop: '15px', position: 'fixed', bottom: '80px' }}>Retour à l'Admin Dashboard</button>
            </Link>
        </>
    );
}

export default AdminActivite;
