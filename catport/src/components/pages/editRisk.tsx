import React from 'react';
import { Form, Input, DatePicker, Select, Button, Typography, Row, Col } from 'antd';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

const CreateRisk: React.FC = () => {
  const history = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const riskRecord = location.state.record;
  const viewers = riskRecord.viewers;
  const owner = riskRecord.owner;
  const today = new Date();
  const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  console.log("edit risk: ", riskRecord);

  const onFinish = (values: any) => {
    values.viewers = viewers;
    values.owner = owner;
    axios.post('http://localhost:3001/api/editRisk', {"newEntry" : values,
    }, { withCredentials: true })
      .then((res: any) => console.log(res.data))
      .catch((err: any) => console.error(err));
      history(-1);
  };
  
  return (
    <div style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 'calc(100vh - 114px)' }}>
      <Row justify="center">
        <Col span={24} style={{ textAlign: 'center' }}>
          <Title level={2}>Edit Risks</Title>
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
              name="riskid"
              initialValue={riskRecord && riskRecord.riskid ? riskRecord.riskid : ''}
            >
              <Input disabled/>
            </Form.Item>

            <Form.Item
              label="Project Name"
              name="projectName"
              initialValue={riskRecord && riskRecord.projectName ? riskRecord.projectName : ''}
              rules={[{ required: true, message: 'Please input the project name!' }]}
            >
              <Input disabled/>
            </Form.Item>

            <Form.Item
              label="Risk Name"
              name="riskName"
              initialValue={riskRecord && riskRecord.riskName ? riskRecord.riskName : ''}
              rules={[{ required: true, message: 'Please input the risk name!' }]}
            >
              <Input placeholder="Enter Risk Name" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              initialValue={riskRecord && riskRecord.description ? riskRecord.description : ''} 
            >
              <TextArea rows={4} placeholder="Enter Description" />
            </Form.Item>

            <Form.Item label="Date Created" name="dateCreated" initialValue={riskRecord && riskRecord.dateCreated ? dayjs(riskRecord.dateCreated.toISOString) : ''}>
              <DatePicker style={{ width: '100%' }} format="MM-DD-YYYY"  />
            </Form.Item>

          </Col>
          <Col span={12}>

            <Form.Item label="Clear by Date" name="clearBy" initialValue={riskRecord && riskRecord.clearBy ? dayjs(riskRecord.clearBy.toISOString) : ''}>
              <DatePicker style={{ width: '100%' }} format="MM-DD-YYYY"/>
            </Form.Item>

            <Form.Item label="Likelihood" name="probability" 
                initialValue={riskRecord && riskRecord.probability ? riskRecord.probability : ''}>
              <Select placeholder="Select Likelihood" >
                <Option value="certain">Certain</Option>
                <Option value="likely">Likely</Option>
                <Option value="moderate">Moderate</Option>
                <Option value="unlikely">Unlikely</Option>
                <Option value="rare">Rare</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Consequence" name="impact" initialValue={riskRecord && riskRecord.impact ? riskRecord.impact : ''}>
              <Select placeholder="Select Consequence">
                <Option value="insignificant">Insignificant</Option>
                <Option value="minor">Minor</Option>
                <Option value="moderate">Moderate</Option>
                <Option value="major">Major</Option>
                <Option value="catastrophic">Catastrophic</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Ranking" name="ranking" initialValue={riskRecord && riskRecord.ranking ? riskRecord.ranking : ''}>
              <Select placeholder="Select Ranking">
                <Option value="high">High</Option>
                <Option value="medium">Medium</Option>
                <Option value="low">Low</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Risk Stage" name="riskStage" initialValue={riskRecord && riskRecord.riskStage ? riskRecord.riskStage : ''}>
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
        <Row justify="center">
          <Col span={24} style={{ textAlign: 'center' }}>
            <Form.Item
              label="Notes"
              name="notes"
              initialValue={riskRecord.notes + "\n Edited on " + date + ": "}
            >
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateRisk;