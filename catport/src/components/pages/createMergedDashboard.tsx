import React, { useState } from 'react';
import { Form, Button, Typography, Layout, Row, Col, Select, Input, DatePicker, InputNumber, Steps } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import Spreadsheet, { CellBase } from 'react-spreadsheet';
import dayjs, { Dayjs } from 'dayjs';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { Checkbox } from 'antd';



const { Title, Text } = Typography;
const { Content } = Layout;
const { Option } = Select;
const { Step } = Steps;

interface SpreadsheetData extends CellBase {
  value: string;
}

interface QuantitativeField {
  fieldName: string;
  data: SpreadsheetData[][];
  timePhase: string;
  subcategories: string[];
  totalPeriods: number;
  startDate: Dayjs;
}

const fieldNames = {
  revenueActual: "Revenue - Actual - $",
  revenueForecast: "Revenue - Forecast - $",
  expenseActual: "Expense - Actual - $",
  expenseForecast: "Expense - Forecast - $",
  budgetForecast: "Budget - Forecast - $",
  plannedForecastDollar: "Planned - Forecast - $",
  plannedForecastFTE: "Planned - Forecast - FTE",
  actualDollar: "Actual - $",
  actualFTE: "Actual - FTE",
  actualHrs: "Actual - Hrs",
  manufactureActualUnits: "Manufacture - Actual - Units",
  manufactureForecastUnits: "Manufacture - Forecast - Units",
  salesActualDollar: "Sales - Actual - $",
  salesForecastDollar: "Sales - Forecast - $",
  inventoryOrderedDollar: "Inventory - Ordered - $",
  inventoryInStockDollar: "Inventory - Instock - $",
  inventoryWIPDollar: "Inventory - WIP - $",
  inventoryOrderedUnits: "Inventory - Ordered - Units",
  inventoryInStockUnits: "Inventory - Instock - Units",
  inventoryWIPUnits: "Inventory - WIP - Units"
};

const subcategories = [
  "Shop Mechanics",
  "Instrument Techs 1",
  "Instrument Techs 2",
  "Operators 1",
  "Operators 2",
  "Engineer - Type 1",
  "Engineer - Type 2",
  "Engineer - Type 3",
  "Others"
];

const MergedDashboard: React.FC = () => {
  const [form] = Form.useForm();
  const [selectedAction, setSelectedAction] = useState<'create' | 'merge'>('create');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [highLevelOrgName, setHighLevelOrgName] = useState<string>('');
  const [dashboardNotes, setDashboardNotes] = useState<string>('');
  const [selectedQuantitativeField, setSelectedQuantitativeField] = useState<string>('');
  const [selectedTimePhase, setSelectedTimePhase] = useState<string>('');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [totalPeriods, setTotalPeriods] = useState<number>(0);
  const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(null);
  const [quantitativeFields, setQuantitativeFields] = useState<QuantitativeField[]>([]);
  const [selectedDashboards, setSelectedDashboards] = useState<string[]>([]);
  const [customGroups, setCustomGroups] = useState<{ name: string; subcategories: string[] }[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [mappedSubcategoryName, setMappedSubcategoryName] = useState('');
  const [showHigherLevelOrgName, setShowHigherLevelOrgName] = useState(false);

  const dashboardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '24px',
    overflow: 'auto',
  };

  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    setShowHigherLevelOrgName(e.target.checked);
  };

  const spreadsheetContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '100%',
    overflow: 'auto',
  };

  const onActionChange = (value: 'create' | 'merge') => {
    setSelectedAction(value);
  };

  const onProjectChange = (value: string) => {
    setSelectedProject(value);
    setQuantitativeFields([]); // Clear the quantitative fields when changing the project
  };

  const onHighLevelOrgNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHighLevelOrgName(event.target.value);
  };

  const onDashboardNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDashboardNotes(event.target.value);
  };

  const onQuantitativeFieldChange = (value: string) => {
    setSelectedQuantitativeField(value);
  };

  const onTimePhaseChange = (value: string) => {
    setSelectedTimePhase(value);
  };

  const onSubcategoriesChange = (value: string[]) => {
    setSelectedSubcategories(value);
  };

  const onTotalPeriodsChange = (value: number | null) => {
    if (value !== null) {
      setTotalPeriods(value);
    }
  };

  const onStartDateChange = (date: Dayjs | null) => {
    setSelectedStartDate(date);
  };

  const handleDashboardChange = (selected: string[]) => {
    setSelectedDashboards(selected);
  };

  const handleGroupSubcategoriesChange = (index: number, value: string[]) => {
    const updatedGroups = [...customGroups];
    updatedGroups[index].subcategories = value;
    setCustomGroups(updatedGroups);
  };

  const addCustomGroup = () => {
    setCustomGroups([...customGroups, { name: '', subcategories: [] }]);
  };

  const updateCustomGroupName = (index: number, name: string) => {
    const updatedGroups = [...customGroups];
    updatedGroups[index].name = name;
    setCustomGroups(updatedGroups);
  };

  const deleteCustomGroup = (index: number) => {
    const updatedGroups = [...customGroups];
    updatedGroups.splice(index, 1);
    setCustomGroups(updatedGroups);
  };

  const toggleGroupExpansion = (groupName: string) => {
    if (expandedGroups.includes(groupName)) {
      setExpandedGroups(expandedGroups.filter(name => name !== groupName));
    } else {
      setExpandedGroups([...expandedGroups, groupName]);
    }
  };

  const onSaveField = () => {
    if (
      selectedQuantitativeField &&
      selectedTimePhase &&
      selectedSubcategories.length > 0 &&
      totalPeriods > 0 &&
      selectedStartDate
    ) {
      const fieldName = fieldNames[selectedQuantitativeField as keyof typeof fieldNames] || selectedQuantitativeField;
      const data = generateSpreadsheetData(selectedSubcategories, totalPeriods);
      const newField: QuantitativeField = {
        fieldName,
        data,
        timePhase: selectedTimePhase,
        subcategories: selectedSubcategories,
        totalPeriods,
        startDate: selectedStartDate,
      };
      setQuantitativeFields([...quantitativeFields, newField]);
      setSelectedQuantitativeField('');
      setSelectedTimePhase('');
      setSelectedSubcategories([]);
      setTotalPeriods(0);
      setSelectedStartDate(null);
    } else {
      console.log('All form fields are required.');
    }
  };

  const onSaveDashboard = () => {
    // Placeholder function for saving dashboard
    console.log('Save dashboard');
  };

  const saveMappedSubcategories = () => {
    // Placeholder function for saving mapped subcategories
    console.log('Save mapped subcategories');
  };

  const generateSpreadsheetData = (subcategories: string[], periods: number): SpreadsheetData[][] => {
    const data: SpreadsheetData[][] = [];

    // Create an empty data array with the correct dimensions
    const numRows = subcategories.length;
    const numCols = periods;
    for (let i = 0; i < numRows; i++) {
      const rowData: SpreadsheetData[] = [];
      for (let j = 0; j < numCols; j++) {
        rowData.push({ value: '' });
      }
      data.push(rowData);
    }

    return data;
  };

  const generateColumnLabels = (startDate: Dayjs, periods: number, timePhase: string): string[] => {
    const columnLabels: string[] = [];
    let currentDate = startDate;

    for (let i = 0; i < periods; i++) {
      switch (timePhase) {
        case 'Weekly':
          columnLabels.push(currentDate.format('MMM D, YYYY'));
          currentDate = currentDate.add(1, 'week');
          break;
        case 'Monthly':
          columnLabels.push(currentDate.format('MMM YYYY'));
          currentDate = currentDate.add(1, 'month');
          break;
        case 'Quarterly':
          columnLabels.push(`Q${Math.floor(currentDate.month() / 3) + 1} ${currentDate.format('YYYY')}`);
          currentDate = currentDate.add(3, 'months');
          break;
        case 'Annually':
          columnLabels.push(currentDate.format('YYYY'));
          currentDate = currentDate.add(1, 'year');
          break;
        default:
          columnLabels.push(`Period ${i + 1}`);
          break;
      }
    }

    return columnLabels;
  };

  const handleSpreadsheetChange = (fieldIndex: number, data: (SpreadsheetData | undefined)[][]) => {
    const updatedFields = [...quantitativeFields];
    // Filter out undefined values or provide defaults here as necessary
    updatedFields[fieldIndex].data = data.map(row => row.map(cell => cell || { value: '' }));
    setQuantitativeFields(updatedFields);
  };

  const renderCreateForm = () => {
    return (
      <>
        <Form.Item label="Project" rules={[{ required: true, message: 'Please select a project!' }]}>
          <Select value={selectedProject} onChange={onProjectChange}>
            <Option value="Project 1">Project 1</Option>
            <Option value="Project 2">Project 2</Option>
            <Option value="Project 3">Project 3</Option>
          </Select>
        </Form.Item>
        <Form.Item label="High-Level Org Name" rules={[{ required: true, message: 'Please enter the high-level org name!' }]}>
          <Input value={highLevelOrgName} onChange={onHighLevelOrgNameChange} />
        </Form.Item>
        <Form.Item label="Dashboard Notes" rules={[{ required: true, message: 'Please enter the dashboard notes!' }]}>
          <Input.TextArea value={dashboardNotes} onChange={onDashboardNotesChange} />
        </Form.Item>
      </>
    );
  };

  const renderCreateStep2Form = () => {
    return (
      <>
        <Form.Item label="Quantitative Field" rules={[{ required: true, message: 'Please select a quantitative field!' }]}>
          <Select value={selectedQuantitativeField} onChange={onQuantitativeFieldChange}>
            {Object.entries(fieldNames)
              .filter(([key]) => !quantitativeFields.some(field => field.fieldName === fieldNames[key as keyof typeof fieldNames]))
              .map(([key, value]) => (
                <Option key={key} value={key}>
                  {value}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item label="Time Phase" rules={[{ required: true, message: 'Please select a time phase!' }]}>
          <Select value={selectedTimePhase} onChange={onTimePhaseChange}>
            <Option value="Weekly">Weekly</Option>
            <Option value="Monthly">Monthly</Option>
            <Option value="Quarterly">Quarterly</Option>
            <Option value="Annually">Annually</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Start Date" rules={[{ required: true, message: 'Please select a start date!' }]}>
          <DatePicker value={selectedStartDate} onChange={onStartDateChange} />
        </Form.Item>
        <Form.Item label="Subcategories" rules={[{ required: true, message: 'Please select at least one subcategory!' }]}>
          <Select mode="multiple" value={selectedSubcategories} onChange={onSubcategoriesChange}>
            {subcategories.map((subcategory) => (
              <Option key={subcategory} value={subcategory}>
                {subcategory}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Total Periods" rules={[{ required: true, message: 'Please enter the total periods!' }]}>
          <InputNumber min={1} max={52} value={totalPeriods} onChange={onTotalPeriodsChange} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onSaveField}>
            Save Field
          </Button>
        </Form.Item>
        {quantitativeFields.length > 0 && (
          <>
            <Title level={3} style={{ textAlign: 'center', marginTop: '24px' }}>
              Dashboard Preview
            </Title>
            {quantitativeFields.map((field, index) => (
              <div key={index} style={dashboardStyle}>
                <Title level={4}>{field.fieldName}</Title>
                <div style={spreadsheetContainerStyle}>
                  <Spreadsheet
                    data={field.data}
                    onChange={(data: (SpreadsheetData | undefined)[][]) => handleSpreadsheetChange(index, data)}
                    columnLabels={generateColumnLabels(field.startDate, field.totalPeriods, field.timePhase)}
                    rowLabels={field.subcategories}
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </>
    );
  };

  const renderMergeForm = () => {
    return (
      <>
        <Form.Item label="Select Dashboard" name="dashboards">
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Select dashboards"
            onChange={handleDashboardChange}
            value={selectedDashboards}
          >
            <Option value="CAT-001-D1001">CAT-001-D1001</Option>
            <Option value="CAT-001-D1002">CAT-001-D1002</Option>
            <Option value="CAT-001-D1003">CAT-001-D1003</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Checkbox onChange={onCheckboxChange}>Allow higher level access</Checkbox>
        </Form.Item>
        {showHigherLevelOrgName && (
          <Form.Item
            label="Higher Level Org Name"
            name="higherLevelOrgName"
            rules={[{ required: showHigherLevelOrgName, message: 'Please enter the higher-level org name!' }]}
          >
            <Input />
          </Form.Item>
        )}
        <Form.Item label="Mapped Subcategory Name" name="mappedSubcategoryName">
          <Input
            placeholder="Enter a name for the mapped subcategory"
            value={mappedSubcategoryName}
            onChange={e => setMappedSubcategoryName(e.target.value)}
          />
        </Form.Item>
        {customGroups.map((group, index) => (
          <Row key={index} gutter={16} style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
            <Col span={8}>
              <Input
                placeholder="Group Name"
                value={group.name}
                onChange={e => updateCustomGroupName(index, e.target.value)}
                style={{ width: '100%' }}
              />
            </Col>
            <Col span={14}>
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select subcategories"
                value={group.subcategories}
                onChange={(value) => handleGroupSubcategoriesChange(index, value)}
                options={subcategories.map(sub => ({ label: sub, value: sub }))}
              />
            </Col>
            <Col span={2}>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => deleteCustomGroup(index)}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
        ))}
        <Button type="dashed" onClick={addCustomGroup} icon={<PlusOutlined />} style={{ width: '100%' }}>
          Add Custom Group
        </Button>
        <Button type="primary" onClick={saveMappedSubcategories} style={{ marginTop: '16px', width: '100%' }}>
          Save Mapped Subcategories
        </Button>
      </>
    );
  };

  const steps = [
    {
      title: 'Select Action',
      content: (
        <>
          <Text>To create a new dashboard, press 'Create'. To merge existing dashboards, press 'Merge'.</Text>
          <Row gutter={16} style={{ marginTop: '16px' }}>
            <Col>
              <Button
                type={selectedAction === 'create' ? 'primary' : 'default'}
                onClick={() => onActionChange('create')}
              >
                Create
              </Button>
            </Col>
            <Col>
              <Button
                type={selectedAction === 'merge' ? 'primary' : 'default'}
                onClick={() => onActionChange('merge')}
              >
                Merge
              </Button>
            </Col>
          </Row>
          {selectedAction === 'create' && (
            <div style={{ marginTop: '24px' }}>
              {renderCreateForm()}
            </div>
          )}
        </>
      ),
    },
    {
      title: selectedAction === 'create' ? 'Create Dashboard' : 'Merge Dashboards',
      content: selectedAction === 'create' ? renderCreateStep2Form() : renderMergeForm(),
    },
  ];
  
  const next = () => {
    setCurrentStep(currentStep + 1);
  };
  
  const prev = () => {
    setCurrentStep(currentStep - 1);
  };
  
  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
            <Title level={2} style={{ textAlign: 'center' }}>
                {selectedAction === 'create' ? 'Create Dashboard' : 'Merge Dashboards'}
            </Title>
            <Steps current={currentStep}>
                {steps.map((item) => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content" style={{ marginTop: '24px' }}>
                {steps[currentStep].content}
            </div>
            <div className="steps-action" style={{ marginTop: '16px', textAlign: 'center' }}>
                {currentStep > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
                {currentStep < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {currentStep === steps.length - 1 && (
                    <Button type="primary" onClick={selectedAction === 'create' ? onSaveDashboard : saveMappedSubcategories}>
                        {selectedAction === 'create' ? 'Save Dashboard' : 'Save Mapped Subcategories'}
                    </Button>
                )}
            </div>
        </Content>
    </Layout>
);
};
export default MergedDashboard;