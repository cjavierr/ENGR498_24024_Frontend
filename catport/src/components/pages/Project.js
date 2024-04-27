import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Descriptions, Tag, Button } from "antd";
import { Link } from "react-router-dom";

const ProjectView = () => {
  const { projectId } = useParams(); // Get the projectId from the URL params
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        // Fetch the project details from the backend using projectId
        const response = await axios.post(
          "http://localhost:3001/api/getProject",
          {
            projectId: projectId,
          }
        );
        await setProject(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]); // Fetch project details whenever projectId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="project-view-container">
      <Button type="primary">
        <Link to="/projects">Back to Projects</Link>
      </Button>
      <h2>{project.projectName}</h2>
      <Descriptions title="Project Details" bordered>
        <Descriptions.Item label="Project ID">
          {project.projectID}
        </Descriptions.Item>
        <Descriptions.Item label="Owner">
          {project.projectOwner}
        </Descriptions.Item>
        <Descriptions.Item label="Description">
          {project.projectDescription}
        </Descriptions.Item>
        <Descriptions.Item label="Project Notes">
          {project.projectNotes.map((note, index) => (
            <p key={index}>
              {note.date}: {note.Note}
            </p>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Subcategories">
          {project.subcategories.map((subcategory, index) => (
            <div key={index}>
              <p>{subcategory.subcategoryheading}</p>
              {subcategory.list.map((item, subIndex) => (
                <Tag key={subIndex}>{item.subcategorydetail}</Tag>
              ))}
            </div>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="KPIs - Qualitative">
          {project.KPIs.qualitative.map((item, index) => (
            <p key={index}>
            <Link key={index} to={`/${item}/${project.projectID}`}>{item}</Link>
            </p>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="KPIs - Quantitative">
          {project.KPIs.quantitative.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </Descriptions.Item>
        <Descriptions.Item label="Users">
          {project.users.map((user, index) => (
            <p key={index}>
              {user.username} - {user.role}
            </p>
          ))}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default ProjectView;
