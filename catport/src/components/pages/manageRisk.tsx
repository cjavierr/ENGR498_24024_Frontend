import React from 'react';
import { Table, Button, Tag, Space, Select } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import cookie from 'cookie';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

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
  notes: string;
}


const ManageRisk: React.FC = () => {
const [currentUser, setCurrentUser] = React.useState<string>('');
const [visible, setVisible] = React.useState(false);
const [selectedNote, setSelectedNote] = React.useState('');
const [data, setData] = React.useState<RiskRecord[]>([]);

const navigate = useNavigate();

const showModal = (note: string) => {
  setSelectedNote(note);
  setVisible(true);
};

const handleOk = () => {
  setVisible(false);
};

const handleCancel = () => {
  setVisible(false);
};
const editRisk = (record: RiskRecord) => {
  navigate('/editRisk', { state: { record } });
};

  React.useEffect(() => {
    const cookies = cookie.parse(document.cookie);
    const firstName = cookies.firstName;
    setCurrentUser(firstName);
    console.log('currentUser:', currentUser)
    }, [currentUser]);
  

  const getRisks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/getRisks', { withCredentials: true });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const escalateRisk = async (recordNumber: string) => {
    try {
       await axios.post('http://localhost:3001/api/escalateRisk', {"riskID": recordNumber },{ withCredentials: true })
       .then((res: any) => console.log(res.data))
       .catch((err: any) => console.error(err));
       navigate('/manageRisk')
    } catch (error) {
      console.error(error);
    }
  }
  
  React.useEffect(() => {
    if(currentUser) {
    const fetchData = async () => {
      const result = await getRisks();
      const data = result.risks.map((risk: any) => ({ ...risk, record: risk }));
      setData(result.risks);
    };
    
  
    fetchData();
  }
  }, [currentUser]);
  const columns: ColumnsType<RiskRecord> = [
    {
        title: 'RiskID',
        dataIndex: 'riskid',
        key: 'riskid',
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
        render: ( text: string, record: RiskRecord) => (
          <div>
      <div style={{ marginBottom: '8px' }}>
          <Button type="primary" onClick={() => escalateRisk(record.recordNumber)}>
            escalate
          </Button>
      </div>
    </div>
        ),
      },
      {
        title: 'Actions',
        key: 'actions',
        render: (_, record) => (
          <div>
      <div style={{ marginBottom: '8px' }}>
        <Button onClick={() => editRisk(record)} disabled={currentUser !== record.owner}>Edit Risk</Button>
      </div>
    </div>
  ),
},
{
  title: 'Notes',
  key: 'notes',
  render: (text: string, record: RiskRecord) => (
    <Button onClick={() => showModal(record.notes)}>View Notes</Button>
  ),
},
];

  return (
    <>
    <Table
      columns={columns}
      dataSource={data}
      pagination={false}
      bordered
      title={() => 'Manage Risks'}
    />
    <Modal title="Notes" visible={visible} onOk={handleOk} onCancel={handleCancel}>
      <p>{selectedNote}</p>
    </Modal>
    </>
  );
};

export default ManageRisk;
