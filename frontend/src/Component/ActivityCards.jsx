import { faPuzzlePiece } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ActivityCards(props) {
    const { id, activity, Enfant, date, duree, photo, createdAt, updatedAt } = props;

    const { prenom, nom } = Enfant;

    return (
        <div key={id} className='child--outter'>
            <FontAwesomeIcon icon={faPuzzlePiece} style={{ fontSize: '2em', color: 'white' }} />
            <h3 style={{textAlign:'center'}}>{prenom} {nom}</h3>
            <p>ID Activité : {id}</p>
            <p>Activité : {activity}</p>
            <p>Date : {new Date(date).toLocaleDateString('fr-FR')}</p>
            <p>Durée : {duree} minutes</p>
            <p>Photo : <a href={photo} target="_blank" rel="noopener noreferrer">Voir la photo</a></p>
            <p>Créé le : {new Date(createdAt).toLocaleString('fr-FR')}</p>
            <p>Modifié le : {new Date(updatedAt).toLocaleString('fr-FR')}</p>
        </div>
    );
}
