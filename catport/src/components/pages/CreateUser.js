import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button, Typography, message, Switch, Select } from 'antd';

const { Title } = Typography;
const { Option } = Select;

function CreateUser() {
  const [form] = Form.useForm();
  const [error, setError] = useState(null);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:3001/api/newuser', values);
      message.success(response.data.message);
      form.resetFields(); // Clear form fields after successful submission
      setError(null);
    } catch (error) {
      console.error('Error creating user:', error);
      setError('Failed to create user. Please check your details and try again.');
    }
  };

  return (
    <div style={{ width: '400px', margin: 'auto' }}>
      <Title level={2}>Create User</Title>
      <Form
        form={form}
        onFinish={handleSubmit}
        initialValues={{ remember: true }}
        layout="vertical"
      >
        <Form.Item
          label="Username"
          name="userName"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Manager"
          name="manager"
          rules={[{ required: true, message: 'Please select the manager!' }]}
        >
          <Select placeholder="Select manager">
            <Option value="managerID1">Manager 1</Option>
            <Option value="managerID2">Manager 2</Option>
            {/* Add more managers as needed */}
          </Select>
        </Form.Item>
        <Form.Item
          label="Department"
          name="department"
          rules={[{ required: true, message: 'Please select the department!' }]}
        >
          <Select placeholder="Select department">
            <Option value="departmentID1">Department 1</Option>
            <Option value="departmentID2">Department 2</Option>
            {/* Add more departments as needed */}
          </Select>
        </Form.Item>
        <Form.Item
          label="Admin Account"
          name="isAdmin"
          valuePropName="checked"
          initialValue={false}
        >
          <Switch />
        </Form.Item>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateUser;
