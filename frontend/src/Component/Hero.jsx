import pic1 from "../assets/gallery/1.png"
import pic2 from "../assets/gallery/2.png"
import pic3 from "../assets/gallery/3.png"
import pic4 from "../assets/gallery/4.png"
import pic5 from "../assets/gallery/5.png"
import pic6 from "../assets/gallery/6.png"
import pic7 from "../assets/gallery/7.png"
import pic8 from "../assets/gallery/8.png"
import pic9 from "../assets/gallery/9.png"
import '../Hero.css'

export default function Hero(){
	return(

		<div className="hero-container">
			<div className="gallery-container1">
				<img src={pic1} alt="" />
			</div>
			<div className="gallery-container2">
				<img src={pic2} alt="" />
				<img src={pic3} alt="" />
			</div>
			<div className="gallery-container3"style={{gap: '3em'}}>
				<img src={pic4} alt="" />
				<img src={pic7} alt="" />
			</div>
			<div className="gallery-container4" >
				<img src={pic6} alt="" />
				<img src={pic5} alt="" />
			</div>
			<div className="gallery-container5">
				<img src={pic8} alt="" />
				<img src={pic9} alt="" />
			</div>
		</div>
	)
}
