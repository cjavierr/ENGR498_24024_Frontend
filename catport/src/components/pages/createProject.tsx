import React, { useState } from 'react';
import { Form, Input, Button, Select, Typography, Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox'

const { Option } = Select;
const { Title } = Typography;

const CreateProject: React.FC = () => {
  const [form] = Form.useForm();
  const [showAccessInput, setShowAccessInput] = useState(false);

  const onFinish = (values: any) => {
    console.log('Received values:', values);
  };

  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    setShowAccessInput(e.target.checked);
  };

  return (
    <div>
      <Title level={2} style={{ textAlign: 'center' }}>
        Create Project
      </Title>
      <Form
        form={form}
        name="CreateProject"
        onFinish={onFinish}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 12 }}
      >
        <Form.Item
          label="Type"
          name="type"
          rules={[{ required: true, message: 'Please input Project Type!' }]}
        >
          <Select mode="multiple">
            <Option value="quantitativeNumbers">Quantitative/Numbers</Option>
            <Option value="quantitativeTexts">Quantitative/Texts</Option>
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
            <Option value="plannedForecast">Planned Forecast</Option>
            <Option value="budgetForecast">Budget Forecast</Option>
            <Option value="actualBudget">Actual Budget</Option>
            <Option value="inventoryForecast">Inventory Forecast</Option>
            <Option value="actualInventory">Actual Inventory</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Qualitative Fields"
          name="qualitativeFields"
          rules={[{ required: true, message: 'Please select Fields to Add!' }]}
        >
          <Select mode="multiple">
            <Option value="risks">Risks</Option>
            <Option value="accomplishments">Accomplishments</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Notes to Add"
          name="notesToAdd"
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
          <Checkbox onChange={onCheckboxChange}>
            Allow higher level access
          </Checkbox>
        </Form.Item>
        {showAccessInput && (
          <Form.Item
            label="High Level Access User Name"
            name="highLevelAccessUserName"
            rules={[{ required: showAccessInput, message: "Please input the user's name!" }]}
          >
            <Input />
          </Form.Item>
        )}
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