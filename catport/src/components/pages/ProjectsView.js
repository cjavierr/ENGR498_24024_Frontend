import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space, Button, Modal, message } from "antd";
import { Link } from "react-router-dom";

const ProjectsView = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingProjectId, setDeletingProjectId] = useState(null);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("loggedInUser");

    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3001/api/userProjects",
          {
            params: {
              userName: username,
            },
          }
        );
        await setProjects(response.data.projects);
        setLoading(false);
        console.log(projects);
        console.log(response);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleDeleteProject = async (projectId) => {
    try {
      // Show confirmation modal
      setDeletingProjectId(projectId);
      setDeleteConfirmVisible(true);
    } catch (error) {
      console.error("Error deleting project:", error);
      message.error("Failed to delete project");
    }
  };

  const confirmDeleteProject = async () => {
    try {
      // Call backend API to delete project
      await axios.post(`http://localhost:3001/api/deleteProject`, {
        projectId: deletingProjectId,
      });
      message.success("Project deleted successfully");
      // Remove the deleted project from the projects list
      setProjects(
        projects.filter((project) => project.projectID !== deletingProjectId)
      );
      setDeletingProjectId(null);
      setDeleteConfirmVisible(false);
    } catch (error) {
      console.error("Error deleting project:", error);
      message.error("Failed to delete project");
    }
  };

  const cancelDeleteProject = () => {
    // Cancel delete action
    setDeletingProjectId(null);
    setDeleteConfirmVisible(false);
  };

  const columns = [
    {
      title: "Project Number",
      dataIndex: "projectID",
      key: "projectID",
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Description",
      dataIndex: "projectDescription",
      key: "projectDescription",
    },
    {
      title: "Owner",
      dataIndex: "projectOwner",
      key: "projectOwner",
    },
    {
      title: "Dashboards",
      dataIndex: "dashboards",
      key: "dashboards",
      render: (text, record) => (
        <div>
        {record.dashboards.map((dashboard, index) => (
          <div key={index}>
            <Link to={`/dashboardView/${dashboard}`}>{dashboard}</Link>
          </div>
        ))}
      </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/ProjectView/${record.projectID}`}>View</Link>
          <Link to={`/EditProject/${record.projectID}`}>Edit</Link>
          <Link to={`/createDashboard/${record.projectID}`}>
            Create Dashboard
          </Link>
          <a onClick={() => handleDeleteProject(record.projectID)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary">
        <Link to="/createProject">Create Project</Link>
      </Button>
      <Table
        columns={columns}
        dataSource={projects}
        loading={loading}
        rowKey={(record) => record.projectId}
      />
      <Modal
        title="Confirm Delete"
        visible={deleteConfirmVisible}
        onOk={confirmDeleteProject}
        onCancel={cancelDeleteProject}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this project?</p>
      </Modal>
    </div>
  );
};

export default ProjectsView;
