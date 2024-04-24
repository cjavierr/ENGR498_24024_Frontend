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
        history('/createDashboard');
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
    const handleCreateMapSubcategories = () => {
        history('/createMapSubcategories');
    }
    const handleCreateMergedDashboard = () => {
        history('/createMergedDashboard');
    }
    const handleCreateAdminHomePage = () => {
        history('/createAdminHomePage');
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
                    <span> Create Projects</span>
                </Menu.Item>
                <Menu.Item key="3" onClick={handleCreateSubCategoriesClick} >
                    <UnorderedListOutlined/>
                    <span> Create Subcategories</span>
                </Menu.Item>
                <Menu.Item key="4" onClick={handleCreateDashboardClick} >
                    <UnorderedListOutlined/>
                    <span> Create Dashboard</span>
                </Menu.Item>
                <Menu.Item key="5" onClick={handleCreateProjectListingClick} >
                    <UnorderedListOutlined/>
                    <span> Project Listing</span>
                </Menu.Item>
                <Menu.Item key="6" onClick={handleCreateManageDashboardClick} >
                    <UnorderedListOutlined/>
                    <span> Manage Dashboards</span>
                </Menu.Item>
                <Menu.Item key="7" onClick={handleCreateRiskClick} >
                    <UnorderedListOutlined/>
                    <span> Create Risk</span>
                </Menu.Item>
                <Menu.Item key="8" onClick={handleCreateManageRiskClick} >
                    <UnorderedListOutlined/>
                    <span> Manage Risk</span>
                </Menu.Item>
                <Menu.Item key="9" onClick={handleCreateMapSubcategories} >
                    <UnorderedListOutlined/>
                    <span> Map Subcategories</span>
                </Menu.Item>
                <Menu.Item key="10" onClick={handleCreateMergedDashboard} >
                    <UnorderedListOutlined/>
                    <span> Merged Dashboard</span>
                </Menu.Item>
                <Menu.Item key="11" onClick={handleCreateAdminHomePage} >
                    <UnorderedListOutlined/>
                    <span> Admin Homepage</span>
                </Menu.Item>
            </Menu>
        </div>
    );
}
export default SideNav;