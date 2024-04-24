import React, { useState, useEffect } from 'react';
import { Layout, Avatar } from 'antd';
import SideNav from './sidenav';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const [collapse, setCollapse] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false);
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      setUsername(user);
    }
  }, []);

  const handleToggle = (event: any) => {
    event.preventDefault();
    collapse ? setCollapse(false) : setCollapse(true);
  };

  return (
    <Layout >
      <Sider trigger={null} collapsible collapsed={collapse} style={{background: "#000000" }}>
        <SideNav />
      </Sider>
      <Layout>
        <Header className="siteLayoutBackground" style={{ padding: 0, background: "#000000", display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            {React.createElement(collapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: handleToggle,
              style: { color: "#fff"}
            })}
            <span style={{ color: 'white', marginLeft: '20px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>CatPort</span>
          </div>
          <div>
            <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: '#1890ff', marginRight: '20px' }} />
            <a style={{ color: 'white', paddingRight: '30px' }}>{username}</a>
          </div>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: "calc(100vh - 114px)", background: "#fff" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
