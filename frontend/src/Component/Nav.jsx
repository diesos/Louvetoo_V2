import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faCircleQuestion, faEnvelope, faHouse, faHandsHoldingChild } from '@fortawesome/free-solid-svg-icons';
import Logo from '/logonavbar.svg';

export default function Nav() {
    const location = useLocation();

    return (
        <nav>
            <Link to="/index">
                <img src={Logo} alt="Logo of Louvetoo" className='logoimg' />
            </Link>
            {location.pathname === '/dashboard'&& (
                <ul>
                    <li>
                        <Link to="/dashboard"><FontAwesomeIcon icon={faHouse} style={{color:'white', marginLeft:'10px'}}/>
                        <p style={{color:'white'}}>Home</p></Link>
                    </li>
                    <li>
                        <Link to="/child"><FontAwesomeIcon icon={faHandsHoldingChild} style={{color:'white', marginLeft:'25px'}} />
                        <p style={{alignSelf:'center', marginLeft:'10px', color:'white'}}>Enfants</p></Link>
                    </li>
                    <li>
                        <Link to="/profile"><FontAwesomeIcon icon={faUser} style={{color: 'white', marginLeft:'20px'}} />
                        <p style={{alignSelf:'center', marginLeft:'10px', color:'white'}}>Profil</p></Link>
                    </li>
                </ul>
            )}
            {(location.pathname === '/' || location.pathname === '/about' || location.pathname === '/contact' || location.pathname === '/index') && (
                <ul>
                    <li>
                        <Link to="/index"><FontAwesomeIcon icon={faHouse} style={{color:'white', marginLeft:'15px'}}/>
                        <p style={{color:'white'}}>Accueil</p></Link>
                    </li>
                    <li>
                        <Link to="/about"><FontAwesomeIcon icon={faCircleQuestion} style={{color:'white', marginLeft:'2.5em'}} />
                        <p style={{alignSelf:'center', marginLeft:'10px', color:'white'}}>À Propos de nous</p></Link>
                    </li>
                    <li>
                        <Link to="/contact"><FontAwesomeIcon icon={faEnvelope} style={{color: 'white', marginLeft:'30px'}} />
                        <p style={{alignSelf:'center', marginLeft:'10px', color:'white'}}>Contact</p></Link>
                    </li>
                </ul>
            )}
        </nav>
    );
}
