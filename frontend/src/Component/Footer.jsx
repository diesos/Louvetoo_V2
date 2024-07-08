
import { Link } from 'react-router-dom';
export default function Footer() {

    return (
        <footer>
            <p>© 2024 Louvetoo</p>
            <Link to="/Admindashboard"><p style={{textAlign: 'center', color:'gray', marginLeft: '30px'}}>Admin Panel</p></Link>
        </footer>
    );
}
