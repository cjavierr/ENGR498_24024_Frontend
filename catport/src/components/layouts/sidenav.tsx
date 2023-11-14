import React from 'react';
import { Menu} from 'antd';
import {
    HomeOutlined,
  } from '@ant-design/icons';
import {useNavigate}  from 'react-router';
const SideNav = () => {
    const history = useNavigate();

    const handleHomeClick = () => {
        history('/home');
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
            </Menu>
        </div>
    );
}
export default SideNav;