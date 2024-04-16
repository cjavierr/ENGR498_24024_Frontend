import React from 'react';
import { Form, Input, DatePicker, Select, Button, Typography, Row, Col } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const CreateRisk: React.FC = () => {
  const history = useNavigate();
  const location = useLocation();
  const projectID = location.state.recordNumber;
  const randomNum = Math.floor(Math.random() * 900) + 100; // generates a random 3-digit number
  const recordNum = projectID + "-" + randomNum;
  console.log("create risk: " + projectID);

  const onFinish = (values: any) => { 
    axios.post('http://localhost:3001/api/addKPI', {"newEntry" : values,
      "projectID": projectID,
      "tableName": "Risks"
    }, { withCredentials: true })
      .then((res: any) => console.log(res.data))
      .catch((err: any) => console.error(err));
      history('/manageRisk')
  };

  return (
    <div style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 'calc(100vh - 114px)' }}>
      <Row justify="center">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Title level={2}>Create Risks</Title>
        </Col>
      </Row>
      <Form
        name="createRisk"
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: '1000px', margin: '0 auto' }}
      >
        <Row gutter={24}>
          <Col span={12}>
          <Form.Item
              label="Record Number"
              name="recordNumber"
              initialValue={recordNum}
            >
              <Input disabled/>
            </Form.Item>

            <Form.Item
              label="Project Name"
              name="projectName"
              rules={[{ required: true, message: 'Please input the project name!' }]}
            >
              <Input placeholder="Enter Project Name" />
            </Form.Item>

            <Form.Item
              label="Risk Name"
              name="riskName"
              rules={[{ required: true, message: 'Please input the risk name!' }]}
            >
              <Input placeholder="Enter Risk Name" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
            >
              <TextArea rows={4} placeholder="Enter Description" />
            </Form.Item>

            <Form.Item label="Date Created" name="dateCreated">
              <DatePicker style={{ width: '100%' }} format="MM-DD-YYYY"  />
            </Form.Item>

          </Col>
          <Col span={12}>

            <Form.Item label="Clear by Date" name="clearBy">
              <DatePicker style={{ width: '100%' }} format="MM-DD-YYYY"  />
            </Form.Item>

            <Form.Item label="Likelihood" name="probability">
              <Select placeholder="Select Likelihood">
                <Option value="certain">Certain</Option>
                <Option value="likely">Likely</Option>
                <Option value="moderate">Moderate</Option>
                <Option value="unlikely">Unlikely</Option>
                <Option value="rare">Rare</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Consequence" name="impact">
              <Select placeholder="Select Consequence">
                <Option value="insignificant">Insignificant</Option>
                <Option value="minor">Minor</Option>
                <Option value="moderate">Moderate</Option>
                <Option value="major">Major</Option>
                <Option value="catastrophic">Catastrophic</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Ranking" name="ranking">
              <Select placeholder="Select Ranking">
                <Option value="high">High</Option>
                <Option value="medium">Medium</Option>
                <Option value="low">Low</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Risk Stage" name="riskStage">
              <Select placeholder="Select stage">
                <Option value="New">New</Option>
                <Option value="Work in Progress">Work in Progress</Option>
                <Option value="Solved and closed">Solved and Closed</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="center">
          <Col span={24} style={{ textAlign: 'center' }}>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateRisk;