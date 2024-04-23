import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import "../../App.css"; // Import the CSS file
import { CloseOutlined } from "@ant-design/icons";
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
} from "antd";
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;

function CreateProject() {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [haveHigherLevelOrg, setHaveHigherLevelOrg] = useState(false);
  const [higherLevelOrgOwner, setHigherLevelOrgOwner] = useState("");
  const [haveLowerLevelOrg, setHaveLowerLevelOrg] = useState(false);
  const [quantitativeKPIs, setQuantitativeKPIs] = useState([]);
  const [qualitativeKPIs, setQualitativeKPIs] = useState([]);
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [userID, setUserID] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [project, setProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [timePhase, setTimePhase] = useState(null);
  const [totalPeriods, setTotalPeriods] = useState(null);
  const [startDate, setStartDate] = useState(null);

  const [usernames, setUsernames] = useState([]);

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
      console.log(project);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching project:", error);
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    console.log("Submitting Form");
    const formData = stepForm.getFieldsValue(true);
    const subcats = subfieldform.getFieldsValue(true);
    let date = new Date().toJSON();
    console.log(formData.quantitativekpis.flat());
    const compiledData = {
      projectOwner: formData.owner,
      orgAdmin: formData.orgadmin,
      projectName: formData.projectname,
      projectDescription: formData.projectdescription,
      users: [
        { role: "owner", username: formData.owner },
        { role: "orgadmin", username: formData.orgadmin },
      ],
      projectNotes: [{ date: date, Note: formData.additionalNotes }],
      KPIs: {
        quantitative: formData.quantitativekpis,
        qualitative: formData.qualitativekpis,
      },
      subcategories: subcats.subcategories,
    };
    console.log(compiledData);
    console.log("sending to server");
    try {
      const response = await axios.post(
        "http://localhost:3001/api/createNewDashboard",
        {
          ...compiledData,
        }
      );
      message.success(response.data.message);
      setSuccessMessage(response.data.message);
      setError(null);

      // Optionally clear form fields or navigate to a different page
    } catch (error) {
      console.error("Error creating project:", error);
      setError("Failed to create project. Please try again.");
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
    stepForm.setFieldValue("projectID", projectId);
    fetchProject();
    fetchData();
    fetchUsernames();
  }, [username]); // Re-run on username change

  const onChange = (value) => {
    console.log(value);
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
          name="projectID"
          label="Project Number"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
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
          <Input />
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Cash Assets",
      className: "column-money",
      dataIndex: "money",
      align: "right",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      money: "￥300,000.00",
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      money: "￥1,256,000.00",
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      money: "￥120,000.00",
      address: "Sydney No. 1 Lake Park",
    },
  ];

  const Step2Form = () => {
    return (
      <>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          title={() => <Input />}
          footer={() => "Footer"}
        />
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
    {
      title: "SubCategories",
      description: "This is a description",
      content: <Step3Form />,
    },
  ];

  const StepPanel = (props) => {
    const [activeStep, setActiveStep] = useState(0);

    function next() {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
    }

    function prev() {
      const prevStep = activeStep - 1;
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

export default CreateProject;
