import React, {useState} from 'react';
import { Form, Input, Button, Select, Typography, Row, Col, Space, Divider, Tag } from 'antd';

const { Option } = Select;

const CreateDashboard = () => {
    const [quantitativeFields, setQuantitativeFields] = useState<string[]>([]);
    const [qualitativeFields, setQualitativeFields] = useState<string[]>([]);
  
    const handleAddField = (field: string, isQuantitative: boolean) => {
      if (isQuantitative) {
        setQuantitativeFields([...quantitativeFields, field]);
      } else {
        setQualitativeFields([...qualitativeFields, field]);
      }
    };
  
    const handleDeleteField = (index: number, isQuantitative: boolean) => {
      if (isQuantitative) {
        const newQuantitativeFields = [...quantitativeFields];
        newQuantitativeFields.splice(index, 1);
        setQuantitativeFields(newQuantitativeFields);
      } else {
        const newQualitativeFields = [...qualitativeFields];
        newQualitativeFields.splice(index, 1);
        setQualitativeFields(newQualitativeFields);
      }
    };
  
    const onFinish = (values: any) => {
      console.log('Received values:', values);
      // Add your logic to save the project
    };
  
    return (
      <div>
        <Typography.Title level={2} style={{ textAlign: 'center' }}>
          Project Page
        </Typography.Title>
  
        <Form
          name="projectForm"
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
        >
          {/* Quantitative Section */}
          <Divider orientation="left">Quantitative Section</Divider>
          {quantitativeFields.map((field, index) => (
            <Row key={index} gutter={8} align="middle">
              <Col span={16}>
                <Tag>{field}</Tag>
              </Col>
              <Col span={8}>
                <Button onClick={() => handleDeleteField(index, true)}>Delete</Button>
              </Col>
            </Row>
          ))}
          <Space>
            <Input
              placeholder="Enter Field Name"
              onChange={(e) => handleAddField(e.target.value, true)}
            />
            <Button type="primary" onClick={() => handleAddField('New Field', true)}>
              Add Field
            </Button>
          </Space>
  
          {/* Qualitative Section */}
          <Divider orientation="left">Qualitative Section</Divider>
          {qualitativeFields.map((field, index) => (
            <Row key={index} gutter={8} align="middle">
              <Col span={16}>
                <Tag>{field}</Tag>
              </Col>
              <Col span={8}>
                <Button onClick={() => handleDeleteField(index, false)}>Delete</Button>
              </Col>
            </Row>
          ))}
          <Space>
            <Input
              placeholder="Enter Field Name"
              onChange={(e) => handleAddField(e.target.value, false)}
            />
            <Button type="primary" onClick={() => handleAddField('New Field', false)}>
              Add Field
            </Button>
          </Space>
  
          {/* Other Controls */}
          <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                Save Project
              </Button>
              <Button type="default">Delete Project</Button>
              <Button type="default">Archive Project</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
  );
};

export default CreateDashboard;
