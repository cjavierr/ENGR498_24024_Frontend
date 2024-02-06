import React, { useState } from 'react';
import { Button, Input, Select, Typography, Form, Divider } from 'antd';

const { Option } = Select;

const CreateSubcategories: React.FC = () => {
  const [subcategoryTypes, setSubcategoryTypes] = useState<string[]>([]);
  const [elements, setElements] = useState<string[]>([]);
  const [newElement, setNewElement] = useState<string>('');

  const handleAddElement = () => {
    if (newElement.trim() !== '') {
      setElements([...elements, newElement]);
      setNewElement('');
    }
  };

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    // Add your logic to save the subcategory
  };

  return (
    <div>
      <Typography.Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Create Subcategory List
      </Typography.Title>

      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            borderRight: '1px solid #ddd',
            paddingRight: '10px',
            marginRight: '10px',
          }}
        >
          <Typography.Title level={4}>Org Name - xyz<br></br>Org Admin - xyz </Typography.Title>
        </div>
        <div>
          <Typography.Title level={4}>Subcategory number - SC001</Typography.Title>
        </div>
      </div>

      <Form
        name="subcategoryForm"
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
      >
        {/* Subcategory Types */}
        <Form.Item
          label="Subcategory Type"
          name="subcategoryTypes"
          rules={[{ required: true, message: 'Please select subcategory types!' }]}
        >
          <Select mode="multiple" onChange={(values) => setSubcategoryTypes(values)}>
            <Option value="type1">Roles</Option>
            <Option value="type2">Type 2</Option>
          </Select>
        </Form.Item>

        {/* Subcategory Elements */}
        <Divider orientation="left">Subcategory Elements</Divider>
        {elements.map((element, index) => (
          <Form.Item
            key={index}
            name={['elements', index]}
            initialValue={element}
            wrapperCol={{ offset: 6, span: 12 }}
            style={{ marginBottom: 0 }}
          >
            <Input placeholder="Enter Element" />
          </Form.Item>
        ))}
        <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
          <Input.Group>
            <Input
              placeholder="Enter Element"
              value={newElement}
              onChange={(e) => setNewElement(e.target.value)}
            />
            <Button type="primary" onClick={handleAddElement}>
              Add Element
            </Button>
          </Input.Group>
        </Form.Item>

        {/* Subcategory Notes */}
        <Divider orientation="left">Subcategory Notes</Divider>
        <Form.Item
          label="Notes"
          name="subcategoryNotes"
        >
          <Input.TextArea />
        </Form.Item>

        {/* Other Controls */}
        <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
          <Button type="primary" htmlType="submit">
            Save Subcategory
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateSubcategories;
