import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ChildCards(props) {
    const { id, prenom, nom, date_naissance, allergie, diet } = props;

    // Convertir date_naissance en objet Date si ce n'est pas déjà fait
    const formattedDate = new Date(date_naissance).toLocaleDateString('fr-FR');
	const year = new Date().getFullYear();

    return (
        <div key={id} className='card' className="child--outter">
            <FontAwesomeIcon icon={faUser} style={{ fontSize: '2em', color: 'white' }} />
            <h3>{prenom} {nom}</h3>
			<p>id : {id}</p>
            <p>Âge : {2024 - year} </p>
            <p>Date de naissance : {formattedDate}</p>
            <p>Allergie(s) : {allergie}</p>
            <p>Diet : {diet}</p>
        </div>
    );
}
