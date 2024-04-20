import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const onSignup = () => {
    navigate('/signup');
  }
  
  const onFinish = async (values: any) => {
      try {
          const response = await axios.post('http://localhost:3001/api/login', {
              userName: values.username,
              password: values.password
          }, {
              withCredentials: true
          });
          console.log('Received values of form: ', values);
          navigate('/home');
      } catch (error) {
          console.error('Error signing in:', error);
      }
  };


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a onClick={onSignup}>register now!</a>
      </Form.Item>
    </Form>
    </div>
  );
};

export default LoginPage;