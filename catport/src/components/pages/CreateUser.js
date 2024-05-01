import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Input, Button, Typography, message, Switch, Select } from "antd";

const { Title } = Typography;
const { Option } = Select;

function CreateUser() {
  const [form] = Form.useForm();
  const [error, setError] = useState(null);
  const [usernames, setUsernames] = useState([]);
  const [departments, setDepartments] = useState([]);


  function getAllFieldNames(obj) {
    const fieldNames = [];
  
    // Helper function to recursively traverse the object
    function traverse(obj) {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
          traverse(obj[key]); // Recursively traverse nested objects
        } else {
          fieldNames.push(key); // Add field name to the array
        }
      }
    }
    traverse(obj); // Start traversal from the top-level object
    return fieldNames;
  }

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        "https://24024be.vercel.app/api/newuser",
        values
      );
      message.success(response.data.message);
      form.resetFields(); // Clear form fields after successful submission
      setError(null);
    } catch (error) {
      console.error("Error creating user:", error);
      setError(
        "Failed to create user. Please check your details and try again."
      );
    }
  };

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await axios.get(
          "https://24024be.vercel.app/api/allUsernames"
        );
        setUsernames(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCompanyOrganization = async() => {
      try {
        const response = await axios.get(
          "https://24024be.vercel.app/api/getOrganizationGlossary"
        );
        // setDepartments(response.data);
        console.log(response.data);
        const departs = getAllFieldNames(response.data.Departments);
        console.log(departs);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsernames();
    fetchCompanyOrganization();
  }, []);

  return (
    <div style={{ width: "400px", margin: "auto" }}>
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
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Manager"
          name="manager"
          rules={[{ required: true, message: "Please select the manager!" }]}
        >
          <Select placeholder="Select manager">
            {usernames.map((username) => (
              <Select.Option key={username} value={username}>
                {username}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="Department"
          name="department"
          rules={[{ required: true, message: "Please select the department!" }]}
        >
          <Select placeholder="Select department">
          {departments.map((department) => (
              <Select.Option key={department} value={department}>
                {department}
              </Select.Option>
            ))}
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateUser;
