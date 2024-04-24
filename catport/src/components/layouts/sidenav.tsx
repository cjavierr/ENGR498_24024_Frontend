import React from 'react';
import { Menu} from 'antd';
import {
    HomeOutlined,
    ProjectOutlined,
    UnorderedListOutlined,
  } from '@ant-design/icons';
import {useNavigate}  from 'react-router';

const SideNav = () => {
    const history = useNavigate();

    const handleHomeClick = () => {
        history('/home');
    }
    const handleCreateProjectClick = () => {
        history('/createProject');
    }
    const handleCreateSubCategoriesClick = () => {
        history('/createSubcategories');
    }
    const handleCreateProjectListingClick = () => {
        history('/createProjectListing');
    }
    const handleCreateDashboardClick = () => {
        history('/CreateDashboard');
    }
    const handleCreateManageDashboardClick = () => {
        history('/createManageDashboard');
    }
    const handleCreateRiskClick = () => {
        history('/createRisk');
    }
    const handleCreateManageRiskClick = () => {
        history('/createManageRisk');
    }
    const handleDashboardsViewClick = () => {
        history('/dashboardsView');
    }
    const handleMergeDashboardClick = () => {
        history('/mergeDashboard');
    }
    const handleCreateUserClick = () => {
        history('/CreateUser');
    }
    const handleProjectViewClick = () => {
        history('/projects'); // Navigate to the projects route
    }
    return (
        <div style={{background: "#000000" }}>
            <div style={{height: "32px", margin: "16px", display: 'flex', alignItems: 'center', justifyContent: 'center',background: "#000000",}}>
                <img
                    src="/catlogo.jpg" // Update the image URL
                    alt="Logo"
                    style={{ marginTop: '5%', height: '100%', marginBottom: '0',}}
                />
            </div>
            <Menu  theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{background: "#000000" }}>
                <Menu.Item key="1" onClick={handleHomeClick} >
                    <HomeOutlined/>
                    <span> Home</span>
                </Menu.Item>
                <Menu.Item key="2" onClick={handleCreateProjectClick} >
                    <ProjectOutlined/>
                    <span> Create Project</span>
                </Menu.Item>
            <Menu.Item key="12" onClick={handleProjectViewClick}>
            <UnorderedListOutlined />
            <span> Projects View</span>
            </Menu.Item>
            <Menu.Item key="13" onClick={handleDashboardsViewClick}>
            <UnorderedListOutlined />
            <span> Dashboards View</span>
            </Menu.Item>
            <Menu.Item key="11" onClick={handleCreateUserClick} >
            <UnorderedListOutlined/>
            <span> Create New User</span>
            </Menu.Item>
            </Menu>
        </div>
    );
}
export default SideNav;