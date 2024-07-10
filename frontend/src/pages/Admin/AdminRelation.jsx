// src/components/AssociateChildForm.js

import { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const AdminRelation = () => {
  const [userId, setUserId] = useState('');
  const [enfantId, setEnfantId] = useState('');
  const [message, setMessage] = useState('');
  const [succes, setSucces] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/admin/associate-child', {
        userId,
        enfantId
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error || 'Une erreur s\'est produite');
    }
  };
  console.log(userId, enfantId);

  return (
    <div>
      <h2 style={{margin: '15px 0px', textAlign: 'center'}}>Associer un enfant à un utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <div>
        {message && <p style={{textAlign:'center', color:'red', fontWeight:'800'}}>{message}</p>}
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

      <Link to='/admindashboard'>
                <button style={{ textAlign: 'center', marginLeft: '15px', marginTop: '15px', position: 'fixed', bottom: '80px' }}>Retour à l'Admin Dashboard</button>
            </Link>
    </div>

  );
};

export default AdminRelation;
