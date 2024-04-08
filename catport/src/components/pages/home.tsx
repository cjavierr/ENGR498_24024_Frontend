import React from 'react';

import { Button, Row, Col } from 'antd';
import GetUser from '../../GetUser';
import CreateUser from '../../CreateUser';
import CreateProject from '../../CreateProject';
import CreateDashboard from '../../CreateDashboard';
import Login from '../../Login';
import AddProjectToUser from '../../AddProjectToUser';
import AddUserToProject from '../../AddUserToProject';
import GetProject from '../../GetProject';
import GetDashboard from '../../GetDashboard';

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
        <Col span={12}>
          <GetUser />
        </Col>
        <Col span={12}>
          <CreateUser />
        </Col>
        <Col span={12}>
          <CreateProject />
        </Col>
        <Col span={12}>
          <CreateDashboard />
        </Col>
        <Col span={12}>
          <Login />
        </Col>
        <Col span={12}>
          <AddProjectToUser />
        </Col>
        <Col span={12}>
          <AddUserToProject />
        </Col>
        <Col span={12}>
          <GetProject />
        </Col>
        <Col span={12}>
          <GetDashboard />
        </Col>
      </Row>
    </div>
  );
}

export default Home;
