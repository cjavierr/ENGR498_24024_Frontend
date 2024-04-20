import React, { useState } from 'react';
import axios from 'axios';


const MergeDashboards = () => {
  const [dashboard1Id, setDashboard1Id] = useState('');
  const [dashboard2Id, setDashboard2Id] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post('http://localhost:3001/api/mergeDashboards', {
        dashboard1Id,
        dashboard2Id,
        ownerId
      });

      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error('Error merging dashboards:', error);
      setError('Failed to merge dashboards. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="dashboard1Id">Dashboard 1 ID:</label>
        <input
          type="text"
          id="dashboard1Id"
          value={dashboard1Id}
          onChange={(e) => setDashboard1Id(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="dashboard2Id">Dashboard 2 ID:</label>
        <input
          type="text"
          id="dashboard2Id"
          value={dashboard2Id}
          onChange={(e) => setDashboard2Id(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="ownerId">Owner ID of Merged Dashboard:</label>
        <input
          type="text"
          id="ownerId"
          value={ownerId}
          onChange={(e) => setOwnerId(e.target.value)}
          required
        />
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <button type="submit">Merge Dashboards</button>
    </form>
  );
};

export default MergeDashboards;
