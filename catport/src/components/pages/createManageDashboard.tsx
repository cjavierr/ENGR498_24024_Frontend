// import React from "react";
// import { Table, Button, Input, Select } from "antd";
// import { SearchOutlined } from "@ant-design/icons";
// import { ColumnType } from "antd/es/table";

// const { Option } = Select;

// interface DashboardRecord {
//   key: string;
//   recordNumber: string;
//   owner: string
//   ownerOrg: string;
//   lowerLevel: string;
//   attachLowerLevel: string;
//   highLevelName: string;
//   escalate: string;
// }

// // Function to generate table column with text filter
// function tableColumnTextFilterConfig<T>(): ColumnType<T> {
//   const searchInputHolder: { current: Input | null } = { current: null };

//   return {
//     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
//       <div style={{ padding: 8 }}>
//         <Input
//           ref={(node) => {
//             searchInputHolder.current = node;
//           }}
//           placeholder={`Search`}
//           value={selectedKeys[0]}
//           onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={() => confirm()}
//           style={{ width: 188, marginBottom: 8, display: "block" }}
//         />
//         <Button
//           type="primary"
//           onClick={() => confirm()}
//           icon={<SearchOutlined />}
//           size="small"
//           style={{ width: 90, marginRight: 8 }}
//         >
//           Search
//         </Button>
//         <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
//           Reset
//         </Button>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
//     ),
//     onFilterDropdownVisibleChange: (visible) => {
//       if (visible) {
//         setTimeout(() => searchInputHolder.current?.select(), 100);
//       }
//     },
//   };
// }

// const ManageDashboard: React.FC = () => {
//   const columns: ColumnType<DashboardRecord>[] = [
//     {
//       title: "Record Number",
//       dataIndex: "recordNumber",
//       key: "recordNumber",
//       ...tableColumnTextFilterConfig<DashboardRecord>(),
//       onFilter: (value, record) => record.recordNumber.toLowerCase().includes(value.toLowerCase()),
//     },
//     {
//       title: "Owner Org / Project Name",
//       dataIndex: "ownerOrg",
//       key: "ownerOrg",
//       ...tableColumnTextFilterConfig<DashboardRecord>(),
//       // Define other filters similarly
//     },
//     {
//         title: "Owner",
//         dataIndex: "owner",
//         key: "owner",
//         ...tableColumnTextFilterConfig<DashboardRecord>(),
//         // Define other filters similarly
//       },
//     {
//         title: "Lower Level",
//         dataIndex: "lowerLevel",
//         key: "lowerLevel",
//         ...tableColumnTextFilterConfig<DashboardRecord>(),
//       },
//       {
//         title: "Attach Lower Level",
//         dataIndex: "attachLowerLevel",
//         key: "attachLowerLevel",
//         ...tableColumnTextFilterConfig<DashboardRecord>(),
//         // Define other filters similarly
//       },
//       {
//         title: "High Level Name",
//         dataIndex: "highLevel",
//         key: "highLevel",
//         ...tableColumnTextFilterConfig<DashboardRecord>(),
//       },
//       {
//         title: "Escalate",
//         dataIndex: "escalate",
//         key: "escalate",
//         ...tableColumnTextFilterConfig<DashboardRecord>(),
//         // Define other filters similarly
//       },
//     // Add more columns as needed
//   ];

//   const data: DashboardRecord[] = [
//     // Sample data
//     { key: '1', recordNumber: '001', owner: 'Derrick', ownerOrg: '793-BEM', lowerLevel: 'None', attachLowerLevel: 'Yes', highLevelName: 'None', escalate: 'No' },
//     { key: '2', recordNumber: '002', owner: 'Derrick', ownerOrg: '794-BEM', lowerLevel: 'None', attachLowerLevel: 'No', highLevelName: 'None', escalate: 'No' },
//     // Add more data records as needed
//   ];

//   return <Table columns={columns} dataSource={data} />;
// };

// export default ManageDashboard;
export{}
