import React from "react";
import { Table, Button, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ColumnType } from "antd/es/table";
import type { InputRef } from 'antd';

const { Option } = Select;

interface DashboardRecord {
  key: string;
  recordNumber: string;
  owner: string;
  ownerOrg: string;
  lowerLevel: string;
  attachLowerLevel: string;
  highLevelName: string;
  escalate: string;
}

// Function to generate table column with text filter
function tableColumnTextFilterConfig<T>(): ColumnType<T> {
  const searchInputHolder: { current: InputRef | null } = { current: null };

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
        setTimeout(() => searchInputHolder.current?.focus(), 100);
      }
    },
  };
}

const ManageDashboard: React.FC = () => {
  const columns: ColumnType<DashboardRecord>[] = [
    {
      title: "Record Number",
      dataIndex: "recordNumber",
      key: "recordNumber",
      ...tableColumnTextFilterConfig<DashboardRecord>(),
      onFilter: (value, record) =>
        typeof value === 'string' &&
        typeof record.recordNumber === 'string' &&
        record.recordNumber.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Owner Org / Project Name",
      dataIndex: "ownerOrg",
      key: "ownerOrg",
      ...tableColumnTextFilterConfig<DashboardRecord>(),
      onFilter: (value, record) =>
        typeof value === 'string' &&
        typeof record.ownerOrg === 'string' &&
        record.ownerOrg.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
      ...tableColumnTextFilterConfig<DashboardRecord>(),
      onFilter: (value, record) =>
        typeof value === 'string' &&
        typeof record.owner === 'string' &&
        record.owner.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Lower Level",
      dataIndex: "lowerLevel",
      key: "lowerLevel",
      ...tableColumnTextFilterConfig<DashboardRecord>(),
      onFilter: (value, record) =>
        typeof value === 'string' &&
        typeof record.lowerLevel === 'string' &&
        record.lowerLevel.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Attach Lower Level",
      dataIndex: "attachLowerLevel",
      key: "attachLowerLevel",
      ...tableColumnTextFilterConfig<DashboardRecord>(),
      onFilter: (value, record) =>
        typeof value === 'string' &&
        typeof record.attachLowerLevel === 'string' &&
        record.attachLowerLevel.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "High Level Name",
      dataIndex: "highLevelName",
      key: "highLevelName",
      ...tableColumnTextFilterConfig<DashboardRecord>(),
      onFilter: (value, record) =>
        typeof value === 'string' &&
        typeof record.highLevelName === 'string' &&
        record.highLevelName.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Escalate",
      dataIndex: "escalate",
      key: "escalate",
      ...tableColumnTextFilterConfig<DashboardRecord>(),
      onFilter: (value, record) =>
        typeof value === 'string' &&
        typeof record.escalate === 'string' &&
        record.escalate.toLowerCase().includes(value.toLowerCase()),
    },
    // Add more columns as needed
  ];

  const data: DashboardRecord[] = [
    // Sample data
    {
      key: '1',
      recordNumber: '001',
      owner: 'Derrick',
      ownerOrg: '793-BEM',
      lowerLevel: 'None',
      attachLowerLevel: 'Yes',
      highLevelName: 'None',
      escalate: 'No'
    },
    {
      key: '2',
      recordNumber: '002',
      owner: 'Derrick',
      ownerOrg: '794-BEM',
      lowerLevel: 'None',
      attachLowerLevel: 'No',
      highLevelName: 'None',
      escalate: 'No'
    },
    // Add more data records as needed
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default ManageDashboard;