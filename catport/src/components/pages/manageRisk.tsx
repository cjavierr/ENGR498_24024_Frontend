import React from 'react';
import { Table, Button, Tag, Space, Select } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';

const { Option } = Select;

interface RiskRecord {
  key: string;
  recordNumber: string;
  owner: string;
  projectName: string;
  riskNumber: string;
  riskName: string;
  dateCreated: string;
  lastUpdated: string;
  duration: string;
  clearBy: string;
  probability: string;
  impact: string;
  ranking: string;
  riskStage: string;
  escalate: string;
}


const ManageRisk: React.FC = () => {
  const getRisks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/getRisks', { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  
  const [data1, setData1] = React.useState<RiskRecord[]>([]);
  
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getRisks();
      setData1(result);
    };
  
    fetchData();
  }, []);
  const columns: ColumnsType<RiskRecord> = [
    {
        title: 'Record Number',
        dataIndex: 'recordNumber',
        key: 'recordNumber',
      },
      {
        title: 'Owner',
        dataIndex: 'owner',
        key: 'owner',
      },
      {
        title: 'Project Name',
        dataIndex: 'projectName',
        key: 'projectName',
      },
      {
        title: 'Risk Number',
        dataIndex: 'riskNumber',
        key: 'riskNumber',
      },
      {
        title: 'Risk Name',
        dataIndex: 'riskName',
        key: 'riskName',
      },
      {
        title: 'Date Created',
        dataIndex: 'dateCreated',
        key: 'dateCreated',
      },
      {
        title: 'Clear By',
        dataIndex: 'clearBy',
        key: 'clearBy',
      },
      {
        title: 'Probability',
        dataIndex: 'probability',
        key: 'probability',
      },
      {
        title: 'Impact',
        dataIndex: 'impact',
        key: 'impact',
      },
      {
        title: 'Ranking',
        dataIndex: 'ranking',
        key: 'ranking',
      },
      {
        title: 'Risk Stage',
        dataIndex: 'riskStage',
        key: 'riskStage',
      },
      {
        title: 'Escalate',
        dataIndex: 'escalate',
        key: 'escalate',
        render: escalate => (
          <Tag color={escalate === 'Yes' ? 'volcano' : 'green'}>
            {escalate}
          </Tag>
        ),
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <div>
      <div style={{ marginBottom: '8px' }}>
        <Button type="primary">Convert to Issues</Button>
      </div>
      <div style={{ marginBottom: '8px' }}>
        <Button>View</Button>
      </div>
      <div>
        <Button danger>Delete</Button>
      </div>
    </div>
  ),
},
];

  const data: RiskRecord[] = [
    {
        key: '1',
        recordNumber: 'CAT-001',
        owner: 'Sardar',
        projectName: '793-BEM',
        riskNumber: 'CAT-001-R001',
        riskName: 'Risk 1',
        dateCreated: '01/03/2023',
        lastUpdated: '02/11/2023',
        duration: '60 Days',
        clearBy: '03/04/2024',
        probability: 'Likely',
        impact: 'Minor',
        ranking: 'Low',
        riskStage: 'New',
        escalate: 'No',
      },
      {
        key: '2',
        recordNumber: 'CAT-001',
        owner: 'Sardar',
        projectName: '793-BEM',
        riskNumber: 'CAT-001-R001',
        riskName: 'Risk 1',
        dateCreated: '01/03/2023',
        lastUpdated: '02/11/2023',
        duration: '60 Days',
        clearBy: '03/04/2024',
        probability: 'Likely',
        impact: 'Minor',
        ranking: 'Low',
        riskStage: 'New',
        escalate: 'No',
      }
  ];

  return (
    <Table
      columns={columns}
      dataSource={data1}
      pagination={false}
      bordered
      title={() => 'Manage Risks'}
      footer={() => (
        <Space>
          <Select defaultValue="" style={{ width: 150 }}>
            {/* Dropdown options can be dynamically generated based on data */}
            <Option value="selectProbability">- Select Probability -</Option>
            <Option value="certain">Certain</Option>
            <Option value="likely">Likely</Option>
            <Option value="likely">Moderate</Option>
            <Option value="moderate">Unlikely</Option>
            <Option value="certain">Rare</Option>
          </Select>
          <Select defaultValue="" style={{ width: 150 }}>
            <Option value="selectImpact">- Select Impact -</Option>
            <Option value="insignificant">Insignificant</Option>
            <Option value="minor">Minor</Option>
            <Option value="moderate1">Moderate</Option>
            <Option value="major">Major</Option>
            <Option value="catastrophic">Catastrophic</Option>
            {/* ...other options */}
          </Select>
          <Select defaultValue="" style={{ width: 150 }}>
            <Option value="selectRank">- Select Rank -</Option>
            <Option value="low">Low</Option>
            <Option value="moderate2">Moderate</Option>
            <Option value="high">High</Option>
            <Option value="extreme">Extreme</Option>
            {/* ...other options */}
          </Select>
          <Button>- Select Risk Stage -</Button>
        </Space>
      )}
    />
  );
};

export default ManageRisk;
