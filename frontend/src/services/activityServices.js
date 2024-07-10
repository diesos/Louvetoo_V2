// services/activityService.js
import axios from '../api/axios';

const API_URL = 'http://localhost:3000/api/activites';

export const getActivitiesByChildId = async (id_enfant) => {
  try {
    const response = await axios.get(`${API_URL}/getallactivites/${id_enfant}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};
