import React, { useState, useEffect } from "react";
import axios from "axios";

const ProjectDetails = ({ initialProjectId = "" }) => {
  const [projectId, setProjectId] = useState(initialProjectId);
  const [projectData, setProjectData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!projectId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/getProject",
        { projectId }
      );
      console.log(response.data);
      setProjectData(response.data);
    } catch (error) {
      console.error("Error fetching project:", error);
      setError(error.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [projectId]);

  const handleChange = (event) => {
    setProjectId(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Project ID"
        value={projectId}
        onChange={handleChange}
      />
      <button onClick={fetchData}>Fetch Project Details</button>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {isLoading ? (
        <p>Loading project details...</p>
      ) : projectData ? (
        <div className="project-details">
          <h2>{projectData.projectName}</h2>
          <p>{projectData.projectDescription}</p>
          {projectData.haveHigherLevelOrg && (
            <p>Higher Level Org Owner: {projectData.higherLevelOrgOwner}</p>
          )}
          {projectData.haveLowerLevelOrg && (
            <p>Have Lower Level Org</p>
          )}
          <h3>Quantitative KPIs:</h3>
          <ul>
            {projectData.quantitativeKPIs.map((kpi, index) => (
              <li key={index}>{kpi.name}: {kpi.value}</li>
            ))}
          </ul>
          <h3>Qualitative KPIs:</h3>
          <ul>
            {projectData.qualitativeKPIs.map((kpi, index) => (
              <li key={index}>{kpi.name}: {kpi.value}</li>
            ))}
          </ul>
          <p>Additional Notes: {projectData.additionalNotes}</p>
        </div>
      ) : (
        <p>Project not found.</p>
      )}
    </div>
  );
};

export default ProjectDetails;
