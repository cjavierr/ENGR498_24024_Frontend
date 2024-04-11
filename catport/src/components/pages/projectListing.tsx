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

// Function to generate table column with text filter
function tableColumnTextFilterConfig<T>(): ColumnType<T> {
  const searchInputHolder: { current: typeof Input | null } = { current: null };
  const history = useNavigate();

  const handleRiskClick = (projectNumber: any) => {
    history('/createRisk', { state: { projectNumber } });
  };

  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInputHolder.current = node;
          }}
          placeholder={`Search`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => confirm()}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInputHolder.current?.select(), 100);
      }
    },
  };
}

const ProjectListing: React.FC = () => {
  const columns: ColumnType<ProjectRecord>[] = [
    {
      title: "Record Number",
      dataIndex: "recordNumber",
      key: "recordNumber",
      ...tableColumnTextFilterConfig<ProjectRecord>(),
      onFilter: (value, record) => record.recordNumber.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      ...tableColumnTextFilterConfig<ProjectRecord>(),
    },
    {
      title: "Owner Org / Project Name",
      dataIndex: "ownerOrg",
      key: "ownerOrg",
      ...tableColumnTextFilterConfig<ProjectRecord>(),
    },
    {
        title: "Dashboard Number",
        dataIndex: "dashboardNumber",
        key: "dashboardNumber",
        ...tableColumnTextFilterConfig<ProjectRecord>(),
      },
      {
        title: "Dashboard Name",
        dataIndex: "dashboardName",
        key: "dashboardName",
        ...tableColumnTextFilterConfig<ProjectRecord>(),
      },
      {
        title: "Date Created",
        dataIndex: "dateCreated",
        key: "dateCreated",
        ...tableColumnTextFilterConfig<ProjectRecord>(),
      },
      {
        title: "Last Updated",
        dataIndex: "lastUpdated",
        key: "lastUpdated",
        ...tableColumnTextFilterConfig<ProjectRecord>(),
      },
      {
        title: "Escalate",
        dataIndex: "escalate",
        key: "escalate",
        ...tableColumnTextFilterConfig<ProjectRecord>(),
        // Define other filters similarly
      },
    // Add more columns as needed
  ];

  const data: any[] = [
    // Sample data
    { key: '1', recordNumber: '001', owner: 'Derrick', ownerOrg: '793-BEM', dashboardNumber: 'CAT-001-D1001', dashboardName: 'LMT-793-BEM', dateCreated: '5/1/2023', lastUpdated: '6/1/2023', escalate: 'No' },
    { key: '2', recordNumber: '002', owner: 'Derrick', ownerOrg: '794-BEM', dashboardNumber: 'CAT-001-D1002', dashboardName: 'LMT-794-BEM', dateCreated: '6/1/2023', lastUpdated: '6/1/2023', escalate: 'No' },
    // Add more data records as needed
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default ProjectListing;
