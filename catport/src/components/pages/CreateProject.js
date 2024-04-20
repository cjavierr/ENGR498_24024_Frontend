import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../App.css'; // Import the CSS file
import type { Button, Form, Input, Select, Space } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};


function CreateProject() {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [haveHigherLevelOrg, setHaveHigherLevelOrg] = useState(false);
  const [higherLevelOrgOwner, setHigherLevelOrgOwner] = useState('');
  const [haveLowerLevelOrg, setHaveLowerLevelOrg] = useState(false);
  const [quantitativeKPIs, setQuantitativeKPIs] = useState([]);
  const [qualitativeKPIs, setQualitativeKPIs] = useState([]);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [userID, setUserID] = useState('');
  const [username, setUsername] = useState('');


  const quantitativeKPIOptions = [
    'Revenue - Actual - $',
    'Revenue - Forecast - $',
    'Expense - Actual - $',
    'Expense - Forecast - $',
    'Budget - Forecast - $',
    'Planned - Forecast - $',
    'Planned - Forecast - FTE',
    'Actual - $',
    'Actual - Hrs',
    'Manufacture - Actual - Units',
    'Manufacture - Forecast - Units',
    'Sales - Actual - $',
    'Sales - Forecast - $',
    'Inventory - Ordered - $',
    'Inventory - Instock - $',
    'Inventory - WIP - $'
  ];

  const qualitativeKPIOptions = [
    'Risks',
    'Issues',
    'Agenda Items',
    'Accomplishments',
    'Lessons Learned',
    'Assigned Action Items',
    'My Action Items',
    'Request Action Item'
  ];

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

      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'An error occurred.'); // Handle potential errors
    }
  };

  useEffect(() => {
    fetchData();
  }, [username]); // Re-run on username change


  const handleQuantitativeKPIChange = (event) => {
    const selectedKPIs = Array.from(event.target.selectedOptions, option => option.value);
    setQuantitativeKPIs(selectedKPIs);
  };

  const handleQualitativeKPIChange = (event) => {
    const selectedKPIs = Array.from(event.target.selectedOptions, option => option.value);
    setQualitativeKPIs(selectedKPIs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!projectName || quantitativeKPIs.length === 0 || qualitativeKPIs.length === 0) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/api/createNewProject', {
        projectName,
        userID,
        projectDescription,
        haveHigherLevelOrg,
        higherLevelOrgOwner,
        haveLowerLevelOrg,
        quantitativeKPIs,
        qualitativeKPIs,
        additionalNotes
      });

      setSuccessMessage(response.data.message);
      setError(null);

      // Optionally clear form fields or navigate to a different page
    } catch (error) {
      console.error('Error creating project:', error);
      setError('Failed to create project. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="projectName">Project Name:</label>
        <input
          type="text"
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="projectDescription">Project Description:</label>
        <textarea
          id="projectDescription"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={haveHigherLevelOrg}
            onChange={(e) => setHaveHigherLevelOrg(e.target.checked)}
          />
          Have Higher Level Org
        </label>
        {haveHigherLevelOrg && (
          <div>
            <label htmlFor="higherLevelOrgOwner">Higher Level Org Owner:</label>
            <input
              type="text"
              id="higherLevelOrgOwner"
              value={higherLevelOrgOwner}
              onChange={(e) => setHigherLevelOrgOwner(e.target.value)}
            />
          </div>
        )}
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            checked={haveLowerLevelOrg}
            onChange={(e) => setHaveLowerLevelOrg(e.target.checked)}
          />
          Have Lower Level Org
        </label>
      </div>

      <div>
        <label htmlFor="quantitativeKPIs">Quantitative KPIs:</label>
        <select
          id="quantitativeKPIs"
          multiple
          value={quantitativeKPIs}
          onChange={handleQuantitativeKPIChange}
          required
        >
    {quantitativeKPIOptions.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
        </select>
      </div>

      <div>
        <label htmlFor="qualitativeKPIs">Qualitative KPIs:</label>
        <select
          id="qualitativeKPIs"
          multiple
          value={qualitativeKPIs}
          onChange={handleQualitativeKPIChange}
          required
        >
    {qualitativeKPIOptions.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
        </select>
      </div>

      <div>
        <label htmlFor="additionalNotes">Additional Project Notes:</label>
        <textarea
          id="additionalNotes"
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
        />
      </div>

      <button type="submit">Create Project</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </form>
  );
}

export default CreateProject;
