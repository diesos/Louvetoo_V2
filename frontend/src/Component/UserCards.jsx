import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserCards(props) {
    const { id, prenom, nom, email, telephone, role } = props;


    return (
        <div key={id} className='card' className="child--outter">
            <FontAwesomeIcon icon={faUser} style={{ fontSize: '2em', color: 'white' }} />
            <h3>{prenom} {nom}</h3>
			<p>id : {id}</p>
            <p>Email : {email} </p>
            <p>Téléphone : {telephone}</p>
            <p>Rôle : {role}</p>
        </div>
    );
}
