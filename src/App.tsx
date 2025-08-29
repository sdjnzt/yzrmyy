import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import MainLayout from './components/Layout/MainLayout';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import SystemManagement from './pages/SystemManagement';
import VideoManagement from './pages/VideoManagement';
import AlarmManagement from './pages/AlarmManagement';
import SecurityManagement from './pages/SecurityManagement';
import PatrolManagement from './pages/PatrolManagement';
import VisitorManagement from './pages/VisitorManagement';
import DeviceManagement from './pages/DeviceManagement';
import UserSecurityManagement from './pages/UserSecurityManagement';
import OperationManagement from './pages/OperationManagement';
import ReportAnalysis from './pages/ReportAnalysis';
import { UserProvider } from './contexts/UserContext';

const { Content } = Layout;

const App: React.FC = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <PrivateRoute>
            <MainLayout>
              <Content className="site-layout-content">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/system" element={<SystemManagement />} />
                  <Route path="/video" element={<VideoManagement />} />
                  <Route path="/alarm" element={<AlarmManagement />} />
                  <Route path="/security" element={<SecurityManagement />} />
                  <Route path="/patrol" element={<PatrolManagement />} />
                  <Route path="/visitor" element={<VisitorManagement />} />
                  <Route path="/device" element={<DeviceManagement />} />
                  <Route path="/user-security" element={<UserSecurityManagement />} />
                  <Route path="/operation" element={<OperationManagement />} />
                  <Route path="/reports" element={<ReportAnalysis />} />
                </Routes>
              </Content>
            </MainLayout>
          </PrivateRoute>
        } />
      </Routes>
    </UserProvider>
  );
};

export default App;
