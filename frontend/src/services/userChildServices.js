import axios from "axios"

export const fetchUserChild = async(token) => {
	try{
	const reponse = await axios.get("http://127.0.0.1:3000/api/users/children-activities", {
		headers: {Authorization: token}
	})	
	return (reponse.data)
	}catch(error){
		console.error("Error fetching child:", error)
		throw  error;
	}
}