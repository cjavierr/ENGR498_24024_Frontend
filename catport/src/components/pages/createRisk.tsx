import React from 'react';
import { Form, Input, DatePicker, Select, Button, Typography, Row, Col } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const CreateRisk: React.FC = () => {
  const location = useLocation();
  const projectID = location.state.recordNumber;
  console.log("create risk: " + projectID);

  const onFinish = (values: any) => { 
    axios.post('http://localhost:3001/api/addKPI', {"newEntry" : values,
      "projectID": projectID,
      "tableName": "Risks"
    })
      .then((res: any) => console.log(res.data))
      .catch((err: any) => console.error(err));
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
              rules={[{ required: true, message: 'Please input the record number!' }]}
            >
              <Input placeholder="Auto-Generate Record Number" />
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
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

          </Col>
          <Col span={12}>

            <Form.Item label="Clear by Date" name="clearByDate">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Likelihood" name="likelihood">
              <Select placeholder="Select Likelihood">
                <Option value="certain">Certain</Option>
                <Option value="likely">Likely</Option>
                <Option value="moderate">Moderate</Option>
                <Option value="unlikely">Unlikely</Option>
                <Option value="rare">Rare</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Consequence" name="consequence">
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