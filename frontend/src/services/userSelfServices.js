import axios from "axios";



export const fetchUserInfo = async (token) => {
	try {
		const response = await axios.get("http://127.0.0.1:3000/api/users/me", {
			headers: { Authorization: token }
		})
		return (response.data);
	} catch(error){
		console.error("Error fetching user info:", error);
		throw error;
	}
};
