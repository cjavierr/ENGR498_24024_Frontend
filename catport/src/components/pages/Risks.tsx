import React, { useState, useEffect } from "react";
import axios from "axios";
import { theme, Typography, Table, Button, Select, Modal } from "antd";

import { useParams, useLocation, useNavigate } from "react-router-dom";


const {Title} = Typography;

interface RiskRecord {
  key: string;
  riskid: string;
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
  const [currentUser, setCurrentUser] = React.useState<string>('');
  const [visible, setVisible] = React.useState(false);
  const [selectedNote, setSelectedNote] = React.useState('');
  const [data, setData] = React.useState<RiskRecord[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    setCurrentUser(loggedInUser || "");
    const fetchProject = async () => {
      setLoading(true);
      try {
        // Fetch the project details from the backend using projectId
        const response = await axios.get(
          `http://localhost:3001/api/getProjectRisks?projectId=${location.state.projectId}`,
           { withCredentials: true}
        );
        setData(response.data.risks);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    
    fetchProject();
    setLoading(false);
  }, );

  const escalateRisk = async (recordNumber: string) => {
    try {
       await axios.post('http://localhost:3001/api/escalateRisk', {"riskID": recordNumber },{ withCredentials: true })
       .then((res: any) => console.log(res.data))
       .catch((err: any) => console.error(err));
       window.location.reload();
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

  const deleteRisk = async (riskid : string) => {
    try {
      const response = await axios.post('http://localhost:3001/api/deleteRisk', {"riskid" : riskid}, { withCredentials: true });
    } catch (error) {
      console.error(error);
    }
  }

  const columns = [
    {
      title: 'Risk ID',
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
        <Button type="primary" onClick={() => escalateRisk(record.riskid)} disabled={currentUser !== record.owner}>
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
      <Button onClick={() => deleteRisk(record.riskid)} disabled={currentUser !== record.owner}>Delete</Button>
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
      <Modal title="Notes" visible={visible} onOk={handleOk} onCancel={handleCancel}>
      <p>{selectedNote}</p>
    </Modal>
    </>
  );
};

export default Risks;
