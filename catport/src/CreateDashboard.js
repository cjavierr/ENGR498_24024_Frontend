import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateDashboard = () => {
  const [dashboardName, setDashboardName] = useState('');
  const [userID, setUserID] = useState('');
  const [accessUserIDs, setAccessUserIDs] = useState([]);
  const [projects, setProjects] = useState([{ projectID: '', quantitativeKPIs: [], qualitativeKPIs: [] }]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleAddAccessUserID = () => {
    setAccessUserIDs([...accessUserIDs, '']);
  };

  const handleAccessUserIDChange = (index, value) => {
    const updatedAccessUserIDs = [...accessUserIDs];
    updatedAccessUserIDs[index] = value;
    setAccessUserIDs(updatedAccessUserIDs);
  };

  const handleAddProject = () => {
    setProjects([...projects, { projectID: '', quantitativeKPIs: [], qualitativeKPIs: [] }]);
  };

  const handleProjectChange = async (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);

    if (field === 'projectID') {
      // Fetch quantitative and qualitative KPIs for the project
      try {
        const response = await axios.post('http://localhost:3001/api/getProject', { projectId: value });
        const projectData = response.data;

        // Update the project's KPIs with the fetched data
        updatedProjects[index].quantitativeKPIs = projectData.quantitativeKPIs;
        updatedProjects[index].qualitativeKPIs = projectData.qualitativeKPIs;
        setProjects(updatedProjects);
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
        projects
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
        <h3>Projects:</h3>
        {projects.map((project, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Project ID"
              value={project.projectID}
              onChange={(e) => handleProjectChange(index, 'projectID', e.target.value)}
              required
            />
            {/* Render checkboxes for selecting quantitative and qualitative KPIs */}
            <div>
              <h4>Quantitative KPIs:</h4>
              {project.quantitativeKPIs.map((kpi, kpiIndex) => (
                <div key={kpiIndex}>
                  <input type="checkbox" id={`qKPI_${index}_${kpiIndex}`} />
                  <label htmlFor={`qKPI_${index}_${kpiIndex}`}>{kpi.name}: {kpi.value}</label>
                </div>
              ))}
            </div>
            <div>
              <h4>Qualitative KPIs:</h4>
              {project.qualitativeKPIs.map((kpi, kpiIndex) => (
                <div key={kpiIndex}>
                  <input type="checkbox" id={`qualKPI_${index}_${kpiIndex}`} />
                  <label htmlFor={`qualKPI_${index}_${kpiIndex}`}>{kpi.name}: {kpi.value}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button type="button" onClick={handleAddProject}>Add Project</button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <button type="submit">Create Dashboard</button>
    </form>
  );
};

export default CreateDashboard;
