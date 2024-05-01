import React, { useState, useEffect } from "react";

import axios from "axios";
import "../../App.css"; // Import the CSS file
import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Select,
  Space,
  Cascader,
  Steps,
  theme,
  Typography,
  Card,
  message
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { useNavigate } from "react-router-dom";

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
  const [usernames, setUsernames] = useState([]);
  const [quantitativeKPIOptions, setquantitativekpioptions] = useState([]);
  const [qualitativeKPIOptions, setqualitativekpioptions] = useState([]);
  const navigate = useNavigate();


  const onFinish = async (values) => {
    console.log("Submitting Form");

    const formData = stepForm.getFieldsValue(true);
    const subcats = subfieldform.getFieldsValue(true);
    let date = new Date().toJSON();
    console.log(formData.quantitativekpis.flat());

    const qualitativeKPIsMap = formData.qualitativekpis.flat().reduce((map, kpi) => {
      map[kpi] = [];
      return map;
    }, {});
    
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
        quantitative: formData.quantitativekpis.flat(),
        qualitative: qualitativeKPIsMap,
      },
      subcategories: subcats.subcategories,
    };
    
    console.log(compiledData);
    console.log("sending to server");
    try {
      const response = await axios.post(
        "https://24024be.vercel.app/api/createNewProject",
        {
          ...compiledData,
        }
      );
      message.success(response.data.message);
      setSuccessMessage(response.data.message);
      setError(null);
      navigate("/projects")
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
      const response = await axios.post("https://24024be.vercel.app/api/getUser", {
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
        "https://24024be.vercel.app/api/allUsernames"
      );
      setUsernames(response.data);
    } catch (error) {
      console.error("Error fetching usernames:", error);
      setError("Failed to fetch usernames");
    }
  };

const fetchGlossary = async () =>{
  console.log("Grabbing company glossary");
  try {
    const response = await axios.get(
      "https://24024be.vercel.app/api/getCompanyGlossary"
    );
    console.log(response.data.quantitativekpis);
    const preprocess = response.data.quantitativekpis.map(obj => obj.Title);

    setquantitativekpioptions(preprocess.map((item) => ({
      label: item,
      value: item,
    })));

    const preprocess2 = response.data.qualitativekpis.map(obj => obj.Title);


    setqualitativekpioptions(preprocess2.map((item) => ({
      label: item,
      value: item,
    })));

  } catch (error) {
    console.error("Error fetching company Glossary:", error);
    setError("Failed to fetch company glossary");
  }
};

  useEffect(() => {
    fetchData();
    fetchUsernames();
    fetchGlossary();
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
          name="projectname"
          label="Project Name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <FormItem name="projectdescription" label="Project Description">
          <TextArea rows={4} />
        </FormItem>
        <Form.Item
          name="projectType"
          label="Project Type"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="What kind of data will your project contain?"
            allowClear
          >
            <Option value="quantitative">Quantitative</Option>
            <Option value="qualitative">Qualitative</Option>
            <Option value="both">Quantitative/Qualitative</Option>
          </Select>
        </Form.Item>
        <FormItem name="additionalNotes" label="Additional Project Notes">
          <TextArea rows={4} />
        </FormItem>
      </>
    );
  };

  const Step2Form = () => {
    return (
      <>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.projectType !== currentValues.projectType
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("projectType") === "quantitative" ? (
              <Form.Item
                name="quantitativekpis"
                label="Quantitative KPIs"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Cascader
                  style={{
                    width: "100%",
                  }}
                  options={quantitativeKPIOptions}
                  onChange={onChange}
                  multiple
                  maxTagCount="responsive"
                  showSearch
                />
              </Form.Item>
            ) : getFieldValue("projectType") === "qualitative" ? (
              <Form.Item
                name="qualitativekpis"
                label="Qualitative KPIs"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Cascader
                  style={{
                    width: "100%",
                  }}
                  options={qualitativeKPIOptions}
                  onChange={onChange}
                  multiple
                  maxTagCount="responsive"
                  showSearch
                />
              </Form.Item>
            ) : getFieldValue("projectType") === "both" ? (
              <>
                <Form.Item
                  name="quantitativekpis"
                  label="Quantitative KPIs"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Cascader
                    style={{
                      width: "100%",
                    }}
                    options={quantitativeKPIOptions}
                    onChange={onChange}
                    multiple
                    maxTagCount="responsive"
                    showSearch
                  />
                </Form.Item>
                <Form.Item
                  name="qualitativekpis"
                  label="Qualitative KPIs"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Cascader
                    style={{
                      width: "100%",
                    }}
                    options={qualitativeKPIOptions}
                    onChange={onChange}
                    multiple
                    maxTagCount="responsive"
                    showSearch
                  />
                </Form.Item>
              </>
            ) : (
              <>Please go back and select a Project Structure.</>
            )
          }
        </Form.Item>
      </>
    );
  };

  const Step3Form = () => {
    return (
      <>
        <Form.Item name="subcategories">
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            form={subfieldform}
            name="dynamic_form_complex"
            autoComplete="off"
            initialValues={{ items: [{}] }}
          >
            <Form.List name="subcategories">
              {(fields, { add, remove }) => (
                <div
                  style={{
                    display: "flex",
                    rowGap: 16,
                    flexDirection: "column",
                  }}
                >
                  {fields.map((field) => (
                    <Card
                      size="small"
                      title={`Sub Category ${field.name + 1}`}
                      key={field.key}
                      extra={
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      }
                    >
                      <Form.Item
                        label="Sub Category Heading"
                        name={[field.name, "subcategoryheading"]}
                      >
                        <Input />
                      </Form.Item>

                      {/* Nest Form.List */}
                      <Form.Item label="Sub Category Details">
                        <Form.List name={[field.name, "list"]}>
                          {(subFields, subOpt) => (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                rowGap: 16,
                              }}
                            >
                              {subFields.map((subField) => (
                                <Space key={subField.key}>
                                  <Form.Item
                                    noStyle
                                    name={[subField.name, "subcategorydetail"]}
                                  >
                                    <Input placeholder="SubCategory" />
                                  </Form.Item>

                                  <CloseOutlined
                                    onClick={() => {
                                      subOpt.remove(subField.name);
                                    }}
                                  />
                                </Space>
                              ))}
                              <Button
                                type="dashed"
                                onClick={() => subOpt.add()}
                                block
                              >
                                + Add Sub Category Detail
                              </Button>
                            </div>
                          )}
                        </Form.List>
                      </Form.Item>
                    </Card>
                  ))}

                  <Button type="dashed" onClick={() => add()} block>
                    + Add Sub Category
                  </Button>
                </div>
              )}
            </Form.List>

            {/* <Form.Item noStyle shouldUpdate>
              {() => (
                <Typography>
                  <pre>
                    {JSON.stringify(subfieldform.getFieldsValue(), null, 2)}
                  </pre>
                </Typography>
              )}
            </Form.Item> */}
          </Form>
        </Form.Item>
      </>
    );
  };

  const [stepForm] = Form.useForm();
  const [subfieldform] = Form.useForm();

  const steps = [
    {
      title: "Project Details",
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
