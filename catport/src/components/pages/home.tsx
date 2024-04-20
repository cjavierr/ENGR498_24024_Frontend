import React from 'react';

import { Button, Row, Col } from 'antd';
import GetUser from './GetUser';
import CreateUser from './CreateUser';
import CreateProject from './CreateProject';
import CreateDashboard from './CreateDashboard';
import Login from './Login';
import AddProjectToUser from './AddProjectToUser';
import AddUserToProject from './AddUserToProject';
import GetProject from './GetProject';
import DashboardPage from './DashboardPage';
import MergeDashboards from './MergeDashboards';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome</h1>

      <Row gutter={[16, 16]} justify="center">
        <Col span={12}>
          <Button type="default" block>
            Create Projects
          </Button>
        </Col>
        <Col span={12}>
          <Button type="default" block>
            My Project Listings
          </Button>
        </Col>
        <Col span={12}>
          <Button type="default" block>
            Manage Risks and Issues
          </Button>
        </Col>
        <Col span={12}>
          <Button type="default" block>
            Manage Higher Level Action Request
          </Button>
        </Col>

      </Row>
    </div>
  );
}

export default Home;
