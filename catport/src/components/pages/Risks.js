import React, { useState, useEffect } from "react";
import axios from "axios";
import { theme, Typography } from "antd";

import { useParams } from "react-router-dom";

import { Table } from "antd";

const {Title} = Typography;


const Risks = () => {
  const { projectId } = useParams(); // Get the projectId from the URL params

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState();
  const [project, setProject] = useState();
  const [risks, setRisks] = useState();

  // Assuming project.risks is an array of risk objects with properties: id, description, likelihood, impact\

  useEffect(() => {
    console.log(projectId);
    setUsername(localStorage.getItem("loggedInUser"));

    const fetchProject = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/getProject",
          {
            projectId: projectId,
          }
        );
        console.log(response);
        setProject(response.data);
      } catch (error) {}
    };

    fetchProject();
    setLoading(false);
  }, [projectId]);

  const columns = [
    {
      title: "ProjectID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Likelihood",
      dataIndex: "likelihood",
      key: "likelihood",
    },
    {
      title: "Impact",
      dataIndex: "impact",
      key: "impact",
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <>
    <Title>{project.projectName + " - Risks"}</Title>
    <Title level={3} type="secondary">{project.projectID}</Title>

      <Table
        dataSource={project.risks} // Assuming project.risks contains the array of risk objects
        columns={columns}
        rowKey="id" // Assuming each risk object has a unique identifier named "id"
        pagination={false} // If you want to disable pagination
      />
    </>
  );
};

export default Risks;
