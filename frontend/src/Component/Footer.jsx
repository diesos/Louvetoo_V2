import { Link, useLocation } from 'react-router-dom';
export default function Footer() {

    const location = useLocation();
    const path = location.pathname;

    const isNotOnSpecificPaths = !(path === '/index' || path === '/about' || path === '/contact' || path === '/login');


    return (
        <footer>
            <p>© 2024 Louvetoo</p>
            {isNotOnSpecificPaths &&
            <Link to="/Admindashboard"><p style={{textAlign: 'center', color:'gray', marginLeft: '30px'}}>Admin Panel</p></Link>
            }
        </footer>
    );
}
