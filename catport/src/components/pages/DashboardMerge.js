import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Typography,
  Layout,
  Row,
  Col,
  Select,
  Input,
  DatePicker,
  message,
  InputNumber,
  Steps,
  Space,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  PlusOutlined,
  CheckCircleTwoTone,
  CloseCircleTwoTone,
} from "@ant-design/icons";

import axios from "axios";
import { Checkbox } from "antd";
import Column from "antd/es/table/Column";

const { Option, OptGroup } = Select;
const { Title } = Typography;

const DashboardMerge = () => {
  const { dashboardId } = useParams(); // Get the dashboardId from the URL params
  const [owner, setOwner] = useState("");
  const [admin, setAdmin] = useState("");
  const [dashboardName, setDashboardName] = useState("");
  const [dashboards, setDashboards] = useState([]);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [usernames, setUsernames] = useState([]);
  const [form] = Form.useForm();
  const [successMessage, setSuccessMessage] = useState(null);
  const [mergeable, setMergeable] = useState(false);

  const [selectedAction, setSelectedAction] = useState("create");
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedProject, setSelectedProject] = useState("");
  const [highLevelOrgName, setHighLevelOrgName] = useState("");
  const [dashboardNotes, setDashboardNotes] = useState("");
  const [selectedQuantitativeField, setSelectedQuantitativeField] =
    useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [selectedTimePhase, setSelectedTimePhase] = useState("");
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);
  const [totalPeriods, setTotalPeriods] = useState(0);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [quantitativeFields, setQuantitativeFields] = useState([]);
  const [selectedDashboards, setSelectedDashboards] = useState([]);
  const [customGroups, setCustomGroups] = useState([
    { name: "", selectedSubcategories: [] }, // Initial state for custom groups
  ]);
  const [expandedGroups, setExpandedGroups] = useState([]);
  const [mappedSubcategoryName, setMappedSubcategoryName] = useState("");
  const [showHigherLevelOrgName, setShowHigherLevelOrgName] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    const username = localStorage.getItem("loggedInUser");
    if (!username) return; // Skip request if username is empty

    try {
      console.log("Grabbing user info");
      const response = await axios.post("https://24024be.vercel.app/api/getUser", {
        username: username, // Send username in request body
      });
      console.log(response);
      console.log("setting username to ");
      console.log(response.data.dashboards);
      setUsername(username);
      setDashboards(response.data.dashboards);
      form.setFieldValue("owner", username);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An error occurred."); // Handle potential errors
    }
  };

  const onActionChange = (value) => {
    setSelectedAction(value);
  };

  const mergeTables = (table1, table2, mappedSubcategories) => {
    // Combine subcategory details from both tables
    const combinedSubcategories = [];

    mappedSubcategories.forEach(({ heading, details }) => {
      const combinedDetails = details.flatMap((detail) => {
        const subcategoryIndex1 = table1.subcategories
          ? table1.subcategories.indexOf(detail)
          : -1;
        const subcategoryIndex2 = table2.subcategories
          ? table2.subcategories.indexOf(detail)
          : -1;
        const subcategoryData1 =
          subcategoryIndex1 !== -1 ? table1.data[subcategoryIndex1] : [];
        const subcategoryData2 =
          subcategoryIndex2 !== -1 ? table2.data[subcategoryIndex2] : [];
        return subcategoryData1.concat(subcategoryData2);
      });
      combinedSubcategories.push({ heading, details: combinedDetails });
    });

    const mergedTable = [
      {
        kpi: "",
        data: [],
        periods: 0,
        project: "",
        startDate: "Today",
        subcategories: [""],
        timePhase: "",
      },
    ];
    let date = new Date().toJSON();

    return { date: date, tables: mergedTable };
  };

  // Usage example

  const onProjectChange = (value) => {
    setSelectedProject(value);
    setQuantitativeFields([]); // Clear the quantitative fields when changing the project
  };

  const onHighLevelOrgNameChange = (event) => {
    setHighLevelOrgName(event.target.value);
  };

  const onDashboardNotesChange = (event) => {
    setDashboardNotes(event.target.value);
  };

  const onQuantitativeFieldChange = (value) => {
    setSelectedQuantitativeField(value);
  };

  const onTimePhaseChange = (value) => {
    setSelectedTimePhase(value);
  };

  const onSubcategoriesChange = (index, value) => {
    const updatedGroups = [...customGroups];
    updatedGroups[index].selectedSubcategories = value;
    setCustomGroups(updatedGroups);
  };

  const onTotalPeriodsChange = (value) => {
    if (value !== null) {
      setTotalPeriods(value);
    }
  };

  const saveMappedSubcategories = () => {
    // Placeholder function for saving mapped subcategories
    console.log("Save mapped subcategories");
  };

  const onStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const onCreateDashboard = async () => {
    const mappedKPIs = customGroups.map((group) => ({
      heading: group.name,
      details: group.selectedSubcategories,
    }));

    console.log(selectedDashboards);

    const table1 = await axios.post("https://24024be.vercel.app/api/getDashboard", {
      dashboardID: selectedDashboards[0],
    });

    const table2 = await axios.post("https://24024be.vercel.app/api/getDashboard", {
      dashboardID: selectedDashboards[1],
    });

    console.log("table1", table1);

    const processedTable1 = convertToTwoDeeArray(table1.data);
    const processedTable2 = convertToTwoDeeArray(table2.data);
    const categories1 = grabLabels(table1.data);
    const categories2 = grabLabels(table2.data);
    console.log("categories", categories1);

    const { result, labels } = combineMappedKPIs(
      mappedKPIs,
      processedTable1,
      processedTable2,
      categories1,
      categories2
    );
    console.log(result);
    console.log(labels);

    let date = new Date().toJSON();

    console.log(table1);

    const mostRecentVersion = table1.data.versions.reduce((prev, current) => {
      return new Date(current.date) > new Date(prev.date) ? current : prev;
    });

    console.log(mostRecentVersion);

    const newTable = {
      project: table1.data.project,
      kpi: mostRecentVersion.tables[0].kpi,
      data: formatArrayToDataObject(result),
      timePhase: mostRecentVersion.tables[0].timePhase,
      subcategories: labels,
      periods: mostRecentVersion.tables[0].periods,
      startDate: mostRecentVersion.tables[0].startDate,
      columnLabels: mostRecentVersion.tables[0].columnLabels,
    };

    const mergedDashboard = {
      date: date,
      tables: [newTable],
    };

    const orgAdmin = form.getFieldValue("orgadmin");
    const updatedDashboard = {
      owner: username,
      users: [orgAdmin, username], // Assuming admin is an array
      versions: [mergedDashboard], // Update with actual version data
      dashboards: selectedDashboards,
      dashboardName: dashboardName,
      escalate: false, // Update with actual escalation status
      project: table1.data.project,
    };

    console.log("Updated Dashboard:", updatedDashboard);

    try {
      const response = await axios.post(
        "https://24024be.vercel.app/api/createNewDashboard",
        {
          ...updatedDashboard,
        }
      );
      message.success(response.data.message);
      setSuccessMessage(response.data.message);
      setError(null);
      navigate("/dashboardsView")
    } catch (error) {}
  };

  function formatArrayToDataObject(array) {
    return array.map((innerArray) =>
      innerArray.map((value) => ({ value: value.toString() }))
    );
  }

  function convertToTwoDeeArray(table) {
    const mostRecentVersion = table.versions.reduce((prev, current) => {
      return new Date(current.date) > new Date(prev.date) ? current : prev;
    });

    // Extract the most recent data and convert it to integers
    const flattenedArray = mostRecentVersion.tables[0].data.map((innerArray) =>
      innerArray.map((obj) => parseInt(obj.value))
    );

    // Extract subcategorie
    return flattenedArray;
  }

  function grabLabels(table) {
    const mostRecentVersion = table.versions.reduce((prev, current) => {
      return new Date(current.date) > new Date(prev.date) ? current : prev;
    });

    // Extract subcategories
    const subcategories = mostRecentVersion.tables[0].subcategories;

    return subcategories;
  }

  function combineMappedKPIs(mappedKPIs, array1, array2, label1, label2) {
    const result = [];
    const labels = [];

    for (const currkpi in mappedKPIs) {
      labels.push(mappedKPIs[currkpi].heading);
      const currkpiArray = [];
      result.push(currkpiArray);

      for (var j = 0; j < label1.length; j++) {
        if (mappedKPIs[currkpi].details.indexOf(label1[j]) !== -1) {
          currkpiArray.push(array1[j]);
        }
      }
    }

    for (const currkpi in mappedKPIs) {
      for (var j = 0; j < label2.length; j++) {
        if (mappedKPIs[currkpi].details.indexOf(label2[j]) !== -1) {
          result[currkpi].push(array2[j]);
        }
      }
    }

    for (let x = 0; x < result.length; x++) {
      const newRow = []; // Initialize newRow as an empty array for each iteration
      let currColumn = 0;
      for (let j = 0; j < result[x][0].length; j++) {
        currColumn = 0;
        for (let i = 0; i < result.length; i++) {
          if (!isNaN(result[x][i][j])) {
            // Check if the value is not NaN
            currColumn += result[x][i][j];
          }
        }
        newRow.push(currColumn);
      }
      result[x] = newRow;
    }

    return { result, labels };
  }

  const handleDashboardChange = async (selected) => {
    setSelectedDashboards(selected);
    console.log("Selected Dashboards", selected);
    try {
      const response = await axios.post(
        "https://24024be.vercel.app/api/getDashboard",
        {
          dashboardID: dashboardId,
        }
      );
      console.log("Fetching dashboard: ", response.data);

      //   const updatedDashboard = {
      //     ownerid: response.data.ownerid, // Replace with the actual user ID
      //     users: response.data.users, // Add any user IDs that should have access to the dashboard
      //     versions: [...response.data.versions, { date: date, tables: tables }],
      //     dashboards: response.data.dashboards,
      //     dashboardName: response.data.dashboardName,
      //     escalate: false,
      //     project: response.data.project,
      //     dashid: response.data.dashid,
      //   };

      //     const updateResponse = await axios.post(
      //       "https://24024be.vercel.app/api/saveDashboard",
      //       {
      //         ...updatedDashboard,
      //       }
      //     );
      //     message.success(response.data.message);
      //     setSuccessMessage(response.data.message);
      //     setError(null);
      //   } catch (error) {
      //     console.error("Error Updating Dashboard", error);
      //   }

      const project = await axios.post("https://24024be.vercel.app/api/getProject", {
        projectId: response.data.project,
      });
      console.log(project);
      setSubcategories(project.data.subcategories);
      console.log("SUBCATS");
      console.log(project.data.subcategories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGroupSubcategoriesChange = (index, value) => {
    const updatedGroups = [...customGroups];
    updatedGroups[index].subcategories = value;
    setCustomGroups(updatedGroups);
  };

  const addCustomGroup = () => {
    setCustomGroups([...customGroups, { name: "", subcategories: [] }]);
  };

  const updateCustomGroupName = (index, name) => {
    const updatedGroups = [...customGroups];
    updatedGroups[index].name = name;
    setCustomGroups(updatedGroups);
  };

  const deleteCustomGroup = (index) => {
    const updatedGroups = [...customGroups];
    updatedGroups.splice(index, 1);
    setCustomGroups(updatedGroups);
  };

  const handleSubmit = () => {
    // Handle save operation here
    console.log("Owner:", owner);
    console.log("Admin:", admin);
    console.log("Dashboard Name:", dashboardName);
    console.log("Dashboards:", dashboards);
  };

  const onCheckboxChange = (e) => {
    setShowHigherLevelOrgName(e.target.checked);
  };

  const fetchUsernames = async () => {
    try {
      const response = await axios.get(
        "https://24024be.vercel.app/api/allUsernames"
      );
      setUsernames(response.data);
    } catch (error) {
      console.error("Error fetching usernames:", error);
      setError("Failed to fetch usernames");
    }
  };

  useEffect(() => {
    fetchData();
    fetchUsernames();
  }, [username]); // Re-run on username change

  return (
    <div>
      <Title level={2}>Merge Dashboards</Title>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item label="Owner" name="owner">
          <Input value={owner} onChange={(e) => setOwner(e.target.value)} />
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
        <Form.Item label="Dashboard Name">
          <Input
            value={dashboardName}
            onChange={(e) => setDashboardName(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Select Dashboard" name="dashboards">
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Select dashboards"
            onChange={handleDashboardChange}
            value={selectedDashboards}
          >
            {dashboards.map((dashboard) => (
              <Option key={dashboard} value={dashboard}>
                {dashboard}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Space align="baseline">
          <Title level={4}>Mergeable: </Title>
          {mergeable ? (
          <CheckCircleTwoTone
          twoToneColor="#52c41a"
          style={{ fontSize: "18px" }}
        />
          ):(
            <CloseCircleTwoTone
            twoToneColor="#eb2f96"
            style={{ fontSize: "18px" }}
          />
          )}

        </Space>
        <Form.Item>
          <Checkbox onChange={onCheckboxChange}>
            Allow higher level access
          </Checkbox>
        </Form.Item>
        {showHigherLevelOrgName && (
          <Form.Item
            label="Higher Level Org Name"
            name="higherLevelOrgName"
            rules={[
              {
                required: showHigherLevelOrgName,
                message: "Please enter the higher-level org name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        )}

        {customGroups.map((group, index) => (
          <Row
            key={index}
            gutter={16}
            style={{
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Col span={8}>
              <Input
                placeholder="Group Name"
                value={group.name}
                onChange={(e) => updateCustomGroupName(index, e.target.value)}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={8}>
              <Select
                mode="multiple"
                value={group.selectedSubcategories}
                onChange={(value) => onSubcategoriesChange(index, value)}
                style={{ width: "100%" }}
                disabled={!subcategories} // Disable the Select until subcategories data is fetched
              >
                {subcategories ? (
                  subcategories.map((category) => (
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
                  ))
                ) : (
                  <Option value="loading" disabled>
                    Loading...
                  </Option>
                )}
              </Select>
            </Col>
            <Col span={2}>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => deleteCustomGroup(index)}
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
        ))}
        <Button
          type="dashed"
          onClick={addCustomGroup}
          icon={<PlusOutlined />}
          style={{ width: "100%" }}
        >
          Add Custom Group
        </Button>
        <Button
          type="primary"
          onClick={onCreateDashboard}
          style={{ marginTop: "16px", width: "100%" }}
        >
          Create Dashboard{}
        </Button>
      </Form>
    </div>
  );
};

export default DashboardMerge;
