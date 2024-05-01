import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Space, Button, Modal, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const DashboardsView = () => {
  const [dashboards, setDashboards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingDashboardId, setDeletingDashboardId] = useState(null);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("loggedInUser");

    const fetchDashboards = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://24024be.vercel.app/api/userDashboards",
          {
            params: {
              username: username,
            },
          }
        );
        await setDashboards(response.data.dashboards);
        setLoading(false);
        console.log(dashboards);
        console.log(response);
      } catch (error) {
        console.error("Error fetching dashboards:", error);
        setLoading(false);
      }
    };

    fetchDashboards();
  }, []);

  const handleDeleteDashboard = async (dashboardID) => {
    try {
      // Show confirmation modal
      console.log("Deleting: ", dashboardID);
      setDeletingDashboardId(dashboardID);
      setDeleteConfirmVisible(true);
      navigate("/dashboardsView")
    } catch (error) {
      console.error("Error deleting dashboard:", error);
      message.error("Failed to delete dashboard");
    }
  };

  const confirmDeleteDashboard = async () => {
    try {
      // Call backend API to delete dashboard
      await axios.post(`https://24024be.vercel.app/api/deleteDashboard`, {
        dashid: deletingDashboardId,
      });
      message.success("Dashboard deleted successfully");
      // Remove the deleted dashboard from the dashboards list
      setDashboards(
        dashboards.filter((dashboard) => dashboard.dashboardID !== deletingDashboardId)
      );
      setDeletingDashboardId(null);
      setDeleteConfirmVisible(false);
    } catch (error) {
      console.error("Error deleting dashboard:", error);
      message.error("Failed to delete dashboard");
    }
  };

  const cancelDeleteDashboard = () => {
    // Cancel delete action
    setDeletingDashboardId(null);
    setDeleteConfirmVisible(false);
  };

  const columns = [
    {
      title: "Dashboard ID",
      dataIndex: "dashid",
      key: "dashid",
    },
    {
      title: "Project ID",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Owner",
      dataIndex: "ownerid",
      key: "ownerid",
    },
    {
      title: "Escalate",
      dataIndex: "escalate",
      key: "escalate",
      render: (text, record) => (
        <span>{record.escalate ? "Yes" : "No"}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link to={`/dashboardView/${record.dashid}`}>View</Link>
          <Link to={`/DashboardMerge/${record.dashid}`}>Map & Merge</Link>

          <a onClick={() => handleDeleteDashboard(record.dashid)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={dashboards}
        loading={loading}
        rowKey={(record) => record.dashid}
      />
      <Modal
        title="Confirm Delete"
        visible={deleteConfirmVisible}
        onOk={confirmDeleteDashboard}
        onCancel={cancelDeleteDashboard}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this dashboard?</p>
      </Modal>
    </div>
  );
};

export default DashboardsView;
