import { useState, useEffect } from 'react';
import pic1 from "../assets/gallery/1.png";
import pic2 from "../assets/gallery/2.png";
import pic3 from "../assets/gallery/3.png";
import './Caroussel.css'; // Assurez-vous d'importer le fichier CSS
import { Link } from 'react-router-dom';

const images = [pic1, pic2, pic3];

function Caroussel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const [text, setText] = useState("Rester informé de votre enfant");
  const [title, setTitle] = useState("Communication parent-creche");

  useEffect(() => {
	switch (currentIndex) {
	  case 0:
		setText("Rester informé de ce que fait votre enfant à la crèche");
		break;
	  case 1:
		setText("Suivez la vie à la crèche de votre enfant");
		break;
	  case 2:
		setText("Participez à la vie de votre crèche");
		break;
	  default:
		setText("Rester informé de votre enfant");
	}
  }, [currentIndex]);

  useEffect(() => {
	switch (currentIndex) {
	  case 0:
		setTitle("Tout au long de la journée");
		break;
	  case 1:
		setTitle("Communication parent-creche");
		break;
	  case 2:
		setTitle("En toute simplicité");
		break;
	  default:
		setTitle("Restez informée tout au long de la journée");
	}
  }
  , [currentIndex]);

  return (
    <div className="carousel">
      <div className="carousel-item active">
        <img src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
        <div className="carousel-caption">
          <h3 className="font-bold">{`${title}`}</h3>
          <p>{`${text}`}</p>
          <Link to='/Login'>
          <button className="join-buttontransition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter, -webkit-backdrop-filter;
">Rejoignez-nous</button>
</Link>
        </div>
      </div>
      <button className="carousel-control prev" onClick={handlePrev}>❮</button>
      <button className="carousel-control next" onClick={handleNext}>❯</button>
    </div>
  );
}

export default Caroussel;
