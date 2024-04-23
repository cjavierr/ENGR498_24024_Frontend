import React, { useState } from 'react';
import { Button, Input, Typography, Form, Divider, Row, Col, message } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Element {
  id: number;
  value: string;
}

const CreateSubcategories: React.FC = () => {
  const [form] = Form.useForm();
  const [elements, setElements] = useState<Element[]>([]);
  const [newElement, setNewElement] = useState<string>('');

  const handleAddElement = () => {
    if (newElement.trim() !== '') {
      const exists = elements.some(element => element.value.trim() === newElement.trim());
      if (!exists) {
        const newId = elements.length > 0 ? elements[elements.length - 1].id + 1 : 0;
        setElements([...elements, { id: newId, value: newElement }]);
        setNewElement('');
        message.success('Element added!');
      } else {
        message.error('Duplicate element not allowed.');
      }
    } else {
      message.error('Please enter a valid element.');
    }
  };

  const handleDeleteElement = (id: number) => {
    setElements(elements.filter(element => element.id !== id));
    message.success('Element removed!');
  };

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    message.success('Subcategory saved!');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
        Create Subcategory List
      </Title>
      <Form
        form={form}
        name="subcategoryForm"
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
      >
        <Divider orientation="center">Subcategory Elements</Divider>
        {elements.map((element) => (
  <Row key={element.id} justify="center" align="middle" gutter={16} style={{ marginBottom: '10px' }}>
    <Col xs={24} sm={18} md={20} lg={21} xl={22}>
      <Input value={element.value} readOnly />
    </Col>
    <Col xs={24} sm={6} md={4} lg={3} xl={2}>
      <Button
        danger
        onClick={() => handleDeleteElement(element.id)}
        icon={<DeleteOutlined />}
        style={{ width: '100%' }}
      />
    </Col>
  </Row>
))}
        <Row gutter={16}>
          <Col span={18}>
            <Input
              placeholder="Enter Element"
              value={newElement}
              onChange={(e) => setNewElement(e.target.value)}
              onPressEnter={handleAddElement}
            />
          </Col>
          <Col span={6}>
            <Button type="primary" onClick={handleAddElement} icon={<PlusOutlined />}>
              Add Element
            </Button>
          </Col>
        </Row>
        <Divider orientation="center" style={{ margin: '24px 0' }}>Subcategory Notes</Divider>
        <Form.Item
          name="notes"
          label="Notes"
        >
          <Input.TextArea rows={4} placeholder="Enter any notes here" />
        </Form.Item>
        <Row justify="center">
          <Button type="primary" htmlType="submit">
            Save Subcategory
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default CreateSubcategories;
