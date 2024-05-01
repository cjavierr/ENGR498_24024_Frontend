import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

import { Button, Form, Input, Popconfirm, Table, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Title } = Typography;
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  
  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[{ required: true, message: `${title} is required.` }]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const EditKPIs = () => {
  const [quantitativeDataSource, setQuantitativeDataSource] = useState([]);
  const [qualitativeDataSource, setQualitativeDataSource] = useState([]);
  const [quantitativeCount, setQuantitativeCount] = useState(0);
  const [qualitativeCount, setQualitativeCount] = useState(0);

  const fetchGlossary = async () => {
    console.log("Grabbing company glossary");
    try {
      const response = await axios.get(
        "http://localhost:3001/api/getCompanyGlossary"
      );

      console.log(response.data);

      const quantitativeData = response.data.quantitativekpis.map((item, index) => ({
        key: `quantitative-${index}`,
        name: item.Title,
        units: item.Units,
      }));

      const qualitativeData = response.data.qualitativekpis.map((item, index) => ({
        key: `qualitative-${index}`,
        name: item.Title,
      }));

      setQuantitativeDataSource(quantitativeData);
      setQualitativeDataSource(qualitativeData);
    } catch (error) {
      console.error("Error fetching company Glossary:", error);
    }
  };

  useEffect(() => {
    fetchGlossary();
  }, []);

  const handleSaveData = async () => {
    console.log("Updated glossary");

    try {
      const formattedQuantitativeData = {
        quantitativekpis: quantitativeDataSource.map((item) => ({
          Title: item.name,
          Units: item.units,
        })),
      };

      const formattedQualitativeData = {
        qualitativekpis: qualitativeDataSource.map((item) => ({
          Title: item.name,
        })),
      };

      console.log("Quantitative Data:", formattedQuantitativeData);
      console.log("Qualitative Data:", formattedQualitativeData);

      await axios.post(
        "http://localhost:3001/api/updateCompanyGlossaryKPIs",
        {
          ...formattedQuantitativeData,
          ...formattedQualitativeData,
        }
      );

      // Show success message
      // message.success("Glossary updated successfully");
    } catch (error) {
      console.error("Error updating company Glossary:", error);
      // Show error message
      // message.error("Failed to update glossary");
    }
  };

  const handleDelete = (key, dataSource, setDataSource) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const handleAdd = (dataSource, setDataSource, setCount) => {
    const newData = {
      key: `new-${dataSource.length}`,
      name: `NewMetric`,
      units: "Units",
    };
    setDataSource([...dataSource, newData]);
    setCount((count) => count + 1);
  };

  const handleSave = (row, dataSource, setDataSource) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const quantitativeColumns = [
    {
      title: "KPI",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "Units",
      dataIndex: "units",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.key, quantitativeDataSource, setQuantitativeDataSource)}
        >
          <a>Delete</a>
        </Popconfirm>
      ),
    },
  ];

  const qualitativeColumns = [
    {
      title: "KPI",
      dataIndex: "name",
      width: "30%",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.key, qualitativeDataSource, setQualitativeDataSource)}
        >
          <a>Delete</a>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Title level={2}>Edit KPIs</Title>
      <Button
        onClick={() => handleAdd(quantitativeDataSource, setQuantitativeDataSource, setQuantitativeCount)}
        type="primary"
        style={{ marginBottom: 16 }}
        icon={<PlusOutlined />}
      >
        Add Quantitative KPI
      </Button>
      <Table
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={quantitativeDataSource}
        columns={quantitativeColumns.map((col) => ({
          ...col,
          onCell: (record) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: (row) => handleSave(row, quantitativeDataSource, setQuantitativeDataSource),
          }),
        }))}
      />
      <Button
        onClick={() => handleAdd(qualitativeDataSource, setQualitativeDataSource, setQualitativeCount)}
        type="primary"
        style={{ marginBottom: 16, marginTop: 16 }}
        icon={<PlusOutlined />}
      >
        Add Qualitative KPI
      </Button>
      <Table
        components={{
          body: {
            row: EditableRow,
            cell: EditableCell,
          },
        }}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={qualitativeDataSource}
        columns={qualitativeColumns.map((col) => ({
          ...col,
          onCell: (record) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave: (row) => handleSave(row, qualitativeDataSource, setQualitativeDataSource),
          }),
        }))}
      />
      <Button
        onClick={handleSaveData}
        type="primary"
        style={{ marginBottom: 16 }}
      >
        Save
      </Button>
    </div>
  );
};

export default EditKPIs;
