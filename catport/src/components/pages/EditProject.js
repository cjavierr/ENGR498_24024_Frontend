import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Form, Input, Button, Select, InputNumber } from "antd";

const EditProject = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
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

    fetchProject();
  }, [projectId]);

  const onFinish = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      // Send a request to update the project details
      await axios.post("http://localhost:3001/api/saveProject", {
        projectId: projectId,
        projectData: values,
      });
      setLoading(false);
      // Redirect or show a success message
    } catch (error) {
      console.error("Error updating project:", error);
      setLoading(false);
      // Handle error
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <h2>Edit Project: {project.projectName}</h2>
      <Form
        name="edit_project_form"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          projectName: project.projectName,
          projectDescription: project.projectDescription,
          quantitativekpis: project.KPIs.quantitative,
          qualitativekpis: project.KPIs.qualitative,
          subcategories: project.subcategories,
          // Add other fields here with initial values
        }}
      >
        <Form.Item
          name="projectName"
          label="Project Name"
          rules={[{ required: true, message: "Please enter project name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="projectDescription"
          label="Project Description"
          rules={[
            { required: true, message: "Please enter project description" },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="quantitativekpis" label="Quantitative KPIs">
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Select or type KPIs"
            defaultValue={project.KPIs.quantitative}

          >
            {project.KPIs.quantitative.map((kpi) => (
              <Select.Option value={kpi}>{kpi}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="qualitativekpis" label="Qualitative KPIs">
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Select or type KPIs"
            defaultValue={['china']}
          >
            {project.KPIs.qualitative.map((kpi) => (
              <Select.Option value={kpi}>{kpi}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="subcategories" label="Subcategories">
          {project.subcategories.map((subcategory, index) => (
            <div key={index}>
              <Form.Item
                name={["subcategories", index, "subcategoryheading"]}
                label={`Subcategory ${index + 1} Heading`}
              >
                <Input />
              </Form.Item>
              <Form.List
                name={["subcategories", index, "list"]}
                initialValue={subcategory.list}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, subIndex) => (
                      <div key={field.key}>
                        <Form.Item
                          {...field}
                          label={`Subcategory ${index + 1} Detail ${subIndex + 1}`}
                          name={[field.name, "subcategorydetail"]}
                          fieldKey={[field.fieldKey, "subcategorydetail"]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    ))}
                    <Button onClick={() => add()}>Add Detail</Button>
                  </>
                )}
              </Form.List>
            </div>
          ))}
        </Form.Item>
        {/* Add more form items for other project details */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProject;
