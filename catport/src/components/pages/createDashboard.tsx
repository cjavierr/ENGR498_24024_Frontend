import React, { useState } from 'react';
import { Form, InputNumber, Button, Select, Typography } from 'antd';
import Spreadsheet, { CellBase } from 'react-spreadsheet';

const { Option } = Select;
const { Title } = Typography;

interface SpreadsheetData extends CellBase {
  value: string;
}

interface QuantitativeField {
  fieldName: string;
  data: SpreadsheetData[][];
  timePhase: string;
  subcategories: string[];
  totalPeriods: number;
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

const CreateDashboard: React.FC = () => {
  const [form] = Form.useForm();
  const [selectedProject, setSelectedProject] = useState<string>('');
  const [selectedQuantitativeField, setSelectedQuantitativeField] = useState<string>('');
  const [selectedTimePhase, setSelectedTimePhase] = useState<string>('');
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [totalPeriods, setTotalPeriods] = useState<number>(0);
  const [quantitativeFields, setQuantitativeFields] = useState<QuantitativeField[]>([]);

  const dashboardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '24px',
    overflow: 'auto',
  };

  const spreadsheetContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '100%',
    overflow: 'auto',
  };

  const onProjectChange = (value: string) => {
    setSelectedProject(value);
    setQuantitativeFields([]); // Clear the quantitative fields when changing the project
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

  const onSaveField = () => {
    if (
      selectedQuantitativeField &&
      selectedTimePhase &&
      selectedSubcategories.length > 0 &&
      totalPeriods > 0
    ) {
      const fieldName = fieldNames[selectedQuantitativeField as keyof typeof fieldNames] || selectedQuantitativeField;
      const data = generateSpreadsheetData(selectedSubcategories, totalPeriods, selectedTimePhase);
      const newField: QuantitativeField = {
        fieldName,
        data,
        timePhase: selectedTimePhase,
        subcategories: selectedSubcategories,
        totalPeriods,
      };
      setQuantitativeFields([...quantitativeFields, newField]);
      setSelectedQuantitativeField('');
      setSelectedTimePhase('');
      setSelectedSubcategories([]);
      setTotalPeriods(0);
    } else {
      console.log('All form fields are required.'); // Added for debugging
    }
  };

  const onSaveDashboard = () => {
    // Save the dashboard data (selectedProject and quantitativeFields) to a database or perform any other necessary actions
    console.log('Dashboard saved:', { project: selectedProject, fields: quantitativeFields });
  };

  const generateSpreadsheetData = (subcategories: string[], periods: number, timePhase: string): SpreadsheetData[][] => {
    const data: SpreadsheetData[][] = [];

    // Generate column labels based on the selected time phase
    const columnLabels = Array.from({ length: periods }, (_, index) => {
      switch (timePhase) {
        case 'Weekly':
          return { value: `Week ${index + 1}` };
        case 'Monthly':
          return { value: `Month ${index + 1}` };
        case 'Quarterly':
          return { value: `Quarter ${index + 1}` };
        case 'Annually':
          return { value: `Year ${index + 1}` };
        default:
          return { value: `Period ${index + 1}` };
      }
    });

    // Generate row labels based on the selected subcategories
    const rowLabels = subcategories.map(subcategory => ({ value: subcategory }));

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

  const generateColumnLabels = (periods: number, timePhase: string): string[] => {
    switch (timePhase) {
      case 'Weekly':
        return Array.from({ length: periods }, (_, index) => `Week ${index + 1}`);
      case 'Monthly':
        return Array.from({ length: periods }, (_, index) => `Month ${index + 1}`);
      case 'Quarterly':
        return Array.from({ length: periods }, (_, index) => `Quarter ${index + 1}`);
      case 'Annually':
        return Array.from({ length: periods }, (_, index) => `Year ${index + 1}`);
      default:
        return Array.from({ length: periods }, (_, index) => `Period ${index + 1}`);
    }
  };

  const handleSpreadsheetChange = (fieldIndex: number, data: (SpreadsheetData | undefined)[][]) => {
    const updatedFields = [...quantitativeFields];
    // Filter out undefined values or provide defaults here as necessary
    updatedFields[fieldIndex].data = data.map(row => row.map(cell => cell || { value: '' }));
    setQuantitativeFields(updatedFields);
  };

  return (
    <div style={{ margin: '24px', background: '#fff', padding: '24px' }}>
      <Title level={2} style={{ textAlign: 'center' }}>Create Dashboard</Title>
      <Form layout="vertical">
        <Form.Item label="Project" rules={[{ required: true, message: 'Please select a project!' }]}>
          <Select value={selectedProject} onChange={onProjectChange}>
            <Option value="Project 1">Project 1</Option>
            <Option value="Project 2">Project 2</Option>
            <Option value="Project 3">Project 3</Option>
          </Select>
        </Form.Item>
      </Form>
      {selectedProject && (
        <>
          <Form layout="vertical">
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
            <Form.Item label="Subcategories" rules={[{ required: true, message: 'Please select at least one subcategory!' }]}>
              <Select mode="multiple" value={selectedSubcategories} onChange={onSubcategoriesChange}>
                <Option value="Engineer 1">Engineer 1</Option>
                <Option value="Engineer 2">Engineer 2</Option>
                <Option value="Mechanic">Mechanic</Option>
                <Option value="Operator">Operator</Option>
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
          </Form>
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
                      columnLabels={generateColumnLabels(field.totalPeriods, field.timePhase)}
                      rowLabels={field.subcategories}
                    />
                  </div>
                </div>
              ))}
              <Form.Item style={{ textAlign: 'center', marginTop: '24px' }}>
                <Button type="primary" onClick={onSaveDashboard}>
                  Save Dashboard
                </Button>
              </Form.Item>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CreateDashboard;