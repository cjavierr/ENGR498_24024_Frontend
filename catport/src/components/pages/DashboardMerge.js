import React, { useState, useEffect } from "react";
import { Input, Button, Form, Typography , Select} from "antd";
import { useParams } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;

const DashboardMerge = () => {
  const { dashboardId } = useParams(); // Get the dashboardId from the URL params
  const [owner, setOwner] = useState("");
  const [admin, setAdmin] = useState("");
  const [dashboardName, setDashboardName] = useState("");
  const [dashboards, setDashboards] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [usernames, setUsernames] = useState([]);




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
      form.setFieldValue("owner", username);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An error occurred."); // Handle potential errors
    }
  };

  const handleSubmit = () => {
    // Handle save operation here
    console.log("Owner:", owner);
    console.log("Admin:", admin);
    console.log("Dashboard Name:", dashboardName);
    console.log("Dashboards:", dashboards);
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
    fetchData();
    fetchUsernames();

  }, [username]); // Re-run on username change
  const [form] = Form.useForm();

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
        <Form.Item label="Dashboards">
          <Input.TextArea
            value={dashboards}
            onChange={(e) => setDashboards(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DashboardMerge;
