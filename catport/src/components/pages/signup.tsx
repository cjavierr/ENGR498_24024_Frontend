import React, { useState } from 'react';
import type { CascaderProps } from 'antd';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignUp: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

    const handleSubmit = async (values: any) => {
        try {
            const response = await axios.post('https://24024be.vercel.app/api/newuser', values, {
              withCredentials: true
          });
            console.log('Received response from server: ', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error occurred while submitting form: ', error);
        }
    };

    const onFinish = (values: any) => {
        console.log('Received values of form: ', values);
        handleSubmit(values);
    };
  

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );


  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f2f5' }}>
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
      
    >

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="userName"
        label="Username"
        tooltip="Username used at sign up"
        rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: 'Please input your first name!', whitespace: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: 'Please input your last name!', whitespace: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default SignUp;