import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  DownloadOutlined,
  HomeOutlined,
  ProfileOutlined,
  UserAddOutlined,
  ContainerOutlined,
  SolutionOutlined,
  TableOutlined,
} from "@ant-design/icons";

import { Button, Row, Col, Typography, Table } from "antd";

import GetUser from "./GetUser";
import CreateUser from "./CreateUser";
import CreateProject from "./CreateProject";
import CreateDashboard from "./CreateDashboard";
import Login from "./Login";
import AddProjectToUser from "./AddProjectToUser";
import AddUserToProject from "./AddUserToProject";
import GetProject from "./GetProject";
import DashboardPage from "./DashboardPage";

const { Title } = Typography;

const Home = () => {
  const [username, setUsername] = useState("");
  const [actionItems, setActionItems] = useState(0);

  useEffect(() => {
    setUsername(localStorage.getItem("loggedInUser") ?? "");
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Title>Welcome to Catport, {username}</Title>

      <Title level={3} type="secondary">
        You Have {actionItems} Pending Action Items{" "}
      </Title>

      <Title level={5}>
        My Quick Links
      </Title>

      <Row gutter={[16, 16]} justify="center">
        <Col span={12}>
          <Link to="/createProject">
            <Button type="default" block>
              <ContainerOutlined />
              Create New Project
            </Button>
          </Link>
        </Col>
        <Col span={12}>
          <Link to="/createProject">
            <Button type="default" block>
              <SolutionOutlined />
              My Projects{" "}
            </Button>
          </Link>
        </Col>
        <Col span={12}>
          <Link to="/createProject">
            <Button type="default" block>
              <TableOutlined />
              My Dashboards{" "}
            </Button>
          </Link>
        </Col>
        <Col span={12}>
          <Link to="/createProject">
            <Button type="default" block>
              <UserAddOutlined />
              Create New User{" "}
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
