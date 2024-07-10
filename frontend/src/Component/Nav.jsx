import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouse, faHandsHoldingChild } from '@fortawesome/free-solid-svg-icons';
import Logo from '/logonavbar.svg';

export default function Nav() {
    const location = useLocation();

    return (
        <nav>
            <Link to="/">
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
        </nav>
    );
}
