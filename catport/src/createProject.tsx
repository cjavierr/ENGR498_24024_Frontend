import React from 'react';
import { Form, Input, Button, Select, Typography, Checkbox } from 'antd';
 

const { Option } = Select;

const CreateProject: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values:', values);
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
        name="type"
        rules={[{ required: true, message: 'Please input project type!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Project Name"
        name="projectName"
        rules={[{ required: true, message: 'Please input the Project Name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Record Number"
        name="recordNumber"
        rules={[{ required: true, message: 'Please input the Record Number!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Quantitative Fields"
        name="quantitativeFields"
        rules={[{ required: true, message: 'Please select Fields to Add!' }]}
      >
        <Select mode="multiple">
          <Option value="field1">Planned Forecast</Option>
          <Option value="field2">Budget Forecast</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Qualitative Fields"
        name="qualitativeFields"
        rules={[{ required: true, message: 'Please select Fields to Add!' }]}
      >
        <Select mode="multiple">
          <Option value="field1">Risks</Option>
          <Option value="field2">Accomplisments</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Notes to Add"
        name="notesToAdd"
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
