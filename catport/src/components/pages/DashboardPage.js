import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardPage = () => {
  const [dashboardId, setDashboardId] = useState();
  const [username, setUsername] = useState('');
  const [userID, setUserID] = useState('');

  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardList, setDashboardList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect( () => {

    const fetchDashboards = async () => {

      const username = localStorage.getItem('loggedInUser');
      if (!username) return; // Skip request if username is empty
  
      try {
        console.log("attempting to make post request");
        const response = await axios.post('https://24024be.vercel.app/api/getUser', {
          username: username, // Send username in request body
        });
        console.log(response);
        setUserID(response.data.userID);
        setDashboardList(response.data.dashboards);
        setError(null);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message || 'An error occurred.'); // Handle potential errors
      };

  }
  fetchDashboards();

}, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('https://24024be.vercel.app/api/getDashboard', { dashboardID: dashboardId });
      setDashboardData(response.data);
    } catch (error) {
      setError('Error fetching dashboard');
    } finally {
      setIsLoading(false);
    }
  };


  const handleChange = (event) => {
    setDashboardId(event.target.value);
  };


  const handleKpiChange = (projectIndex, kpiIndex, type, rowIndex, columnIndex, newValue) => {
    const updatedDashboardData = { ...dashboardData };
    if (type === 'quantitative') {
      updatedDashboardData.projects[projectIndex].quantitativeKPIs[kpiIndex].table[rowIndex][columnIndex] = newValue;
    } else if (type === 'qualitative') {
      updatedDashboardData.projects[projectIndex].qualitativeKPIs[kpiIndex].table[rowIndex][columnIndex] = newValue;
    }
    setDashboardData(updatedDashboardData);
  };

  const handleAddRow = (projectIndex, kpiIndex, type) => {
    const updatedDashboardData = { ...dashboardData };
    if (type === 'quantitative') {
      updatedDashboardData.projects[projectIndex].quantitativeKPIs[kpiIndex].table.push(Array(updatedDashboardData.projects[projectIndex].quantitativeKPIs[kpiIndex].table[0].length).fill(''));
    } else if (type === 'qualitative') {
      updatedDashboardData.projects[projectIndex].qualitativeKPIs[kpiIndex].table.push(Array(updatedDashboardData.projects[projectIndex].qualitativeKPIs[kpiIndex].table[0].length).fill(''));
    }
    setDashboardData(updatedDashboardData);
  };

  const handleAddColumn = (projectIndex, kpiIndex, type) => {
    const updatedDashboardData = { ...dashboardData };
    if (type === 'quantitative') {
      updatedDashboardData.projects[projectIndex].quantitativeKPIs[kpiIndex].table.forEach(row => row.push(''));
    } else if (type === 'qualitative') {
      updatedDashboardData.projects[projectIndex].qualitativeKPIs[kpiIndex].table.forEach(row => row.push(''));
    }
    setDashboardData(updatedDashboardData);
  };

  const handleSave = async () => {
    try {
      await axios.post('https://24024be.vercel.app/api/saveDashboard', { dashboardData });
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving dashboard:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  return (
    <div>
      <select value={dashboardId} onChange={handleChange}>
        <option value="">Select a dashboard</option>
        {dashboardList.map((id) => (
          <option key={id} value={id}>{id}</option>
        ))}
      </select>
      <button onClick={fetchDashboardData}>Fetch Dashboard</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : dashboardData ? (
        <div>
          <h2>{dashboardData.dashboardName}</h2>
          <p>Owner: {dashboardData.userID}</p>
          <p>Access User IDs: {dashboardData.accessUserIDs.join(', ')}</p>
          <h3>Projects:</h3>
          {dashboardData.projects.map((project, projectIndex) => (
            <div key={projectIndex}>
              <h4>Project {projectIndex + 1}</h4>
              <p>Project ID: {project.projectID}</p>
              <h5>Quantitative KPIs:</h5>
              {project.quantitativeKPIs.map((kpi, kpiIndex) => (
                <div key={kpiIndex}>
                  <h6>{kpi.name}</h6>
                  <table>
                    <tbody>
                      {kpi.table.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, columnIndex) => (
                            <td key={columnIndex}>
                              <input
                                type="text"
                                value={cell}
                                onChange={(e) => handleKpiChange(projectIndex, kpiIndex, 'quantitative', rowIndex, columnIndex, e.target.value)}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button onClick={() => handleAddRow(projectIndex, kpiIndex, 'quantitative')}>Add Row</button>
                  <button onClick={() => handleAddColumn(projectIndex, kpiIndex, 'quantitative')}>Add Column</button>
                </div>
              ))}
              <h5>Qualitative KPIs:</h5>
              {project.qualitativeKPIs.map((kpi, kpiIndex) => (
                <div key={kpiIndex}>
                  <h6>{kpi.name}</h6>
                  <table>
                    <tbody>
                      {kpi.table.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, columnIndex) => (
                            <td key={columnIndex}>
                              <input
                                type="text"
                                value={cell}
                                onChange={(e) => handleKpiChange(projectIndex, kpiIndex, 'qualitative', rowIndex, columnIndex, e.target.value)}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button onClick={() => handleAddRow(projectIndex, kpiIndex, 'qualitative')}>Add Row</button>
                  <button onClick={() => handleAddColumn(projectIndex, kpiIndex, 'qualitative')}>Add Column</button>
                </div>
              ))}
            </div>
          ))}
          <button onClick={handleSave}>Save Changes</button>

        </div>
      ) : (
        <p>{error}</p>
      )}
    </div>
  );
};

export default DashboardPage;
