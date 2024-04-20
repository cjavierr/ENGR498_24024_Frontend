import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateDashboard = () => {
  const [dashboardName, setDashboardName] = useState('');
  const [userID, setUserID] = useState('');
  const [accessUserIDs, setAccessUserIDs] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [projectIDs, setProjectIDs] = useState([]);



  const fetchData = async () => {
    const username = localStorage.getItem('loggedInUser');
    if (!username) return; // Skip request if username is empty

    try {
      console.log("attempting to make post request");
      const response = await axios.post('http://localhost:3001/api/getUser', {
        username: username, // Send username in request body
      });
      console.log(response);
      setUserID(response.data.userID);
      setProjectIDs(response.data.projects);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred.'); // Handle potential errors
    }
  };

  useEffect(() => {
    const fetchProjectIDs = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/allProjectIDs');
        setProjectIDs(response.data.projectIDs);
      } catch (error){
        console.error('Error fetching project IDs: ', error);
      }
    };
    fetchProjectIDs();
    fetchData();
  }, [username]); // Re-run on username change


  const handleAddAccessUserID = () => {
    setAccessUserIDs([...accessUserIDs, '']);
  };

  const handleAccessUserIDChange = (index, value) => {
    const updatedAccessUserIDs = [...accessUserIDs];
    updatedAccessUserIDs[index] = value;
    setAccessUserIDs(updatedAccessUserIDs);
  };

  const handleAddItem = () => {
    setItems([...items, { type: 'project', id: '', quantitativeKPIs: [], qualitativeKPIs: [] }]);
  };

  const handleItemChange = async (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);

    if (field === 'id') {
      // Fetch KPIs for the project or dashboard
      try {
        const response = await axios.post('http://localhost:3001/api/getProject', { projectId: value });
        const projectData = response.data;

        // Update the item's KPIs with the fetched data
        updatedItems[index].quantitativeKPIs = projectData.quantitativeKPIs;
        updatedItems[index].qualitativeKPIs = projectData.qualitativeKPIs;
        setItems(updatedItems);
      } catch (error) {
        console.error('Error fetching project:', error);
        // Handle error appropriately
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post('http://localhost:3001/api/createDashboard', {
        dashboardName,
        userID,
        accessUserIDs,
        items
      });

      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error('Error creating dashboard:', error);
      setError('Failed to create dashboard. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="dashboardName">Dashboard Name:</label>
        <input
          type="text"
          id="dashboardName"
          value={dashboardName}
          onChange={(e) => setDashboardName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="userID">User ID of Owner:</label>
        <input
          type="text"
          id="userID"
          value={userID}
          onChange={(e) => setUserID(e.target.value)}
          required
        />
      </div>

      <div>
        <h3>Access User IDs:</h3>
        {accessUserIDs.map((accessUserID, index) => (
          <div key={index}>
            <input
              type="text"
              value={accessUserID}
              onChange={(e) => handleAccessUserIDChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddAccessUserID}>Add Access User ID</button>
      </div>

      <div>
      <h3>Items:</h3>
      {items.map((item, index) => (
        <div key={index}>
          <label>Type:</label>
          <select value={item.type} onChange={(e) => handleItemChange(index, 'type', e.target.value)}>
            <option value="project">Project</option>
            <option value="dashboard">Dashboard</option>
          </select>
          <label htmlFor="projectID">Select Project:</label>
          {projectIDs.length > 0 ? ( // Conditionally render the dropdown menu when projectIDs are available
            <select id="projectID" value={item.id} onChange={(e) => handleItemChange(index, 'id', e.target.value)} required>
              <option value="">Select a project</option>
              {projectIDs.map((projectID) => (
                <option key={projectID} value={projectID}>{projectID}</option>
              ))}
            </select>
          ) : (
            <p>Loading project IDs...</p>
          )}
            {/* Render checkboxes for selecting quantitative KPIs */}
            <div>
              <h4>Quantitative KPIs:</h4>
              {item.quantitativeKPIs.map((kpi, kpiIndex) => (
                <div key={kpiIndex}>
                  <input type="checkbox" id={`qKPI_${index}_${kpiIndex}`} />
                  <label htmlFor={`qKPI_${index}_${kpiIndex}`}>{kpi.name}</label>
                </div>
              ))}
            </div>
            {/* Render checkboxes for selecting qualitative KPIs */}
            <div>
              <h4>Qualitative KPIs:</h4>
              {item.qualitativeKPIs.map((kpi, kpiIndex) => (
                <div key={kpiIndex}>
                  <input type="checkbox" id={`qualKPI_${index}_${kpiIndex}`} />
                  <label htmlFor={`qualKPI_${index}_${kpiIndex}`}>{kpi.name}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddItem}>Add Item</button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <button type="submit">Create Dashboard</button>
    </form>
  );
};

export default CreateDashboard;