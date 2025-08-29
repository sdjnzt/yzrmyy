import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, Space, Badge, Modal, message } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import './MainLayout.css';
import {
  DashboardOutlined,
  SettingOutlined,
  VideoCameraOutlined,
  AlertOutlined,
  SafetyOutlined,
  UserOutlined,
  ToolOutlined,
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  UserAddOutlined,
  MonitorOutlined,
  BarChartOutlined,
} from '@ant-design/icons';

const { Header, Sider } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useUser();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '系统概览',
    },
    {
      key: '/system',
      icon: <SettingOutlined />,
      label: '系统管理',
    },
    {
      key: '/video',
      icon: <VideoCameraOutlined />,
      label: '视频管理',
    },
    {
      key: '/alarm',
      icon: <AlertOutlined />,
      label: '报警管理',
    },
    {
      key: '/security',
      icon: <SafetyOutlined />,
      label: '安保管理',
    },
    {
      key: '/patrol',
      icon: <TeamOutlined />,
      label: '巡更管理',
    },
    {
      key: '/visitor',
      icon: <UserAddOutlined />,
      label: '访客管理',
    },
    {
      key: '/device',
      icon: <MonitorOutlined />,
      label: '设备管理',
    },
    {
      key: '/user-security',
      icon: <UserOutlined />,
      label: '用户安全管理',
    },
    {
      key: '/operation',
      icon: <ToolOutlined />,
      label: '运行管理',
    },
    {
      key: '/reports',
      icon: <BarChartOutlined />,
      label: '报表分析',
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      // 显示退出登录确认对话框
      Modal.confirm({
        title: '确认退出',
        content: '您确定要退出登录吗？',
        okText: '确认',
        cancelText: '取消',
        okType: 'danger',
        onOk: () => {
          logout(); // 使用UserContext的logout函数
        },
      });
    } else if (key === 'profile') {
      message.info('个人资料功能开发中...');
    } else if (key === 'settings') {
      message.info('设置功能开发中...');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          height: '100vh',
          zIndex: 100,
          transition: 'all 0.2s'
        }}
      >
        <div className="logo">
          {collapsed ? '医院' : '医院安防平台'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ border: 'none' }}
        />
      </Sider>
      <Layout style={{ 
        marginLeft: collapsed ? 80 : 200,
        transition: 'margin-left 0.2s'
      }}>
        <Header style={{ 
          padding: '0 16px', 
          background: '#fff',
          position: 'fixed',
          top: 0,
          right: 0,
          left: collapsed ? 80 : 200,
          zIndex: 99,
          boxShadow: '0 1px 4px rgba(0,21,41,.08)',
          transition: 'left 0.2s'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
                style: { fontSize: '18px', cursor: 'pointer' },
              })}
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#001529' }}>
                济宁市兖州区人民医院综合安防管理平台
              </span>
            </Space>
            <Space size="large">
              <Badge count={5} size="small">
                <BellOutlined className="notification-icon" style={{ fontSize: '18px', color: '#666' }} />
              </Badge>
              <Dropdown
                menu={{
                  items: userMenuItems,
                  onClick: handleUserMenuClick,
                }}
                placement="bottomRight"
              >
                <Space className="user-menu-dropdown" style={{ cursor: 'pointer' }}>
                  <div className="user-avatar-container">
                    <Avatar 
                      icon={<UserOutlined />} 
                      className="user-avatar"
                      src={user?.avatar}
                    />
                  </div>
                  <span className="user-name">{user?.name || '管理员'}</span>
                </Space>
              </Dropdown>
            </Space>
          </div>
        </Header>
        <div style={{ marginTop: 64, padding: '16px' }}>
          {children}
        </div>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
