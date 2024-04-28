import React, { useState, useEffect } from "react";
import axios from "axios";
import { theme, Typography, Table, Button, Select } from "antd";

import { useParams, useLocation, useNavigate } from "react-router-dom";


const {Title} = Typography;

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

const Risks = () => {
  const { projectId } = useParams(); // Get the projectId from the URL params

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState();
  const [currentUser, setCurrentUser] = React.useState<string>('');
  const [visible, setVisible] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState('');
  const [data, setData] = React.useState<RiskRecord[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {

    const fetchProject = async () => {
      setLoading(true);
      try {
        // Fetch the project details from the backend using projectId
        const response = await axios.get(
          `http://localhost:3001/api/getProjectRisks?projectId=${location.state.projectId}`,
           { withCredentials: true}
        );
        await setProject(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    
    fetchProject();
    setLoading(false);
  }, [projectId]);

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

  const handleRiskClick = (projectId: string | undefined) => {
      navigate('/createRisk', { state: { projectID: projectId} });
    };

  const columns = [
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
      render: (_: any, record : any) => (
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

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <>
    <Title>{location.state.projectName + " - Risks"}</Title>
    <Title level={3} type="secondary">{projectId}</Title>
    <Button type="primary" onClick={() => handleRiskClick(projectId)}>Create Risk</Button>

      <Table
        dataSource={data} // Assuming project.risks contains the array of risk objects
        columns={columns}
        rowKey="id" // Assuming each risk object has a unique identifier named "id"
        pagination={false} // If you want to disable pagination
      />
    </>
  );
};

export default Risks;
