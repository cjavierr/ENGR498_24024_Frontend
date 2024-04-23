import React, { useState } from 'react';
import { Button, Input, Typography, Form, Divider, Row, Col, message } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';

const { Title } = Typography;

interface Element {
  id: number;
  value: string;
}

const CreateSubcategories: React.FC = () => {
  const [form] = Form.useForm();
  const [elements, setElements] = useState<Element[]>([]);
  const [newElement, setNewElement] = useState<string>('');
  const [subcategoryName, setSubcategoryName] = useState<string>('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [savedSubcategories, setSavedSubcategories] = useState<{ name: string; elements: Element[] }[]>([]);

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

  const handleEditElement = (index: number) => {
    setEditingIndex(index);
    setNewElement(elements[index].value);
  };

  const handleSaveElement = (index: number) => {
    if (newElement.trim() !== '') {
      const updatedElements = [...elements];
      updatedElements[index].value = newElement;
      setElements(updatedElements);
      setEditingIndex(null);
      setNewElement('');
      message.success('Element updated!');
    } else {
      message.error('Please enter a valid element.');
    }
  };

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    setSavedSubcategories([...savedSubcategories, { name: subcategoryName, elements }]);
    setSubcategoryName('');
    setElements([]);
    form.resetFields();
    message.success('Subcategory saved!');
  };

  const renderSavedSubcategories = () => {
    return savedSubcategories.map((subcategory, index) => (
      <div key={index} style={{ marginTop: '24px' }}>
        <Title level={4}>{subcategory.name}</Title>
        <table>
          <thead>
            <tr>
              <th>Element</th>
            </tr>
          </thead>
          <tbody>
            {subcategory.elements.map((element) => (
              <tr key={element.id}>
                <td>{element.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ));
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '24px' }}>
        Create Subcategory List
      </Title>
      <Form form={form} name="subcategoryForm" onFinish={onFinish} layout="vertical" autoComplete="off">
        <Form.Item name="subcategoryName" label="Subcategory Name">
          <Input
            placeholder="Enter Subcategory Name"
            value={subcategoryName}
            onChange={(e) => setSubcategoryName(e.target.value)}
          />
        </Form.Item>
        <Divider orientation="center">Subcategory Elements</Divider>
        {elements.map((element, index) => (
          <Row key={element.id} justify="center" align="middle" gutter={16} style={{ marginBottom: '10px' }}>
            <Col xs={24} sm={18} md={20} lg={21} xl={22}>
              {editingIndex === index ? (
                <Input
                  value={newElement}
                  onChange={(e) => setNewElement(e.target.value)}
                  onPressEnter={() => handleSaveElement(index)}
                />
              ) : (
                <Input value={element.value} readOnly />
              )}
            </Col>
            <Col xs={24} sm={6} md={4} lg={3} xl={2}>
              {editingIndex === index ? (
                <Button type="primary" onClick={() => handleSaveElement(index)} icon={<SaveOutlined />} style={{ width: '100%' }} />
              ) : (
                <>
                  <Button onClick={() => handleEditElement(index)} icon={<EditOutlined />} style={{ width: '50%' }} />
                  <Button danger onClick={() => handleDeleteElement(element.id)} icon={<DeleteOutlined />} style={{ width: '50%' }} />
                </>
              )}
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
        <Divider orientation="center" style={{ margin: '24px 0' }}>
          Subcategory Notes
        </Divider>
        <Form.Item name="notes" label="Notes">
          <Input.TextArea rows={4} placeholder="Enter any notes here" />
        </Form.Item>
        <Row justify="center">
          <Button type="primary" htmlType="submit">
            Save Subcategory
          </Button>
        </Row>
      </Form>
      {savedSubcategories.length > 0 && (
        <div style={{ marginTop: '24px' }}>
          <Title level={3}>Saved Subcategories</Title>
          {renderSavedSubcategories()}
        </div>
      )}
    </div>
  );
};

export default CreateSubcategories;