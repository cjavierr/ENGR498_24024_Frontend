import React, { useState } from 'react';
import { Form, Button, Select, Radio, Checkbox, Typography, Input, RadioChangeEvent } from 'antd';

const { Option } = Select;
const { Title } = Typography;

const initialQuantitativeNumberFields = [
  'Revenue - Actual - $', 'Revenue - Forecast - $',
  'Expense - Actual - $', 'Expense - Forecast - $',
  'Budget - Forecast - $', 'Planned - Forecast - $',
  'Planned - Forecast - FTE', 'Actual - $',
  'Actual - FTE', 'Actual - Hrs', 'Manufacture - Actual - Units',
  'Manufacture - Forecast - Units', 'Sales - Actual - $',
  'Sales - Forecast - $', 'Inventory - Ordered - $',
  'Inventory - Instock - $', 'Inventory - WIP - $',
  'Inventory - Ordered - Units', 'Inventory - Instock - Units',
  'Inventory - WIP - Units',
];

const AdminHomePage: React.FC = () => {
  const [form] = Form.useForm();
  const [selectedType, setSelectedType] = useState<'numbers' | 'texts'>('numbers');
  const [quantitativeNumberFields, setQuantitativeNumberFields] = useState(initialQuantitativeNumberFields);
  const [newField, setNewField] = useState('');

  const onTypeChange = (e: RadioChangeEvent) => {
    setSelectedType(e.target.value);
  };

  const onFinish = (values: any) => {
    console.log('Form values:', values);
    // Handle form submission logic here
  };

  const addField = () => {
    if (newField && !quantitativeNumberFields.includes(newField)) {
      setQuantitativeNumberFields(prevFields => [...prevFields, newField]);
      setNewField('');
      form.setFieldsValue({
        quantitativeNumberFields: [...quantitativeNumberFields, newField]
      });
    }
  };

  return (
    <div style={{ margin: '24px', background: '#fff', padding: '24px' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Admin Home Page</Title>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item name="project" label="Project">
          <Select mode="multiple" placeholder="Select projects">
            <Option value="Project 1">Project 1</Option>
            <Option value="Project 2">Project 2</Option>
            <Option value="Project 3">Project 3</Option>
          </Select>
        </Form.Item>

        <Form.Item name="type" label="Type">
          <Radio.Group onChange={onTypeChange}>
            <Radio value="numbers">Quantitative / Numbers</Radio>
            <Radio value="texts">Quantitative / Texts</Radio>
          </Radio.Group>
        </Form.Item>

        {selectedType === 'numbers' && (
          <Form.Item name="quantitativeNumberFields" label="Quantitative / Numbers Fields">
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select or add fields"
              dropdownRender={menu => (
                <>
                  {menu}
                  <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                    <Input style={{ flex: 'auto' }} value={newField} onChange={e => setNewField(e.target.value)} />
                    <Button type="link" onClick={addField} style={{ flex: 'none', padding: '0 8px' }}>
                      Add field
                    </Button>
                  </div>
                </>
              )}
            >
              {quantitativeNumberFields.map((field) => (
                <Option key={field} value={field}>
                  {field}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item name="timePhase" label="Time Phase">
          <Select>
            <Option value="Daily">Daily</Option>
            <Option value="Weekly">Weekly</Option>
            <Option value="Monthly">Monthly</Option>
            <Option value="Yearly">Yearly</Option>
          </Select>
        </Form.Item>

        <Form.Item name="timePhaseType" label="Time Phase Type">
          <Select>
            <Option value="Past">Past</Option>
            <Option value="Future">Future</Option>
            <Option value="Past+Future">Past+Future</Option>
          </Select>
        </Form.Item>

        {selectedType === 'texts' && (
          <>
            <Form.Item name="risksEscalation" label="Risks - Escalate after 30 days">
              <Checkbox />
            </Form.Item>
            <Form.Item name="issuesEscalation" label="Issues - Escalate after 30 days">
              <Checkbox />
            </Form.Item>
          </>
        )}

        <Form.Item name="rollUp" label="Roll Up">
          <Radio.Group>
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group> {/* Here was the missing closing bracket */}
        </Form.Item>
        
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminHomePage;
