import React, { useState } from 'react';
import { 
  Card, 
  Tabs, 
  Table, 
  Button, 
  Space, 
  Modal, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Row, 
  Col, 
  Statistic, 
  Tag,
  Avatar,
  Badge,
  message,
  Popconfirm,
  Timeline,
  Progress,
  Switch,
  InputNumber,
  Alert,
  Divider,
  Tooltip,
  Drawer
} from 'antd';
import {
  UserOutlined,
  KeyOutlined,
  SafetyOutlined,
  LockOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  ReloadOutlined,
  ExportOutlined,
  FilterOutlined,
  SettingOutlined,
  HistoryOutlined,
  SafetyCertificateOutlined,
  UnlockOutlined,
  LockOutlined as LockIcon,
  EyeInvisibleOutlined,
  EyeTwoTone
} from '@ant-design/icons';

const { Option } = Select;
const { Password } = Input;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const UserSecurityManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPolicyModalVisible, setIsPolicyModalVisible] = useState(false);
  const [isDetailDrawerVisible, setIsDetailDrawerVisible] = useState(false);
  const [isResetPasswordModalVisible, setIsResetPasswordModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState<any>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<React.Key[]>([]);
  const [form] = Form.useForm();
  const [policyForm] = Form.useForm();
  const [resetPasswordForm] = Form.useForm();

  // 模拟用户数据
  const [users, setUsers] = useState([
    { 
      id: 1, 
      username: 'admin', 
      name: '系统管理员', 
      email: 'admin@hospital.com', 
      department: '信息科', 
      role: '超级管理员', 
      status: '启用', 
      lastLogin: '2025-08-30 15:00:00',
      loginCount: 156,
      lastPasswordChange: '2025-08-01 00:00:00',
      securityLevel: '高',
      phone: '13800138000',
      createTime: '2025-01-01 00:00:00',
      lastFailedLogin: null,
      failedLoginCount: 0
    },
    { 
      id: 2, 
      username: 'security001', 
      name: '张保安', 
      email: 'security001@hospital.com', 
      department: '保卫科', 
      role: '安保人员', 
      status: '启用', 
      lastLogin: '2025-08-30 14:30:00',
      loginCount: 89,
      lastPasswordChange: '2025-08-10 00:00:00',
      securityLevel: '中',
      phone: '13800138001',
      createTime: '2025-02-01 00:00:00',
      lastFailedLogin: null,
      failedLoginCount: 0
    },
    { 
      id: 3, 
      username: 'nurse001', 
      name: '李护士', 
      email: 'nurse001@hospital.com', 
      department: '护理部', 
      role: '医护人员', 
      status: '启用', 
      lastLogin: '2025-08-30 13:45:00',
      loginCount: 234,
      lastPasswordChange: '2025-08-05 00:00:00',
      securityLevel: '中',
      phone: '13800138002',
      createTime: '2025-03-01 00:00:00',
      lastFailedLogin: null,
      failedLoginCount: 0
    },
    { 
      id: 4, 
      username: 'doctor001', 
      name: '王医生', 
      email: 'doctor001@hospital.com', 
      department: '急诊科', 
      role: '医护人员', 
      status: '禁用', 
      lastLogin: '2025-08-14 10:20:00',
      loginCount: 67,
      lastPasswordChange: '2025-08-08 00:00:00',
      securityLevel: '低',
      phone: '13800138003',
      createTime: '2025-04-01 00:00:00',
      lastFailedLogin: '2025-08-14 10:15:00',
      failedLoginCount: 3
    },
  ]);

  // 模拟登录日志数据
  const [loginLogs, setLoginLogs] = useState([
    { 
      id: 1, 
      username: 'admin', 
      name: '系统管理员', 
      loginTime: '2025-08-30 15:00:00', 
      logoutTime: '2025-08-30 17:30:00', 
      ip: '192.168.1.100', 
      location: '山东省济宁市', 
      device: 'Windows 10', 
      browser: 'Chrome 120.0',
      status: '成功',
      sessionDuration: '2小时30分钟',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    { 
      id: 2, 
      username: 'security001', 
      name: '张保安', 
      loginTime: '2025-08-30 14:30:00', 
      logoutTime: '2025-08-30 16:45:00', 
      ip: '192.168.1.101', 
      location: '山东省济宁市', 
      device: 'Android 13', 
      browser: 'Chrome Mobile',
      status: '成功',
      sessionDuration: '2小时15分钟',
      userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36'
    },
    { 
      id: 3, 
      username: 'nurse001', 
      name: '李护士', 
      loginTime: '2025-08-30 13:45:00', 
      logoutTime: '2025-08-30 15:20:00', 
      ip: '192.168.1.102', 
      location: '山东省济宁市', 
      device: 'Windows 11', 
      browser: 'Edge 120.0',
      status: '成功',
      sessionDuration: '1小时35分钟',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    { 
      id: 4, 
      username: 'unknown', 
      name: '未知用户', 
      loginTime: '2025-08-30 12:30:00', 
      logoutTime: '-', 
      ip: '192.168.1.200', 
      location: '未知', 
      device: '未知', 
      browser: '未知',
      status: '失败',
      sessionDuration: '-',
      userAgent: '未知'
    },
  ]);

  // 模拟安全策略数据
  const securityPolicies = {
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      maxAge: 90,
      preventReuse: 5
    },
    loginPolicy: {
      maxFailedAttempts: 5,
      lockoutDuration: 30,
      sessionTimeout: 120,
      requireMFA: false,
      allowConcurrentLogin: false
    },
    accessPolicy: {
      ipWhitelist: ['192.168.1.0/24', '10.0.0.0/8'],
      workingHours: { start: '08:00', end: '18:00' },
      requireVPN: false,
      auditLogging: true
    }
  };

  // 统计信息
  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === '启用').length,
    inactiveUsers: users.filter(u => u.status === '禁用').length,
    totalLogins: loginLogs.length,
    successfulLogins: loginLogs.filter(l => l.status === '成功').length,
    failedLogins: loginLogs.filter(l => l.status === '失败').length,
    highSecurityUsers: users.filter(u => u.securityLevel === '高').length,
    mediumSecurityUsers: users.filter(u => u.securityLevel === '中').length,
    lowSecurityUsers: users.filter(u => u.securityLevel === '低').length,
  };

  const userColumns = [
    { 
      title: '用户名', 
      dataIndex: 'username', 
      key: 'username',
      render: (username: string, record: any) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <span>{username}</span>
        </Space>
      )
    },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '邮箱', dataIndex: 'email', key: 'email' },
    { title: '部门', dataIndex: 'department', key: 'department' },
    { title: '角色', dataIndex: 'role', key: 'role' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string, record: any) => (
        <Space>
          <Tag color={status === '启用' ? 'green' : 'red'}>{status}</Tag>
          <Switch
            checked={status === '启用'}
            onChange={() => handleToggleUserStatus(record.id, status)}
            checkedChildren="启用"
            unCheckedChildren="禁用"
            size="small"
          />
        </Space>
      )
    },
    { 
      title: '安全等级', 
      dataIndex: 'securityLevel', 
      key: 'securityLevel',
      render: (level: string) => {
        const color = level === '高' ? 'green' : level === '中' ? 'blue' : 'red';
        return <Tag color={color}>{level}</Tag>;
      }
    },
    { title: '最后登录', dataIndex: 'lastLogin', key: 'lastLogin' },
    { title: '操作', key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />} size="small" onClick={() => handleViewDetails(record)}>
            详情
          </Button>
          <Button type="link" icon={<EditOutlined />} size="small" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" icon={<KeyOutlined />} size="small" onClick={() => handleResetPassword(record)}>
            重置密码
          </Button>
          <Popconfirm
            title="确定要删除这个用户吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />} size="small">
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    },
  ];

  const logColumns = [
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '登录时间', dataIndex: 'loginTime', key: 'loginTime' },
    { title: '登出时间', dataIndex: 'logoutTime', key: 'logoutTime' },
    { title: 'IP地址', dataIndex: 'ip', key: 'ip' },
    { title: '登录地点', dataIndex: 'location', key: 'location' },
    { title: '设备', dataIndex: 'device', key: 'device' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '成功' ? 'green' : 'red'}>{status}</Tag>
      )
    },
    { title: '操作', key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />} size="small">
            详情
          </Button>
        </Space>
      )
    },
  ];

  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: any) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleViewDetails = (record: any) => {
    setSelectedRecord(record);
    setIsDetailDrawerVisible(true);
  };

  const handleResetPassword = (record: any) => {
    setSelectedUser(record);
    resetPasswordForm.setFieldsValue({ username: record.username });
    setIsResetPasswordModalVisible(true);
  };

  const handleResetPasswordOk = () => {
    resetPasswordForm.validateFields().then(values => {
      message.success('密码重置成功');
      setIsResetPasswordModalVisible(false);
      resetPasswordForm.resetFields();
    });
  };

  const handleResetPasswordCancel = () => {
    setIsResetPasswordModalVisible(false);
    resetPasswordForm.resetFields();
  };

  const handleRefresh = () => {
    setLoading(true);
    // 模拟刷新数据
    setTimeout(() => {
      message.success('数据已刷新');
      setLoading(false);
    }, 1000);
  };

  const handleExportUsers = () => {
    message.loading('正在导出用户数据...', 2);
    setTimeout(() => {
      message.success('用户数据导出成功');
    }, 2000);
  };

  const handleExportLogs = () => {
    message.loading('正在导出登录日志...', 2);
    setTimeout(() => {
      message.success('登录日志导出成功');
    }, 2000);
  };

  const handleFilter = () => {
    if (!filterDateRange && filterStatus === 'all') {
      message.warning('请选择筛选条件');
      return;
    }
    
    let filteredLogs = [...loginLogs];
    
    // 按状态筛选
    if (filterStatus !== 'all') {
      filteredLogs = filteredLogs.filter(log => log.status === filterStatus);
    }
    
    // 按日期筛选
    if (filterDateRange && filterDateRange.length === 2) {
      const startDate = filterDateRange[0].startOf('day');
      const endDate = filterDateRange[1].endOf('day');
      filteredLogs = filteredLogs.filter(log => {
        const logDate = new Date(log.loginTime);
        return logDate >= startDate.toDate() && logDate <= endDate.toDate();
      });
    }
    
    setLoginLogs(filteredLogs);
    message.success(`筛选完成，共找到 ${filteredLogs.length} 条记录`);
  };

  const handleClearFilter = () => {
    setFilterStatus('all');
    setFilterDateRange(null);
    setLoginLogs([...loginLogs]); // 恢复原始数据
    message.success('筛选条件已清除');
  };

  const handleToggleUserStatus = (userId: number, currentStatus: string) => {
    const newStatus = currentStatus === '启用' ? '禁用' : '启用';
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    message.success(`用户状态已${newStatus === '启用' ? '启用' : '禁用'}`);
  };

  const handleDelete = (id: number) => {
    setUsers(prev => prev.filter(user => user.id !== id));
    message.success('删除成功');
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingRecord) {
        // 编辑用户
        setUsers(prev => prev.map(user => 
          user.id === editingRecord.id ? { ...user, ...values } : user
        ));
        message.success('更新成功');
      } else {
        // 添加用户
        const newUser = {
          id: users.length + 1,
          ...values,
          status: '启用',
          loginCount: 0,
          lastLogin: '-',
          lastPasswordChange: new Date().toLocaleString(),
          securityLevel: '中',
          phone: values.phone || '',
          createTime: new Date().toLocaleString(),
          lastFailedLogin: null,
          failedLoginCount: 0
        };
        setUsers(prev => [...prev, newUser]);
        message.success('添加成功');
      }
      setIsModalVisible(false);
      form.resetFields();
      setEditingRecord(null);
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditingRecord(null);
  };

  const handlePolicySave = () => {
    policyForm.validateFields().then(values => {
      message.success('安全策略保存成功');
      setIsPolicyModalVisible(false);
    });
  };

  const handleBatchEnable = () => {
    if (selectedUserIds.length === 0) {
      message.warning('请先选择用户');
      return;
    }
    setUsers(prev => prev.map(user => 
      selectedUserIds.includes(user.id) ? { ...user, status: '启用' } : user
    ));
    message.success(`已启用 ${selectedUserIds.length} 个用户`);
    setSelectedUserIds([]);
  };

  const handleBatchDisable = () => {
    if (selectedUserIds.length === 0) {
      message.warning('请先选择用户');
      return;
    }
    setUsers(prev => prev.map(user => 
      selectedUserIds.includes(user.id) ? { ...user, status: '禁用' } : user
    ));
    message.success(`已禁用 ${selectedUserIds.length} 个用户`);
    setSelectedUserIds([]);
  };

  const handleBatchDelete = () => {
    if (selectedUserIds.length === 0) {
      message.warning('请先选择用户');
      return;
    }
    Modal.confirm({
      title: '确认批量删除',
      content: `确认删除选中的 ${selectedUserIds.length} 个用户吗？删除后无法恢复。`,
      onOk: () => {
        setUsers(prev => prev.filter(user => !selectedUserIds.includes(user.id)));
        message.success(`已删除 ${selectedUserIds.length} 个用户`);
        setSelectedUserIds([]);
      }
    });
  };

  return (
    <div>
      <div className="page-header">
        <h1>用户安全管理</h1>
        <p>用户权限管理、安全策略设置、登录日志等安全相关功能</p>
      </div>

      {/* 统计信息 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="用户总数"
              value={stats.totalUsers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <div className="statistics-label">
              启用: {stats.activeUsers} | 禁用: {stats.inactiveUsers}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="登录次数"
              value={stats.totalLogins}
              prefix={<HistoryOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <div className="statistics-label">
              成功: {stats.successfulLogins} | 失败: {stats.failedLogins}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="安全等级分布"
              value={stats.highSecurityUsers}
              prefix={<SafetyCertificateOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
            <div className="statistics-label">
              高: {stats.highSecurityUsers} | 中: {stats.mediumSecurityUsers} | 低: {stats.lowSecurityUsers}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="系统安全指数"
              value={92}
              suffix="%"
              prefix={<SafetyOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <div className="statistics-label">
              安全策略执行良好
            </div>
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" size="large">
        <TabPane tab={<span><UserOutlined />用户管理</span>} key="1">
          <Card>
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                  添加用户
                </Button>
                <Button icon={<ReloadOutlined />} onClick={handleRefresh} loading={loading}>
                  刷新
                </Button>
                <Button icon={<ExportOutlined />} onClick={handleExportUsers}>
                  导出用户
                </Button>
                <Divider type="vertical" />
                <Button 
                  icon={<CheckCircleOutlined />} 
                  onClick={handleBatchEnable}
                  disabled={selectedUserIds.length === 0}
                >
                  批量启用
                </Button>
                <Button 
                  icon={<LockIcon />} 
                  onClick={handleBatchDisable}
                  disabled={selectedUserIds.length === 0}
                >
                  批量禁用
                </Button>
                <Popconfirm
                  title="确认批量删除"
                  description="删除后无法恢复，确认删除吗？"
                  onConfirm={handleBatchDelete}
                  okText="确认"
                  cancelText="取消"
                >
                  <Button 
                    danger 
                    icon={<DeleteOutlined />}
                    disabled={selectedUserIds.length === 0}
                  >
                    批量删除
                  </Button>
                </Popconfirm>
              </Space>
            </div>
            <Table
              columns={userColumns}
              dataSource={users}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              rowSelection={{
                selectedRowKeys: selectedUserIds,
                onChange: setSelectedUserIds,
                selections: [
                  {
                    key: 'all',
                    text: '全选',
                    onSelect: () => setSelectedUserIds(users.map(u => u.id))
                  },
                  {
                    key: 'none',
                    text: '取消全选',
                    onSelect: () => setSelectedUserIds([])
                  }
                ]
              }}
            />
          </Card>
        </TabPane>

        <TabPane tab={<span><HistoryOutlined />登录日志</span>} key="2">
          <Card>
            <div style={{ marginBottom: 16 }}>
              <Space>
                <RangePicker 
                  showTime 
                  value={filterDateRange}
                  onChange={setFilterDateRange}
                />
                <Select 
                  placeholder="选择状态" 
                  style={{ width: 120 }}
                  value={filterStatus}
                  onChange={setFilterStatus}
                >
                  <Option value="all">全部状态</Option>
                  <Option value="成功">成功</Option>
                  <Option value="失败">失败</Option>
                </Select>
                <Button icon={<FilterOutlined />} onClick={handleFilter}>
                  筛选
                </Button>
                <Button icon={<ExportOutlined />} onClick={handleExportLogs}>
                  导出日志
                </Button>
                <Button icon={<ReloadOutlined />} onClick={handleRefresh} loading={loading}>
                  刷新
                </Button>
                <Button onClick={handleClearFilter}>
                  清除筛选
                </Button>
              </Space>
            </div>
            <Table
              columns={logColumns}
              dataSource={loginLogs}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane tab={<span><SettingOutlined />安全策略</span>} key="3">
          <Card>
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={8}>
                <Card title="密码策略" size="small">
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>最小长度</span>
                      <span>{securityPolicies.passwordPolicy.minLength}位</span>
                    </div>
                    <Progress percent={80} strokeColor="#52c41a" />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>密码有效期</span>
                      <span>{securityPolicies.passwordPolicy.maxAge}天</span>
                    </div>
                    <Progress percent={70} strokeColor="#1890ff" />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>防止重复使用</span>
                      <span>最近{securityPolicies.passwordPolicy.preventReuse}次</span>
                    </div>
                    <Progress percent={90} strokeColor="#722ed1" />
                  </div>
                  <Button 
                    type="primary" 
                    icon={<SettingOutlined />} 
                    block
                    onClick={() => setIsPolicyModalVisible(true)}
                  >
                    配置密码策略
                  </Button>
                </Card>
              </Col>
              <Col xs={24} lg={8}>
                <Card title="登录策略" size="small">
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>最大失败次数</span>
                      <span>{securityPolicies.loginPolicy.maxFailedAttempts}次</span>
                    </div>
                    <Progress percent={85} strokeColor="#fa8c16" />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>锁定时间</span>
                      <span>{securityPolicies.loginPolicy.lockoutDuration}分钟</span>
                    </div>
                    <Progress percent={75} strokeColor="#f5222d" />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>会话超时</span>
                      <span>{securityPolicies.loginPolicy.sessionTimeout}分钟</span>
                    </div>
                    <Progress percent={60} strokeColor="#13c2c2" />
                  </div>
                  <Button 
                    type="primary" 
                    icon={<SettingOutlined />} 
                    block
                    onClick={() => setIsPolicyModalVisible(true)}
                  >
                    配置登录策略
                  </Button>
                </Card>
              </Col>
              <Col xs={24} lg={8}>
                <Card title="访问控制" size="small">
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>IP白名单</span>
                      <span>{securityPolicies.accessPolicy.ipWhitelist.length}个网段</span>
                    </div>
                    <Progress percent={90} strokeColor="#52c41a" />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>工作时间</span>
                      <span>{securityPolicies.accessPolicy.workingHours.start}-{securityPolicies.accessPolicy.workingHours.end}</span>
                    </div>
                    <Progress percent={80} strokeColor="#1890ff" />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span>审计日志</span>
                      <span>{securityPolicies.accessPolicy.auditLogging ? '启用' : '禁用'}</span>
                    </div>
                    <Progress percent={95} strokeColor="#722ed1" />
                  </div>
                  <Button 
                    type="primary" 
                    icon={<SettingOutlined />} 
                    block
                    onClick={() => setIsPolicyModalVisible(true)}
                  >
                    配置访问控制
                  </Button>
                </Card>
              </Col>
            </Row>
          </Card>
        </TabPane>

        <TabPane tab={<span><SafetyOutlined />安全监控</span>} key="4">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="实时安全状态" size="small">
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <SafetyOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
                  <div style={{ marginTop: 16, color: '#666' }}>
                    系统安全状态良好
                  </div>
                  <div style={{ marginTop: 8, fontSize: '12px', color: '#999' }}>
                    最后检查: {new Date().toLocaleString()}
                  </div>
                  <Button 
                    type="link" 
                    size="small" 
                    onClick={handleRefresh}
                    style={{ marginTop: 8 }}
                  >
                    刷新状态
                  </Button>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="安全事件" size="small">
                <Timeline>
                  <Timeline.Item color="green">
                    <div style={{ fontSize: '12px' }}>
                      <div style={{ fontWeight: 'bold' }}>用户登录成功</div>
                      <div style={{ color: '#666' }}>admin用户登录系统 - 15:00</div>
                    </div>
                  </Timeline.Item>
                  <Timeline.Item color="red">
                    <div style={{ fontSize: '12px' }}>
                      <div style={{ fontWeight: 'bold' }}>登录失败</div>
                      <div style={{ color: '#666' }}>未知用户尝试登录 - 12:30</div>
                    </div>
                  </Timeline.Item>
                  <Timeline.Item color="blue">
                    <div style={{ fontSize: '12px' }}>
                      <div style={{ fontWeight: 'bold' }}>密码策略更新</div>
                      <div style={{ color: '#666' }}>密码最小长度调整为8位 - 10:00</div>
                    </div>
                  </Timeline.Item>
                </Timeline>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* 添加/编辑用户模态框 */}
      <Modal
        title={editingRecord ? '编辑用户' : '添加用户'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '请输入邮箱' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="department" label="部门" rules={[{ required: true, message: '请选择部门' }]}>
                <Select>
                  <Option value="信息科">信息科</Option>
                  <Option value="保卫科">保卫科</Option>
                  <Option value="护理部">护理部</Option>
                  <Option value="急诊科">急诊科</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="role" label="角色" rules={[{ required: true, message: '请选择角色' }]}>
                <Select>
                  <Option value="超级管理员">超级管理员</Option>
                  <Option value="安保人员">安保人员</Option>
                  <Option value="医护人员">医护人员</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="status" label="状态" rules={[{ required: true, message: '请选择状态' }]}>
                <Select>
                  <Option value="启用">启用</Option>
                  <Option value="禁用">禁用</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="phone" label="手机号码">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="securityLevel" label="安全等级">
                <Select>
                  <Option value="高">高</Option>
                  <Option value="中">中</Option>
                  <Option value="低">低</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          {!editingRecord && (
            <Form.Item name="password" label="初始密码" rules={[{ required: true, message: '请输入初始密码' }]}>
              <Password />
            </Form.Item>
          )}
        </Form>
      </Modal>

      {/* 安全策略配置模态框 */}
      <Modal
        title="安全策略配置"
        open={isPolicyModalVisible}
        onOk={handlePolicySave}
        onCancel={() => setIsPolicyModalVisible(false)}
        width={800}
      >
        <Form form={policyForm} layout="vertical">
          <Tabs defaultActiveKey="1">
            <TabPane tab="密码策略" key="1">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="minLength" label="最小长度" initialValue={securityPolicies.passwordPolicy.minLength}>
                    <InputNumber min={6} max={20} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="maxAge" label="密码有效期(天)" initialValue={securityPolicies.passwordPolicy.maxAge}>
                    <InputNumber min={30} max={365} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="requireUppercase" label="要求大写字母" valuePropName="checked" initialValue={securityPolicies.passwordPolicy.requireUppercase}>
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="requireLowercase" label="要求小写字母" valuePropName="checked" initialValue={securityPolicies.passwordPolicy.requireLowercase}>
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="登录策略" key="2">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="maxFailedAttempts" label="最大失败次数" initialValue={securityPolicies.loginPolicy.maxFailedAttempts}>
                    <InputNumber min={3} max={10} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="lockoutDuration" label="锁定时间(分钟)" initialValue={securityPolicies.loginPolicy.lockoutDuration}>
                    <InputNumber min={5} max={120} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="sessionTimeout" label="会话超时(分钟)" initialValue={securityPolicies.loginPolicy.sessionTimeout}>
                    <InputNumber min={30} max={480} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="requireMFA" label="要求双因素认证" valuePropName="checked" initialValue={securityPolicies.loginPolicy.requireMFA}>
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>

      {/* 用户详情抽屉 */}
      <Drawer
        title="用户详情"
        placement="right"
        onClose={() => setIsDetailDrawerVisible(false)}
        open={isDetailDrawerVisible}
        width={600}
      >
        {selectedRecord && (
          <div>
            <p><strong>用户名:</strong> {selectedRecord.username}</p>
            <p><strong>姓名:</strong> {selectedRecord.name}</p>
            <p><strong>邮箱:</strong> {selectedRecord.email}</p>
            <p><strong>部门:</strong> {selectedRecord.department}</p>
            <p><strong>角色:</strong> {selectedRecord.role}</p>
            <p><strong>状态:</strong> {selectedRecord.status}</p>
            <p><strong>安全等级:</strong> {selectedRecord.securityLevel}</p>
            <p><strong>最后登录:</strong> {selectedRecord.lastLogin}</p>
            <p><strong>登录次数:</strong> {selectedRecord.loginCount}</p>
            <p><strong>最后密码修改:</strong> {selectedRecord.lastPasswordChange}</p>
            <p><strong>手机:</strong> {selectedRecord.phone}</p>
            <p><strong>创建时间:</strong> {selectedRecord.createTime}</p>
            <p><strong>最后失败登录:</strong> {selectedRecord.lastFailedLogin ? new Date(selectedRecord.lastFailedLogin).toLocaleString() : 'N/A'}</p>
            <p><strong>失败登录次数:</strong> {selectedRecord.failedLoginCount}</p>
          </div>
        )}
      </Drawer>

      {/* 重置密码模态框 */}
      <Modal
        title="重置密码"
        open={isResetPasswordModalVisible}
        onOk={handleResetPasswordOk}
        onCancel={handleResetPasswordCancel}
        width={400}
      >
        <Form form={resetPasswordForm} layout="vertical">
          <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input disabled />
          </Form.Item>
          <Form.Item name="newPassword" label="新密码" rules={[{ required: true, message: '请输入新密码' }]}>
            <Password />
          </Form.Item>
          <Form.Item name="confirmPassword" label="确认密码" rules={[{ required: true, message: '请确认密码' }]}>
            <Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserSecurityManagement;
