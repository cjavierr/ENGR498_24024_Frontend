import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetDashboard = ({ initialDashboardId }) => {
  const [dashboardId, setDashboardId] = useState(initialDashboardId);
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!dashboardId) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.post('http://localhost:3001/api/getDashboard', { dashboardID: dashboardId });
        setDashboardData(response.data);
      } catch (error) {
        setError('Error fetching dashboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, [dashboardId]);

  const handleChange = (event) => {
    setDashboardId(event.target.value);
  };

  const handleKpiChange = (projectIndex, kpiIndex, rowIndex, columnIndex, newValue) => {
    const updatedDashboardData = { ...dashboardData };
    updatedDashboardData.projects[projectIndex].quantitativeKPIs[kpiIndex].table[rowIndex][columnIndex] = newValue;
    setDashboardData(updatedDashboardData);
  };

  const handleAddRow = (projectIndex, kpiIndex) => {
    const updatedDashboardData = { ...dashboardData };
    updatedDashboardData.projects[projectIndex].quantitativeKPIs[kpiIndex].table.push(Array(updatedDashboardData.projects[projectIndex].quantitativeKPIs[kpiIndex].table[0].length).fill(''));
    setDashboardData(updatedDashboardData);
  };

  const handleAddColumn = (projectIndex, kpiIndex) => {
    const updatedDashboardData = { ...dashboardData };
    updatedDashboardData.projects[projectIndex].quantitativeKPIs[kpiIndex].table.forEach(row => row.push(''));
    setDashboardData(updatedDashboardData);
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:3001/api/saveDashboard', { dashboardData });
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving dashboard:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Dashboard ID"
        value={dashboardId}
        onChange={handleChange}
      />
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
                                onChange={(e) => handleKpiChange(projectIndex, kpiIndex, rowIndex, columnIndex, e.target.value)}
                              />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button onClick={() => handleAddRow(projectIndex, kpiIndex)}>Add Row</button>
                  <button onClick={() => handleAddColumn(projectIndex, kpiIndex)}>Add Column</button>
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

export default GetDashboard;
