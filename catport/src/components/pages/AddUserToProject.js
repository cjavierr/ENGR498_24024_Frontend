import React, { useState } from 'react';
import axios from 'axios';

function AddUserToProject() {
  const [projectId, setProjectId] = useState('');
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put('https://24024be.vercel.app/api/projects/adduser', { projectId, userId, role });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error adding user to project');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add User to Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Project ID:
          <input type="text" value={projectId} onChange={(e) => setProjectId(e.target.value)} />
        </label>
        <br />
        <label>
          User ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
        <br />
        <label>
          Role:
          <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add User to Project</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddUserToProject;
