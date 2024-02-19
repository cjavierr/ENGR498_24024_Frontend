import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import SideNav from './sidenav';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    window.innerWidth <= 760 ? setCollapse(true) : setCollapse(false);
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
        <Header className="siteLayoutBackground" style={{ padding: 0, background: "#000000" }}>
          {React.createElement(collapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: handleToggle,
            style: { color: "#fff"}
          })}
          <span style={{ color: 'white', marginLeft: '20px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>CatPort</span>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, minHeight: "calc(100vh - 114px)", background: "#fff" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
