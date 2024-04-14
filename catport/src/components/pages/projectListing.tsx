import React from "react";
import { Table, Button, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import { useNavigate } from "react-router-dom";


const { Option } = Select;

interface ProjectRecord {
  key: string;
  recordNumber: string;
  owner: string
  ownerOrg: string;
  dashboardNumber: string;
  dashboardName: string;
  dateCreated: string;
  lastUpdated: string;
  escalate: string;
}


const ProjectListing: React.FC = () => {
  const history = useNavigate();

const handleRiskClick = (recordNumber: any) => {
  console.log(recordNumber)
    history('/createRisk', { state: { recordNumber } });
  };
  const columns: ColumnType<ProjectRecord>[] = [
    {
      title: "Record Number",
      dataIndex: "recordNumber",
      key: "recordNumber",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Owner Org / Project Name",
      dataIndex: "ownerOrg",
      key: "ownerOrg",
    },
    {
        title: "Dashboard Number",
        dataIndex: "dashboardNumber",
        key: "dashboardNumber",
      },
      {
        title: "Dashboard Name",
        dataIndex: "dashboardName",
        key: "dashboardName",
      },
      {
        title: "Date Created",
        dataIndex: "dateCreated",
        key: "dateCreated",
      },
      {
        title: "Last Updated",
        dataIndex: "lastUpdated",
        key: "lastUpdated",
      },
      {
        title: "Escalate",
        dataIndex: "escalate",
        key: "escalate",
      },
      {
        title: 'Edit Risks',
        key: 'edit',
        render: (text: any, record: any) => (
          <Button onClick={() => handleRiskClick(record.recordNumber)}>Edit Risks</Button>
        ),
      },
      
  ];

  const data: any[] = [
    // Sample data
    { key: '1', recordNumber: '8466ee1f-51a5-4109-b347-c27528524b0c', owner: 'Derrick', ownerOrg: '793-BEM', dashboardNumber: 'CAT-001-D1001', dashboardName: 'LMT-793-BEM', dateCreated: '5/1/2023', lastUpdated: '6/1/2023', escalate: 'No' },
    { key: '2', recordNumber: '002', owner: 'Derrick', ownerOrg: '794-BEM', dashboardNumber: 'CAT-001-D1002', dashboardName: 'LMT-794-BEM', dateCreated: '6/1/2023', lastUpdated: '6/1/2023', escalate: 'No' },
    // Add more data records as needed
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default ProjectListing;
