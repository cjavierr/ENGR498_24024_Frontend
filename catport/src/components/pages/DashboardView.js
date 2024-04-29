import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spreadsheet, { CellBase } from "react-spreadsheet";

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
  Descriptions,
} from "antd";
import { wait } from "@testing-library/user-event/dist/utils";

const { RangePicker } = DatePicker;
const { Option, OptGroup } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const DashboardView = () => {
  const { dashboardId } = useParams(); // Get the dashboardId from the URL params
  const [dashboard, setDashboard] = useState();
  const [loading, setLoading] = useState(false);
  const [tables, setTables] = useState([]);
  const [columnLabels, setColumnLabels] = useState();
  const [successMessage, setSuccessMessage] = useState(null);

  const [data, setData] = useState();
  const [periods, setPeriods] = useState();
  const [subcategories, setSubcategories] = useState();
  const [dashboards, setDashboards] = useState();
  const [dashboardName, setDashboardName] = useState();
  const [escalate, setEscalate] = useState();
  const [ownerid, setOwnerid] = useState();
  const [project, setProject] = useState();
  const [users, setUsers] = useState();
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState("");

  const [versions, setVersions] = useState();

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

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        // Fetch the dashboard details from the backend using dashboardId
        const response = await axios.post(
          "http://localhost:3001/api/getDashboard",
          {
            dashboardID: dashboardId,
          }
        );

        console.log(response.data);
        setDashboard(response.data);
        setProject(response.data.project);

        // Access the updated dashboard state here or perform any operations dependent on it
        const mostRecentVersion = response.data.versions.reduce(
          (prev, current) => {
            return new Date(current.date) > new Date(prev.date)
              ? current
              : prev;
          }
        );

        console.log("Most recent:", mostRecentVersion);
        setLastUpdated(mostRecentVersion.date);
        const tableData = mostRecentVersion.tables;

        setTables(tableData);

        // Update dashboard state
        setDashboardName(response.data.dashboardName);

        setOwnerid(response.data.ownerid);

        // Access the updated dashboard state here or in subsequent useEffects

        setLoading(false);
        console.log("Done");
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  //   if (!dashboard) {
  //     return <div>Dashboard not found</div>;
  //   }

  // Assuming 'tables' contains the data you provided

  const handleSpreadsheetChange = (fieldIndex, data) => {
    const updatedFields = [...tables];
    // Filter out undefined values or provide defaults here as necessary
    updatedFields[fieldIndex].data = data.map((row) =>
      row.map((cell) => cell || { value: "" })
    );
    setTables(updatedFields);
  };

  const onSaveDash = async () => {
    let date = new Date().toJSON();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/getDashboard",
        {
          dashboardID: dashboardId,
        }
      );

      console.log(response.data);
      console.log(...response.data.versions);
      console.log(...response.data.versions);
      const updatedDashboard = {
        ownerid: response.data.ownerid, // Replace with the actual user ID
        users: response.data.users, // Add any user IDs that should have access to the dashboard
        versions: [...response.data.versions, { date: date, tables: tables }],
        dashboards: response.data.dashboards,
        dashboardName: response.data.dashboardName,
        escalate: false,
        project: response.data.project,
        dashid: response.data.dashid,
        mappedKPIs: []
      };

      const updateResponse = await axios.post(
        "http://localhost:3001/api/saveDashboard",
        {
          ...updatedDashboard,
        }
      );
      message.success(response.data.message);
      setSuccessMessage(response.data.message);
      setError(null);
    } catch (error) {
      console.error("Error Updating Dashboard", error);
    }
  };

  const onSaveAndEscalate = () => {};

  // Extract tables from the first map (most recent date)

  return (
    <div className="dashboard-view-container">

      <Title>{dashboardName}</Title>
      <Descriptions title="Dashboard Details" bordered>
        <Descriptions.Item label="Dashboard ID">
          {dashboardId}
        </Descriptions.Item>
        <Descriptions.Item label="Project ID">{project}</Descriptions.Item>
        <Descriptions.Item label="Owner">{ownerid}</Descriptions.Item>
        <Descriptions.Item label="Last Updated">
          {lastUpdated}
        </Descriptions.Item>
        <Descriptions.Item label="Escalate">
          {escalate ? "Yes" : "No"}
        </Descriptions.Item>
      </Descriptions>
      <h3>Key Performance Indices</h3>
      {tables.length > 0 && (
        <>
          {tables.map((field, index) => (
            <div key={index} style={dashboardStyle}>
              <Title level={4}>{field.kpi}</Title>
              <div style={spreadsheetContainerStyle}>
                <Spreadsheet
                  data={field.data}
                  onChange={(tables) => handleSpreadsheetChange(index, tables)}
                  columnLabels={field.columnLabels}
                  rowLabels={field.subcategories}
                />
              </div>
            </div>
          ))}
          <Button
            type="primary"
            style={{ margin: "20px" }}
            onClick={onSaveDash}
          >
            Save
          </Button>
          <Button
            type="primary"
            style={{ margin: "20px" }}
            onClick={onSaveAndEscalate}
          >
            Save and Escalate
          </Button>
        </>
      )}
    </div>
  );
};

export default DashboardView;
