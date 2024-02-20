import React from 'react';
import {useState} from 'react';
import { Form, Input, Button, Select, Typography, Checkbox } from 'antd';
import axios from 'axios';

const { Option } = Select;

const CreateProject: React.FC = () => {
  const [projectType, setProjectType] = useState([]);
  const onFinish = (values: any) => {
    const fields = [];

    if(values.quantitativeFields !== undefined) {
      for (const field of values.quantitativeFields || []) {
        fields.push({ title: field, type: 'quantitative' });
      }
    }

    if(values.qualitativeFields !== undefined) {
      for (const field of values.qualitativeFields || []) {
        fields.push({ title: field, type: 'qualitative' });
      }
    }

    console.log('Fields:', fields);
    const responseObject = {
      projectName: values.projectName,
      listKPIs: fields,
      projectDescription: values.projectDescription,
    }
    console.log('Response Object:', responseObject);
    console.log('Received values:', values);

    axios.post('http://localhost:3001/api/createNewProject', responseObject, { withCredentials: true })
      .then(response => {
        console.log('API response:', response.data);
      })
      .catch(error => {
        console.error('API error:', error);
      });
  };

  return (
    <div>
    <Typography.Title level={2} style={{ textAlign: 'center' }}>
        Create Project
      </Typography.Title>
    <Form
      name="CreateProject"
      onFinish={onFinish}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 12 }}
    >
      <Form.Item
        label="Type"
        rules={[{ required: true, message: 'Please input project type!' }]}
      >
        <Select mode="multiple">
          <Option value="quantitative">Quantitative</Option>
          <Option value="quanlitative">Qualitative</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Project Name"
        name="projectName"
        rules={[{ required: true, message: 'Please input the Project Name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Quantitative Fields"
        name="quantitativeFields"
      >
        <Select mode="multiple">
          <Option value="plannedForecast">Planned Forecast</Option>
          <Option value="budgetForecast">Budget Forecast</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Qualitative Fields"
        name="qualitativeFields"
      >
        <Select mode="multiple">
          <Option value="risks">Risks</Option>
          <Option value="accomplishments">Accomplisments</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Org / Project description"
        name="projectDescription"
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
          <Form.Item
            name="allowHigherLevelAccess"
            valuePropName="checked"
            noStyle
          >
            <Checkbox>
              Allow higher level access
            </Checkbox>
          </Form.Item>
        </Form.Item>
        
      <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default CreateProject;
