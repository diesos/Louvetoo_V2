import { useState } from "react";
import { Link } from "react-router-dom";
import axios from '../../api/axios.js';

const activityOptions = ['entree', 'sortie', 'dodo', 'repas', 'change', 'loisir', 'autre'];

export default function AdminActivite() {
    const [formData, setFormData] = useState({
        id: "",
        id_enfant: "",
        date: "",
        duree: "",
        photo: "",
        activity: "entree", // Valeur par défaut pour la liste déroulante
        autres: null // Champ "autres" initialisé à null
    });

    const [successData, setSuccessData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null); // Nouvel état pour gérer les erreurs
    const [allActivities, setAllActivities] = useState([]);
    const [currentAction, setCurrentAction] = useState('add'); // 'add', 'edit', 'delete', 'getAll', 'getById'

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            id_enfant: formData.id_enfant,
            date: formData.date,
            duree: formData.duree,
            photo: formData.photo,
            activity: formData.activity
        };

        // Ajouter "autres" au payload si activity === 'autre'
        if (formData.activity === 'autre') {
            data.autres = formData.autres;
        }

        try {
            let response;
            if (currentAction === 'edit') {
                response = await axios.put(`http://localhost:3000/api/activites/updateactivite/${formData.id}`, data);
            } else if (currentAction === 'add') {
                response = await axios.post('http://localhost:3000/api/activites/addactivite', data);
            }
            console.log(response.data); // Log response data
            setSuccessData({
                message: response.data.message,
                data: response.data.data
            });
            setFormData({
                id: "",
                id_enfant: "",
                date: "",
                duree: "",
                photo: "",
                activity: "entree",
                autres: null
            });
            setCurrentAction('add');
            setErrorMessage(null); // Réinitialisation de l'état d'erreur
        } catch (error) {
            console.error("Error submitting form:", error);
            setErrorMessage(error.response.data.error);
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.delete(`http://localhost:3000/api/activites/deleteactivite/${formData.id}`);
            console.log(response.data); // Log response data
            setSuccessData({
                message: response.data.message
            });
            setFormData({
                id: "",
                id_enfant: "",
                date: "",
                duree: "",
                photo: "",
                activity: "entree",
                autres: null
            });
            setCurrentAction('add');
            setErrorMessage(null); // Réinitialisation de l'état d'erreur
        } catch (error) {
            console.error("Error deleting activity:", error);
            setErrorMessage(error.response.data.error);
        }
    };

    const fetchAllActivities = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/activites/getallactivites');
            console.log(response.data); // Log response data
            setAllActivities(response.data.data);
            setErrorMessage(null); // Réinitialisation de l'état d'erreur
        } catch (error) {
            console.error("Error fetching all activities:", error);
            setErrorMessage(error.message);
        }
    };

    const fetchActivityById = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3000/api/activites/getactivite/${formData.id}`);
            console.log(response.data); // Log response data
            setSuccessData({
                message: response.data.message,
                data: response.data.data
            });
            setErrorMessage(null); // Réinitialisation de l'état d'erreur
        } catch (error) {
            console.error("Error fetching activity by ID:", error);
            setErrorMessage(error.response.data.error);
        }
    };

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', gap: '10px'}}>
                <button onClick={() => setCurrentAction('add')}>Ajouter une Activité</button>
                <button onClick={() => setCurrentAction('edit')}>Éditer une Activité</button>
                <button onClick={() => setCurrentAction('delete')}>Supprimer une Activité</button>
                <button onClick={() => setCurrentAction('getAll')}>Voir toutes les Activités</button>
                <button onClick={() => setCurrentAction('getById')}>Rechercher une Activité</button>
            </div>
            <h1 style={{textAlign: 'center', margin: '15px'}}>{currentAction === 'edit' ? "Modifier une Activité" : currentAction === 'delete' ? "Supprimer une Activité" : currentAction === 'getById' ? "Rechercher une Activité" : "Ajouter une Activité"}</h1>
            {successData && (
                <div className="popup" style={{ border: "1px solid #000", padding: "10px", marginBottom: "20px" }}>
                    <p>{successData.message}</p>
                    {successData.data && (
                        <>
                            <p>Données soumises:</p>
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
                <div style={{textAlign:'center'}}>
                    <button onClick={fetchAllActivities}>Voir toutes les Activités</button>
                    {allActivities.length > 0 && (
                        <div>
                            <h2>Toutes les activités:</h2>
                            <pre>{JSON.stringify(allActivities, null, 2)}</pre>
                        </div>
                    )}
                </div>
            ) : (
                <form onSubmit={currentAction === 'delete' ? handleDelete : currentAction === 'getById' ? fetchActivityById : handleSubmit}>
                    {(currentAction === 'edit' || currentAction === 'delete' || currentAction === 'getById') && (
                        <div>
                            <label htmlFor="id">ID de l'Activité: </label>
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
                                <label htmlFor="id_enfant">ID de l'Enfant:</label>
                                <input
                                    type="text"
                                    id="id_enfant"
                                    name="id_enfant"
                                    value={formData.id_enfant}
                                    onChange={handleChange}
                                />
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
                                <label htmlFor="duree">Durée (en minutes):</label>
                                <input
                                    type="number"
                                    id="duree"
                                    name="duree"
                                    value={formData.duree}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="photo">Photo (URL):</label>
                                <input
                                    type="text"
                                    id="photo"
                                    name="photo"
                                    value={formData.photo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="activity">Activité:</label>
                                <select
                                    id="activity"
                                    name="activity"
                                    value={formData.activity}
                                    onChange={handleChange}
                                >
                                    {activityOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Affichage du champ "autres" si l'activité est "autre" */}
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
                        </>
                    )}
                    <button type="submit">{currentAction === 'edit' ? "Modifier une Activité" : currentAction === 'delete' ? "Supprimer une Activité" : currentAction === 'getById' ? "Rechercher une Activité" : "Ajouter une Activité"}</button>
                </form>
            )}
            <Link to='/admindashboard'><button style={{textAlign:'center', marginLeft: '15px', marginTop:'15px'}}>Retour à l'Admin Dashboard</button></Link>
        </>
    );
}
