import React from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
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
    <HashRouter>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <PrivateRoute>
              <MainLayout>
                <Content className="site-layout-content">
                  <Dashboard />
                </Content>
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <MainLayout>
                <Content className="site-layout-content">
                  <Dashboard />
                </Content>
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path="/system" element={
            <PrivateRoute>
              <MainLayout>
                <Content className="site-layout-content">
                  <SystemManagement />
                </Content>
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path="/video" element={
            <PrivateRoute>
              <MainLayout>
                <Content className="site-layout-content">
                  <VideoManagement />
                </Content>
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path="/alarm" element={
            <PrivateRoute>
              <MainLayout>
                <Content className="site-layout-content">
                  <AlarmManagement />
                </Content>
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path="/security" element={
            <PrivateRoute>
              <MainLayout>
                <Content className="site-layout-content">
                  <SecurityManagement />
                </Content>
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path="/patrol" element={
            <PrivateRoute>
              <MainLayout>
                <Content className="site-layout-content">
                  <PatrolManagement />
                </Content>
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path="/visitor" element={
            <PrivateRoute>
              <MainLayout>
                <Content className="site-layout-content">
                  <VisitorManagement />
                </Content>
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path="/device" element={
            <PrivateRoute>
              <MainLayout>
                <Content className="site-layout-content">
                  <DeviceManagement />
                </Content>
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path="/user-security" element={
            <PrivateRoute>
              <MainLayout>
                <Content className="site-layout-content">
                  <UserSecurityManagement />
                </Content>
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path="/operation" element={
            <PrivateRoute>
              <MainLayout>
                <Content className="site-layout-content">
                  <OperationManagement />
                </Content>
              </MainLayout>
            </PrivateRoute>
          } />
          <Route path="/reports" element={
            <PrivateRoute>
              <MainLayout>
                <Content className="site-layout-content">
                  <ReportAnalysis />
                </Content>
              </MainLayout>
            </PrivateRoute>
          } />
        </Routes>
      </UserProvider>
    </HashRouter>
  );
};

export default App;
