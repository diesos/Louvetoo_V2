// src/components/AssociateChildForm.js

import { useState } from 'react';
import axios from 'axios';

const AdminRelation = () => {
  const [userId, setUserId] = useState('');
  const [enfantId, setEnfantId] = useState('');
  const [message, setMessage] = useState('');
  const [succes, setSucces] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/admin/associate-child', {
        userId,
        enfantId
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error || 'Une erreur s\'est produite');
    }
  };

  return (
    <div>
      <h2 style={{margin: '15px 0px', textAlign: 'center'}}>Associer un enfant à un utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{margin: '15px 0px'}}>Parent/Grand-Parent ID:</label>
		  {}
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <div>
          <label>Enfant ID:</label>
          <input
            type="text"
            value={enfantId}
            onChange={(e) => setEnfantId(e.target.value)}
          />
        </div>
        <button type="submit">Associer l'enfant à l'utilisateur</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AdminRelation;
