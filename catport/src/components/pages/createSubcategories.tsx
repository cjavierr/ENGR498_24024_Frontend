import React, { useState } from 'react';
import { Button, Input, Select, Typography, Form, Row, Col, Divider } from 'antd';

const { Option } = Select;

const SubcategoryPage: React.FC = () => {
  const [elements, setElements] = useState<string[]>([]);

  const handleAddElement = (element: string) => {
    setElements([...elements, element]);
  };

  const onFinish = (values: any) => {
    console.log('Received values:', values);
    // Add your logic to save the subcategory
  };

  return (
    <div>
      <Typography.Title level={2} style={{ textAlign: 'center' }}>
        Subcategory Page
      </Typography.Title>

      <Form
        name="subcategoryForm"
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
      >
        
        <Form.Item
          label="Subcategory Types"
          name="subcategoryTypes"
          rules={[{ required: true, message: 'Please select subcategory types!' }]}
        >
          <Select mode="multiple">
            <Option value="type1">Type 1</Option>
            <Option value="type2">Type 2</Option>
          </Select>
        </Form.Item>

        {/* Subcategory Elements */}
        <Divider orientation="left">Subcategory Elements</Divider>
        <Row gutter={8}>
          <Col span={16}>
            <Form.Item
              name="elements"
              noStyle
            >
              <Input.Group compact>
                <Input
                  placeholder="Enter Element"
                  onChange={(e) => handleAddElement(e.target.value)}
                />
                <Button type="primary" onClick={() => handleAddElement('New Element')}>
                  Add Element
                </Button>
              </Input.Group>
            </Form.Item>
          </Col>
        </Row>

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

export default SubcategoryPage;
