import './index.css';
import { Link } from 'react-router-dom';
import Caroussel from './Component/Caroussel';


const IndexPage = () => {
	return (
        <div className="container">
			<h1 className="text-6xl text-red-500"></h1>
			<Caroussel />
			<div style={{position:'relative' }}>

			</div>
		</div>
	);
}

export default IndexPage;
