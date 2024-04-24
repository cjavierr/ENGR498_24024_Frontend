import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Form, Input, Button, Select, InputNumber , Cascader} from "antd";

const EditProject = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedQualititativeProjectKPIs, setSelectedQualitativeProjectKPIs] = useState([]);
  const [selectedQuantitativeProjectKPIs, setSelectedQuantitativeProjectKPIs] = useState([]);

  
  const quantitativeKPIOptions = [
    {
      label: "Revenue - Actual - $",
      value: "Revenue - Actual - $",
    },
    {
      label: "Revenue - Forecast - $",
      value: "Revenue - Forecast - $",
    },
    {
      label: "Expense - Actual - $",
      value: "Expense - Actual - $",
    },
    {
      label: "Expense - Forecast - $",
      value: "Expense - Forecast - $",
    },
    {
      label: "Budget - Forecast - $",
      value: "Budget - Forecast - $",
    },
    {
      label: "Planned - Forecast - $",
      value: "Planned - Forecast - $",
    },
    {
      label: "Planned - Forecast - FTE",
      value: "Planned - Forecast - FTE",
    },
    {
      label: "Actual - $",
      value: "Actual - $",
    },
    {
      label: "Actual - Hrs",
      value: "Actual - Hrs",
    },
    {
      label: "Manufacture - Actual - Units",
      value: "Manufacture - Actual - Units",
    },
    {
      label: "Manufacture - Forecast - Units",
      value: "Manufacture - Forecast - Units",
    },
    {
      label: "Sales - Actual - $",
      value: "Sales - Actual - $",
    },
    {
      label: "Sales - Forecast - $",
      value: "Sales - Forecast - $",
    },
    {
      label: "Inventory - Ordered - $",
      value: "Inventory - Ordered - $",
    },
    {
      label: "Inventory - Instock - $",
      value: "Inventory - Instock - $",
    },
    {
      label: "Inventory - WIP - $",
      value: "Inventory - WIP - $",
    },
  ];

  const qualitativeKPIOptions = [
    {
      label: "Risks",
      value: "Risks",
    },
    {
      label: "Issues",
      value: "Issues",
    },
    {
      label: "Agenda Items",
      value: "Agenda Items",
    },
    {
      label: "Accomplishments",
      value: "Accomplishments",
    },
    {
      label: "Lessons Learned",
      value: "Lessons Learned",
    },
    {
      label: "Assigned Action Items",
      value: "Assigned Action Items",
    },
    {
      label: "My Action Items",
      value: "My Action Items",
    },
    {
      label: "Request Action Item",
      value: "Request Action Item",
    },
  ];

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
        // Set project state
        await setProject(response.data);
        console.log(project);
        console.log(project.KPIs);
        console.log(project.KPIs.qualitative);
  
        // Extract quantitative and qualitative KPIs
        const quantitativeKPIs = project.KPIs.quantitative.map(kpi => ({
          label: kpi,
          value: kpi
        }));
        console.log(quantitativeKPIs);
        const qualitativeKPIs = project.KPIs.qualitative.map(kpi => ({
          label: kpi,
          value: kpi
        }));
  
        // Set selected KPI states
        await setSelectedQuantitativeProjectKPIs(quantitativeKPIs);
        await setSelectedQualitativeProjectKPIs(qualitativeKPIs);
        console.log(selectedQualititativeProjectKPIs)
        console.log(selectedQuantitativeProjectKPIs)

        setLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        setLoading(false);
      }
    };
  
    fetchProject();
    fetchProject();
  }, []);
  

  const onFinish = async (values) => {
    console.log(values);
    try {
      setLoading(true);
      // Send a request to update the project details
      await axios.post("http://localhost:3001/api/saveProject", {
        projectID: projectId,
        projectDescription: values.projectDescription,
        projectName: values.projectName,
        KPIs: {
          qualitative: values.qualitativekpis,
          quantitative: values.quantitativekpis
        },
        subcategories: values.subcategories,
        users: project.users,
        orgadmin: project.orgAdmin,
        dashboards: project.dashboards,
        projectOwner: project.projectOwner,
        projectNotes: project.projectNotes,

        
      });
      console.log(values);
      setLoading(false);
      // Redirect or show a success message
    } catch (error) {
      console.error("Error updating project:", error);
      setLoading(false);
      // Handle error
    }
  };

  if (loading || !project) {
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
  <Cascader
    style={{ width: "100%" }}
    options={quantitativeKPIOptions}
    placeholder="Select or type KPIs"
    initialValues={selectedQuantitativeProjectKPIs}
    multiple
    showSearch

  />
</Form.Item>
        <Form.Item name="qualitativekpis" label="Qualitative KPIs">
        <Cascader
    style={{ width: "100%" }}
    options={qualitativeKPIOptions}
    placeholder="Select or type KPIs"
    initialValues={selectedQualititativeProjectKPIs}
    multiple
    showSearch

  />
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
                          label={`Subcategory ${index + 1} Detail ${
                            subIndex + 1
                          }`}
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
