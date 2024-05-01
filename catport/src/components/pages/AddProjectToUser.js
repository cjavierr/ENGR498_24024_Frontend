import React, { useState } from 'react';
import axios from 'axios';

function AddProjectToUser() {
  const [userId, setUserId] = useState('');
  const [projectId, setProjectId] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`https://24024be.vercel.app/api/users/addproject`, {
        userid: userId,
        projectid: projectId,
      });

      setSuccessMessage(response.data.message);
      setError(null);
    } catch (error) {
      console.error('Error adding project to user:', error);
      setError(error.response?.data?.message || 'An error occurred.');
    }

    setUserId(''); // Optionally clear user ID field after submission
    setProjectId(''); // Optionally clear project ID field after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userId">User ID:</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="projectId">Project ID:</label>
        <input
          type="text"
          id="projectId"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Project to User</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </form>
  );
}

export default AddProjectToUser;
