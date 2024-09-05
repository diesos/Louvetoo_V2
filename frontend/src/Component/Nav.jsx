import { Link, useNavigate, useLocation, } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faCircleQuestion, faEnvelope, faHouse, faHandsHoldingChild, faRightFromBracket, faRightToBracket} from '@fortawesome/free-solid-svg-icons';
import Logo from '/logonavbar.svg';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

export default function Nav() {
    const location = useLocation();
    const signOut = useSignOut();
    const navigate = useNavigate();

    const handleLogOut = () => {
        signOut()
        setTimeout(() => {
        navigate("/");
        }, 1000);
        }

    return (
        <nav>
            <Link to="/index">
                <img src={Logo} alt="Logo of Louvetoo" className='logoimg' />
            </Link>
            {location.pathname === '/dashboard'&& (
                <ul>
                    <li>
                        <Link to="/dashboard"><FontAwesomeIcon icon={faHouse} style={{color:'white', marginLeft:'10px'}}/>
                        <p style={{color:'white'}}>Accueil</p></Link>
                    </li>
                    <li>
                        <Link to="/child"><FontAwesomeIcon icon={faHandsHoldingChild} style={{color:'white', marginLeft:'25px'}} />
                        <p style={{alignSelf:'center', marginLeft:'10px', color:'white'}}>Enfants</p></Link>
                    </li>
                    <li>
                        <Link to="/profile"><FontAwesomeIcon icon={faUser} style={{color: 'white', marginLeft:'20px'}} />
                        <p style={{alignSelf:'center', marginLeft:'10px', color:'white'}}>Profil</p></Link>
                        </li>
                        <li style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap:'0.3vh' }}>
                        <FontAwesomeIcon
                            icon={faRightFromBracket}
                            style={{ color: 'white', marginTop: '1vh' }} 
                        />
                        <p onClick={handleLogOut} style={{ color: 'white' }}>
                            Déconnexion
                        </p>
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

                    <li>
                        <Link to="/login"><FontAwesomeIcon icon={faRightToBracket} style={{color: 'white', marginLeft:'30px'}} />
                        <p style={{alignSelf:'center', marginLeft:'10px', color:'white'}}>Connexion</p></Link>
                    </li>
                </ul>
            )}
            {(location.pathname === '/login') && (
                                <ul>
                                <li>
                                    <Link to="/index"><FontAwesomeIcon icon={faHouse} style={{color:'white', marginLeft:'15px'}}/>
                                    <p style={{color:'white'}}>Accueil</p></Link>
                                </li>
                                </ul>
            )}
        </nav>
    );
}
