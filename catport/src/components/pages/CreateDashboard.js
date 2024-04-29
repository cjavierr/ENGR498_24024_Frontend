import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spreadsheet, { CellBase } from "react-spreadsheet";
import axios from "axios";
import "../../App.css"; // Import the CSS file
import { CloseOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import {
  Form,
  Input,
  Checkbox,
  Button,
  message,
  Select,
  DatePicker,
  Table,
  Space,
  theme,
  Steps,
  InputNumber,
  Typography,
} from "antd";

const { RangePicker } = DatePicker;
const { Option, OptGroup } = Select;
const { TextArea } = Input;
const { Title } = Typography;

function CreateDashboard() {
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState([]);
  const [projectDescription, setProjectDescription] = useState("");
  const [haveHigherLevelOrg, setHaveHigherLevelOrg] = useState(false);
  const [higherLevelOrgOwner, setHigherLevelOrgOwner] = useState("");
  const [haveLowerLevelOrg, setHaveLowerLevelOrg] = useState(false);
  const [quantitativeKPIs, setQuantitativeKPIs] = useState([]);
  const [qualitativeKPIs, setQualitativeKPIs] = useState([]);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTotalPeriods, setSelectedTotalPeriods] = useState(null);
  const [selectedQuantitativekpi, setSelectedQuantitativeField] = useState("");
  const [selectedTimePhase, setSelectedTimePhase] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [tables, setTables] = useState([]);
  const [tableColumnLabels, setTableColumnLabels] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [timePhase, setTimePhase] = useState(null);
  const [usernames, setUsernames] = useState([]);

  const dashboardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "24px",
    overflow: "auto",
  };

  const spreadsheetContainerStyle = {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    maxWidth: "100%",
    overflow: "auto",
  };

  const { projectId } = useParams(); // Get the projectId from the URL params

  const fetchProject = async () => {
    setLoading(true);
    try {
      // Fetch the project details from the backend using projectId
      const response = await axios.post(
        "http://localhost:3001/api/getProject",
        {
          projectId: projectId,
        }
      );
      await setProject(response.data);
      await setQuantitativeKPIs(project.KPIs.quantitative);
      await setSubcategories(project.subcategories);
      console.log(subcategories);
      console.log(project);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching project:", error);
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    console.log("Submitting Form");
    let date = new Date().toJSON();
    try {
      const dashboardDetails = {
        owner: username, // Replace with the actual user ID
        users: [username, stepForm.getFieldValue("orgadmin")], // Add any user IDs that should have access to the dashboard
        versions: [{ date: date, tables: tables }],
        dashboards: [],
        dashboardName: stepForm.getFieldValue("dashboardName"),
        escalate: false,
        project: projectId,
      };

      console.log(dashboardDetails);
      const response = await axios.post(
        "http://localhost:3001/api/createNewDashboard",
        {
          ...dashboardDetails,
        }
      );
      message.success(response.data.message);
      setSuccessMessage(response.data.message);
      setError(null);
      window.location.href = "/dashboardsView";

      //backend shit here
    } catch (error) {
      console.error("Error creating dashboard:", error);
    }
  };

  const fetchData = async () => {
    const username = localStorage.getItem("loggedInUser");
    if (!username) return; // Skip request if username is empty

    try {
      console.log("Grabbing user info");
      const response = await axios.post("http://localhost:3001/api/getUser", {
        username: username, // Send username in request body
      });
      console.log(response);
      console.log("setting username to ");
      console.log(username);
      setUsername(username);
      await setProjects(response.data.projects);
      console.log("PROJECTs: ", projects);
      stepForm.setFieldValue("owner", username);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An error occurred."); // Handle potential errors
    }
  };

  const fetchUsernames = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/allUsernames"
      );
      setUsernames(response.data);
    } catch (error) {
      console.error("Error fetching usernames:", error);
      setError("Failed to fetch usernames");
    }
  };

  useEffect(() => {
    fetchProject();
    stepForm.setFieldValue("projectID", projectId);
    fetchData();
    fetchUsernames();
  }, [username]); // Re-run on username change

  const onChange = (value) => {
    console.log(value);
  };

  const handleSpreadsheetChange = (fieldIndex, data) => {
    const updatedFields = [...tables];
    // Filter out undefined values or provide defaults here as necessary
    updatedFields[fieldIndex].data = data.map((row) =>
      row.map((cell) => cell || { value: "" })
    );
    setTables(updatedFields);
  };
  const onQuantitativeFieldChange = (value) => {
    setSelectedQuantitativeField(value);
  };

  const onProjectChange = (value) => {
    setSelectedProject(value);
  };

  const onTimePhaseChange = (value) => {
    setSelectedTimePhase(value);
  };

  const onStartDateChange = (value) => {
    setSelectedStartDate(value);
  };

  const onTotalPeriodsChange = (value) => {
    if (value !== null) {
      setSelectedTotalPeriods(value);
    }
  };

  const onSubcategoriesChange = (value) => {
    setSelectedSubcategories(value);
  };

  const onSaveField = () => {
    const labels = generateColumnLabels(
      selectedStartDate,
      selectedTotalPeriods,
      selectedTimePhase
    );
    if (
      selectedQuantitativekpi &&
      selectedTimePhase &&
      selectedSubcategories.length > 0 &&
      selectedTotalPeriods > 0 &&
      selectedStartDate
    ) {
      console.log("creating New Table");
      const data = generateSpreadsheetData(
        selectedSubcategories,
        selectedTotalPeriods,
        selectedTimePhase
      );
      const kpi = quantitativeKPIs[parseInt(selectedQuantitativekpi)];
      console.log(kpi);
      console.log(selectedQuantitativekpi);
      const newTable = {
        project: selectedProject,
        kpi: selectedQuantitativekpi,
        data,
        timePhase: selectedTimePhase,
        subcategories: selectedSubcategories,
        periods: selectedTotalPeriods,
        startDate: selectedStartDate,
        columnLabels: labels,
      };
      console.log("New Table");
      console.log(newTable);
      setTables([...tables, newTable]);
      console.log(tables);
      setSelectedQuantitativeField("");
      setSelectedTimePhase("");
      setSelectedSubcategories([]);
      setSelectedTotalPeriods(0);
      setSelectedStartDate(null);
    } else {
      console.log("All form fields are required.");
    }
  };

  const onSaveDashboard = async () => {};

  const generateSpreadsheetData = (subcategories, periods, timePhase) => {
    const data = [];

    // Create an empty data array with the correct dimensions
    const numRows = subcategories.length;
    const numCols = periods;
    for (let i = 0; i < numRows; i++) {
      const rowData = [];
      for (let j = 0; j < numCols; j++) {
        rowData.push({ value: "" });
      }
      data.push(rowData);
    }

    return data;
  };

  const generateColumnLabels = (startDate, periods, timePhase) => {
    const columnLabels = [];
    let currentDate = dayjs(startDate);

    for (let i = 0; i < periods; i++) {
      switch (timePhase) {
        case "Weekly":
          columnLabels.push(currentDate.format("MMM D, YYYY"));
          currentDate = currentDate.add(1, "week");
          break;
        case "Monthly":
          columnLabels.push(currentDate.format("MMM YYYY"));
          currentDate = currentDate.add(1, "month");
          break;
        case "Quarterly":
          columnLabels.push(
            `Q${Math.floor(currentDate.month() / 3) + 1} ${currentDate.format(
              "YYYY"
            )}`
          );
          currentDate = currentDate.add(3, "months");
          break;
        case "Annually":
          columnLabels.push(currentDate.format("YYYY"));
          currentDate = currentDate.add(1, "year");
          break;
        default:
          columnLabels.push(`Period ${i + 1}`);
          break;
      }
    }
    console.log("generating columnLabels");
    console.log(columnLabels);
    console.log(tableColumnLabels);
    return columnLabels;
  };

  const { token } = theme.useToken();

  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const Step1Form = () => {
    return (
      <>
        <Form.Item
          name="owner"
          label="Owner"
          rules={[
            {
              required: true,
              message: "Required field",
            },
          ]}
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          name="orgadmin"
          label="Org Admin"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select placeholder="Select an Org Admin">
            {usernames.map((username) => (
              <Select.Option key={username} value={username}>
                {username}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="dashboardName"
          label="Dashboard Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
      </>
    );
  };

  const Step2Form = () => {
    return (
      <>
        <Form.Item
          label="Project"
          rules={[{ required: true, message: "Please select a project!" }]}
        >
          {/* <Select value={selectedProject} onChange={onProjectChange}>
            {projects.map((project) => (
              <Select.Option key={project} value={project}>
                {project}
              </Select.Option>
            ))}
          </Select> */}
          <Input defaultValue={projectId}disabled/>
        </Form.Item>
        <Form.Item
          label="Quantitative Field"
          rules={[
            { required: true, message: "Please select a quantitative field!" },
          ]}
        >
          <Select
            value={selectedQuantitativekpi}
            onChange={onQuantitativeFieldChange}
          >
            {quantitativeKPIs.map((kpi, index) => (
              <Option key={index} value={kpi}>
                {kpi}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Time Phase"
          rules={[{ required: true, message: "Please select a time phase!" }]}
        >
          <Select value={selectedTimePhase} onChange={onTimePhaseChange}>
            <Option value="Weekly">Weekly</Option>
            <Option value="Monthly">Monthly</Option>
            <Option value="Quarterly">Quarterly</Option>
            <Option value="Annually">Annually</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Total Periods"
          rules={[
            { required: true, message: "Please enter the total periods!" },
          ]}
        >
          <InputNumber
            min={1}
            max={52}
            value={selectedTotalPeriods}
            onChange={onTotalPeriodsChange}
          />
        </Form.Item>

        <Form.Item
          label="Start Date"
          rules={[{ required: true, message: "Please select a start date!" }]}
        >
          <DatePicker value={selectedStartDate} onChange={onStartDateChange} />
        </Form.Item>

        <Form.Item
          label="Subcategories"
          rules={[
            {
              required: true,
              message: "Please select at least one subcategory!",
            },
          ]}
        >
          <Select
            mode="multiple"
            value={selectedSubcategories}
            onChange={onSubcategoriesChange}
          >
            {subcategories.map((category) => (
              <OptGroup
                key={category.subcategoryheading}
                label={category.subcategoryheading}
              >
                {category.list.map((subcategory) => (
                  <Option
                    key={subcategory.subcategorydetail}
                    value={subcategory.subcategorydetail}
                  >
                    {subcategory.subcategorydetail}
                  </Option>
                ))}
              </OptGroup>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={onSaveField}>
            Save Field
          </Button>
        </Form.Item>

        {tables.length > 0 && (
          <>
            <Title level={3} style={{ textAlign: "center", marginTop: "24px" }}>
              Dashboard Preview
            </Title>
            {tables.map((field, index) => (
              <div key={index} style={dashboardStyle}>
                <Title level={4}>{field.kpi}</Title>
                <div style={spreadsheetContainerStyle}>
                  <Spreadsheet
                    data={field.data}
                    onChange={(data) => handleSpreadsheetChange(index, data)}
                    columnLabels={field.columnLabels}
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

  const Step3Form = () => {
    return <></>;
  };

  const [stepForm] = Form.useForm();
  const [subfieldform] = Form.useForm();

  const steps = [
    {
      title: "Dashboard Details",
      description: "This is a description",
      content: <Step1Form />,
    },
    {
      title: "KPIs",
      description: "This is a description",
      content: <Step2Form />,
    },
  ];

  const StepPanel = (props) => {
    function next() {
      const nextStep = activeStep + 1;
      console.log("Next Step");
      setActiveStep(nextStep);
    }

    function prev() {
      const prevStep = activeStep - 1;
      console.log("Previous Step");
      setActiveStep(prevStep);
    }

    return (
      <>
        <Steps current={activeStep}>
          {props.steps.map((item) => (
            <Steps.Step
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </Steps>

        <div style={{ marginTop: 48 }}></div>

        <div className="steps-content">{props.steps[activeStep].content}</div>
        <div className="steps-action">
          {activeStep > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              Previous
            </Button>
          )}
          {activeStep < props.steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {activeStep === props.steps.length - 1 && (
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          )}
        </div>
      </>
    );
  };

  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <Form form={stepForm} onFinish={onFinish}>
        <StepPanel steps={steps} style={{ contentStyle }} />
      </Form>
    </Space>
  );
}

export default CreateDashboard;
