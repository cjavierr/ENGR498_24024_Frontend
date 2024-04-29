import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import axios from "axios";

import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  UnorderedListOutlined,
  HomeOutlined,
  ProfileOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const SideNav = () => {
  const history = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const username = localStorage.getItem("loggedInUser");
      const response = await axios.post("http://localhost:3001/api/getUser", {
        username: username, // Send username in request body
      });
      if (!response.data.isAdmin) {
      } else {
        setIsAdmin(true);
      }
    };
    fetchUser();
  }, []);

  const handleHomeClick = () => {
    history("/home");
  };
  const handleCreateProjectClick = () => {
    history("/createProject");
  };
  const handleCreateSubCategoriesClick = () => {
    history("/createSubcategories");
  };
  const handleProjectListingClick = () => {
    history("/projectListing");
  };
  const handleCreateDashboardClick = () => {
    history("/CreateDashboard");
  };
  const handleCreateManageDashboardClick = () => {
    history("/createManageDashboard");
  };
  const handleCreateRiskClick = () => {
    history("/createRisk");
  };
  const handleCreateManageRiskClick = () => {
    history("/createManageRisk");
  };
  const handleDashboardsViewClick = () => {
    history("/dashboardsView");
  };
  const handleMergeDashboardClick = () => {
    history("/mergeDashboard");
  };
  const handleCreateUserClick = () => {
    history("/CreateUser");
  };
  const handleProjectViewClick = () => {
    history("/projects"); // Navigate to the projects route
  };

  const handleEditKPIsClick = () => {
    history("/editKPIs");
  };

  return (
    <div style={{ background: "#000000" }}>
      <div
        style={{
          height: "32px",
          margin: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
        }}
      >
        <img
          src="/catlogo.jpg" // Update the image URL
          alt="Logo"
          style={{ marginTop: "5%", height: "100%", marginBottom: "0" }}
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ background: "#000000" }}
      >
        <>
          {isAdmin ? (
            <>
              <Menu.Item key="11" onClick={handleCreateUserClick}>
                <UserAddOutlined />
                <span> Create New User</span>
              </Menu.Item>
              <Menu.Item key="14" onClick={handleEditKPIsClick}>
                <DesktopOutlined />
                <span> Edit KPIs</span>
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item key="1" onClick={handleHomeClick}>
                <HomeOutlined />
                <span> Home</span>
              </Menu.Item>

              <Menu.Item key="12" onClick={handleProjectViewClick}>
                <ContainerOutlined />
                <span> Projects View</span>
              </Menu.Item>
              <Menu.Item key="13" onClick={handleDashboardsViewClick}>
                <ProfileOutlined />
                <span> Dashboards View</span>
              </Menu.Item>
            </>
          )}
        </>
      </Menu>
    </div>
  );
};
export default SideNav;