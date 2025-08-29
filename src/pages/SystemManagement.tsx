import React, { useState, useEffect } from 'react';
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
  Switch, 
  Tag, 
  Row, 
  Col,
  InputNumber,
  message,
  Popconfirm,
  Tooltip,
  Statistic,
  Progress,
  Alert,
  Badge,
  Avatar,
  List,
  Descriptions,
  Divider,
  notification,
  Drawer,
  Timeline,
  Steps,
  Result
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  DatabaseOutlined,
  KeyOutlined,
  ToolOutlined,
  ReloadOutlined,
  ExportOutlined,
  ImportOutlined,
  DownloadOutlined,
  UploadOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  TeamOutlined,
  MonitorOutlined,
  SafetyOutlined,
  FireOutlined,
  BellOutlined,
  CloudOutlined,
  FileTextOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CheckOutlined,
  CloseOutlined
} from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';

const { TabPane } = Tabs;
const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

const SystemManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isConfigModalVisible, setIsConfigModalVisible] = useState(false);
  const [isMaintenanceModalVisible, setIsMaintenanceModalVisible] = useState(false);
  const [isLogDrawerVisible, setIsLogDrawerVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('1');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [userForm] = Form.useForm();
  const [configForm] = Form.useForm();

  // 实时统计数据
  const [stats, setStats] = useState({
    totalDevices: 156,
    onlineDevices: 142,
    totalUsers: 89,
    activeUsers: 67,
    systemHealth: 92,
    lastBackup: '2025-08-30 02:00'
  });

  // 模拟数据
  const deviceData = [
    { id: 1, name: '门禁控制器-01', type: '门禁系统', location: '门诊楼1层', status: '在线', ip: '192.168.1.100', lastUpdate: '2025-08-30 15:30', version: 'v2.1.0', manufacturer: '海康威视' },
    { id: 2, name: '摄像头-001', type: '视频监控', location: '门诊楼大厅', status: '在线', ip: '192.168.1.101', lastUpdate: '2025-08-30 15:29', version: 'v1.8.5', manufacturer: '大华' },
    { id: 3, name: '报警主机-01', type: '报警系统', location: '监控中心', status: '在线', ip: '192.168.1.102', lastUpdate: '2025-08-30 15:28', version: 'v2.0.1', manufacturer: '霍尼韦尔' },
    { id: 4, name: '消防控制器', type: '消防系统', location: '消防控制室', status: '离线', ip: '192.168.1.103', lastUpdate: '2025-08-30 14:15', version: 'v1.9.2', manufacturer: '西门子' },
    { id: 5, name: '网络交换机-01', type: '网络设备', location: '机房', status: '在线', ip: '192.168.1.104', lastUpdate: '2025-08-30 15:25', version: 'v3.2.0', manufacturer: '思科' },
    { id: 6, name: '存储服务器', type: '存储设备', location: '机房', status: '在线', ip: '192.168.1.105', lastUpdate: '2025-08-30 15:20', version: 'v2.5.1', manufacturer: '戴尔' },
  ];

  const userData = [
    { id: 1, username: 'admin', name: '系统管理员', role: '超级管理员', department: '信息科', status: '启用', lastLogin: '2025-08-30 15:00', email: 'admin@hospital.com', phone: '13800138000' },
    { id: 2, username: 'security001', name: '张保安', role: '安保人员', department: '保卫科', status: '启用', lastLogin: '2025-08-30 14:30', email: 'security001@hospital.com', phone: '13800138001' },
    { id: 3, username: 'nurse001', name: '李护士', role: '医护人员', department: '护理部', status: '启用', lastLogin: '2025-08-30 13:45', email: 'nurse001@hospital.com', phone: '13800138002' },
    { id: 4, username: 'doctor001', name: '王医生', role: '医护人员', department: '急诊科', status: '禁用', lastLogin: '2025-08-30 10:20', email: 'doctor001@hospital.com', phone: '13800138003' },
    { id: 5, username: 'manager001', name: '赵主任', role: '部门主管', department: '行政部', status: '启用', lastLogin: '2025-08-30 12:15', email: 'manager001@hospital.com', phone: '13800138004' },
  ];

  const systemConfig = {
    systemName: '济宁市兖州区人民医院综合安防管理平台',
    version: 'v2.1.0',
    database: 'MySQL 8.0',
    serverIP: '192.168.1.10',
    maxUsers: 100,
    alarmRetention: 90,
    videoRetention: 30,
    autoBackup: true,
    logLevel: 'INFO',
    timezone: 'Asia/Shanghai',
    language: 'zh-CN',
    sessionTimeout: 30,
    passwordPolicy: '强密码策略',
    mfaEnabled: true,
    backupSchedule: '每日凌晨2点',
    emailNotification: true,
    smsNotification: false
  };

  const systemLogs = [
    { id: 1, level: 'INFO', message: '系统启动成功', time: '2025-08-30 15:30:00', user: 'system', module: '系统核心' },
    { id: 2, level: 'WARN', message: '设备192.168.1.103离线', time: '2025-08-30 14:15:30', user: 'system', module: '设备监控' },
    { id: 3, level: 'INFO', message: '用户admin登录成功', time: '2025-08-30 15:00:15', user: 'admin', module: '用户认证' },
    { id: 4, level: 'ERROR', message: '数据库连接超时', time: '2025-08-30 14:45:20', user: 'system', module: '数据库' },
    { id: 5, level: 'INFO', message: '自动备份完成', time: '2025-08-30 02:00:00', user: 'system', module: '备份系统' },
  ];

  const maintenanceTasks = [
    { id: 1, name: '数据库优化', status: '进行中', progress: 65, startTime: '2025-08-30 14:00', estimatedTime: '30分钟' },
    { id: 2, name: '系统更新', status: '等待中', progress: 0, startTime: '2025-08-30 16:00', estimatedTime: '45分钟' },
    { id: 3, name: '设备检测', status: '已完成', progress: 100, startTime: '2025-08-30 13:00', estimatedTime: '20分钟' },
  ];

  // 实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        onlineDevices: Math.floor(Math.random() * 20) + 140,
        activeUsers: Math.floor(Math.random() * 15) + 60,
        systemHealth: Math.floor(Math.random() * 10) + 88
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // ECharts图表配置
  const deviceStatusOption = {
    title: {
      text: '设备状态分布',
      left: 'center',
      textStyle: { fontSize: 14, fontWeight: 'bold' }
    },
    tooltip: { trigger: 'item' },
    series: [{
      name: '设备状态',
      type: 'pie',
      radius: ['40%', '70%'],
      center: ['50%', '50%'],
      data: [
        { value: 142, name: '在线', itemStyle: { color: '#52c41a' } },
        { value: 14, name: '离线', itemStyle: { color: '#f5222d' } }
      ]
    }]
  };

  const userActivityOption = {
    title: {
      text: '用户活跃度趋势',
      left: 'center',
      textStyle: { fontSize: 14, fontWeight: 'bold' }
    },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
    },
    yAxis: { type: 'value', name: '在线用户数' },
    series: [{
      name: '在线用户',
      type: 'line',
      smooth: true,
      data: [12, 8, 25, 45, 67, 52, 35],
      lineStyle: { color: '#1890ff' },
      areaStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(24, 144, 255, 0.3)' },
            { offset: 1, color: 'rgba(24, 144, 255, 0.1)' }
          ]
        }
      }
    }]
  };

  const deviceColumns = [
    { title: '设备名称', dataIndex: 'name', key: 'name', width: 150 },
    { title: '设备类型', dataIndex: 'type', key: 'type', width: 120 },
    { title: '安装位置', dataIndex: 'location', key: 'location', width: 120 },
    { 
      title: '运行状态', 
      dataIndex: 'status', 
      key: 'status', 
      width: 100,
      render: (status: string) => (
        <Badge 
          status={status === '在线' ? 'success' : 'error'} 
          text={status} 
        />
      )
    },
    { title: 'IP地址', dataIndex: 'ip', key: 'ip', width: 120 },
    { title: '版本', dataIndex: 'version', key: 'version', width: 100 },
    { title: '厂商', dataIndex: 'manufacturer', key: 'manufacturer', width: 120 },
    { title: '最后更新', dataIndex: 'lastUpdate', key: 'lastUpdate', width: 150 },
    { 
      title: '操作', 
      key: 'action', 
      width: 150,
      fixed: 'right' as const,
      render: (_: any, record: any) => (
        <Space size="small">
          <Tooltip title="编辑设备">
            <Button type="link" size="small" icon={<EditOutlined />} onClick={() => handleEditDevice(record)} />
          </Tooltip>
          <Tooltip title="设备详情">
            <Button type="link" size="small" icon={<InfoCircleOutlined />} onClick={() => showDeviceDetail(record)} />
          </Tooltip>
          <Popconfirm
            title="确定要删除这个设备吗？"
            description="删除后无法恢复，请谨慎操作"
            onConfirm={() => handleDeleteDevice(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Tooltip title="删除设备">
              <Button type="link" size="small" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      )
    },
  ];

  const userColumns = [
    { title: '用户名', dataIndex: 'username', key: 'username', width: 120 },
    { title: '姓名', dataIndex: 'name', key: 'name', width: 100 },
    { title: '角色', dataIndex: 'role', key: 'role', width: 120 },
    { title: '部门', dataIndex: 'department', key: 'department', width: 120 },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status', 
      width: 80,
      render: (status: string) => (
        <Tag color={status === '启用' ? 'green' : 'red'} icon={status === '启用' ? <CheckCircleOutlined /> : <CloseOutlined />}>
          {status}
        </Tag>
      )
    },
    { title: '邮箱', dataIndex: 'email', key: 'email', width: 180 },
    { title: '电话', dataIndex: 'phone', key: 'phone', width: 120 },
    { title: '最后登录', dataIndex: 'lastLogin', key: 'lastLogin', width: 150 },
    { 
      title: '操作', 
      key: 'action', 
      width: 200,
      fixed: 'right' as const,
      render: (_: any, record: any) => (
        <Space size="small">
          <Tooltip title="编辑用户">
            <Button type="link" size="small" icon={<EditOutlined />} onClick={() => handleEditUser(record)} />
          </Tooltip>
          <Tooltip title="重置密码">
            <Button type="link" size="small" icon={<KeyOutlined />} onClick={() => handleResetPassword(record)} />
          </Tooltip>
          <Tooltip title={record.status === '启用' ? '禁用用户' : '启用用户'}>
            <Button 
              type="link" 
              size="small" 
              icon={record.status === '启用' ? <CloseOutlined /> : <CheckOutlined />}
              onClick={() => handleToggleUserStatus(record)}
            />
          </Tooltip>
        </Space>
      )
    },
  ];

  const logColumns = [
    { title: '时间', dataIndex: 'time', key: 'time', width: 150 },
    { 
      title: '级别', 
      dataIndex: 'level', 
      key: 'level', 
      width: 80,
      render: (level: string) => {
        const color = level === 'ERROR' ? 'red' : level === 'WARN' ? 'orange' : level === 'INFO' ? 'blue' : 'default';
        return <Tag color={color}>{level}</Tag>;
      }
    },
    { title: '消息', dataIndex: 'message', key: 'message', width: 300 },
    { title: '用户', dataIndex: 'user', key: 'user', width: 100 },
    { title: '模块', dataIndex: 'module', key: 'module', width: 120 },
  ];

  // 事件处理函数
  const handleAddDevice = () => {
    setEditingRecord(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditDevice = (record: any) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDeleteDevice = (id: number) => {
    setLoading(true);
    setTimeout(() => {
      message.success('设备删除成功');
      setLoading(false);
    }, 1000);
  };

  const handleAddUser = () => {
    setEditingUser(null);
    userForm.resetFields();
    setIsUserModalVisible(true);
  };

  const handleEditUser = (record: any) => {
    setEditingUser(record);
    userForm.setFieldsValue(record);
    setIsUserModalVisible(true);
  };

  const handleResetPassword = (record: any) => {
    Modal.confirm({
      title: '重置密码确认',
      content: `确定要重置用户 ${record.name} 的密码吗？`,
      onOk: () => {
        message.success('密码重置成功，新密码已发送到用户邮箱');
      }
    });
  };

  const handleToggleUserStatus = (record: any) => {
    const newStatus = record.status === '启用' ? '禁用' : '启用';
    Modal.confirm({
      title: `${newStatus}用户确认`,
      content: `确定要${newStatus}用户 ${record.name} 吗？`,
      onOk: () => {
        message.success(`用户${newStatus}成功`);
      }
    });
  };

  const showDeviceDetail = (record: any) => {
    Modal.info({
      title: '设备详情',
      width: 600,
      content: (
        <Descriptions column={2} bordered>
          <Descriptions.Item label="设备名称">{record.name}</Descriptions.Item>
          <Descriptions.Item label="设备类型">{record.type}</Descriptions.Item>
          <Descriptions.Item label="安装位置">{record.location}</Descriptions.Item>
          <Descriptions.Item label="IP地址">{record.ip}</Descriptions.Item>
          <Descriptions.Item label="运行状态">
            <Tag color={record.status === '在线' ? 'green' : 'red'}>{record.status}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="设备版本">{record.version}</Descriptions.Item>
          <Descriptions.Item label="设备厂商">{record.manufacturer}</Descriptions.Item>
          <Descriptions.Item label="最后更新">{record.lastUpdate}</Descriptions.Item>
        </Descriptions>
      )
    });
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      setLoading(true);
      setTimeout(() => {
        if (editingRecord) {
          message.success('设备更新成功');
        } else {
          message.success('设备添加成功');
        }
        setIsModalVisible(false);
        form.resetFields();
        setLoading(false);
      }, 1000);
    });
  };

  const handleUserModalOk = () => {
    userForm.validateFields().then(values => {
      setLoading(true);
      setTimeout(() => {
        if (editingUser) {
          message.success('用户更新成功');
        } else {
          message.success('用户添加成功');
        }
        setIsUserModalVisible(false);
        userForm.resetFields();
        setLoading(false);
      }, 1000);
    });
  };

  const handleConfigSave = () => {
    configForm.validateFields().then(values => {
      setLoading(true);
      setTimeout(() => {
        message.success('系统配置保存成功');
        setLoading(false);
      }, 1000);
    });
  };

  const handleBackup = () => {
    setLoading(true);
    setTimeout(() => {
      notification.success({
        message: '备份成功',
        description: '系统数据已成功备份到备份服务器',
        placement: 'topRight'
      });
      setLoading(false);
    }, 2000);
  };

  const handleSystemRestart = () => {
    Modal.confirm({
      title: '系统重启确认',
      content: '确定要重启系统吗？重启过程中系统将暂时不可用。',
      okText: '确定重启',
      cancelText: '取消',
      onOk: () => {
        setLoading(true);
        setTimeout(() => {
          message.success('系统重启命令已发送，请等待系统重启完成');
          setLoading(false);
        }, 1000);
      }
    });
  };

  const handleExportData = () => {
    message.success('数据导出成功，文件已保存到下载目录');
  };

  const handleImportData = () => {
    message.info('请选择要导入的数据文件');
  };

  return (
    <div>
      <div className="page-header">
        <h1>系统管理</h1>
        <p>系统配置、设备管理、用户权限等核心功能管理</p>
        <div style={{ marginTop: 16 }}>
          <Space>
            <Button type="primary" icon={<ReloadOutlined />} onClick={() => setStats({...stats})}>
              刷新数据
            </Button>
            <Button icon={<ExportOutlined />} onClick={handleExportData}>
              导出数据
            </Button>
            <Button icon={<ImportOutlined />} onClick={handleImportData}>
              导入数据
            </Button>
            <Button icon={<BarChartOutlined />} onClick={() => setIsLogDrawerVisible(true)}>
              系统日志
            </Button>
          </Space>
        </div>
      </div>

      {/* 统计概览 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card" hoverable>
            <Statistic 
              title="设备总数" 
              value={stats.totalDevices} 
              prefix={<MonitorOutlined />} 
              valueStyle={{ color: '#1890ff' }}
            />
            <div style={{ marginTop: 8 }}>
              <Progress 
                percent={Math.round((stats.onlineDevices / stats.totalDevices) * 100)} 
                strokeColor="#1890ff" 
                showInfo={false} 
                size="small" 
              />
              <div style={{ fontSize: '12px', color: '#666', marginTop: 4 }}>
                在线: {stats.onlineDevices} | 离线: {stats.totalDevices - stats.onlineDevices}
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card" hoverable>
            <Statistic 
              title="用户总数" 
              value={stats.totalUsers} 
              prefix={<UserOutlined />} 
              valueStyle={{ color: '#52c41a' }}
            />
            <div style={{ marginTop: 8 }}>
              <Progress 
                percent={Math.round((stats.activeUsers / stats.totalUsers) * 100)} 
                strokeColor="#52c41a" 
                showInfo={false} 
                size="small" 
              />
              <div style={{ fontSize: '12px', color: '#666', marginTop: 4 }}>
                活跃: {stats.activeUsers} | 离线: {stats.totalUsers - stats.activeUsers}
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card" hoverable>
            <Statistic 
              title="系统健康度" 
              value={stats.systemHealth} 
              suffix="%" 
              prefix={<CheckCircleOutlined />} 
              valueStyle={{ color: stats.systemHealth > 90 ? '#52c41a' : stats.systemHealth > 70 ? '#faad14' : '#f5222d' }}
            />
            <div style={{ marginTop: 8 }}>
              <Progress 
                percent={stats.systemHealth} 
                strokeColor={stats.systemHealth > 90 ? '#52c41a' : stats.systemHealth > 70 ? '#faad14' : '#f5222d'} 
                showInfo={false} 
                size="small" 
              />
              <div style={{ fontSize: '12px', color: '#666', marginTop: 4 }}>
                {stats.systemHealth > 90 ? '优秀' : stats.systemHealth > 70 ? '良好' : '需关注'}
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card" hoverable>
            <Statistic 
              title="最后备份" 
              value={stats.lastBackup} 
              prefix={<CloudOutlined />} 
              valueStyle={{ color: '#722ed1' }}
            />
            <div style={{ marginTop: 8 }}>
              <Button 
                type="primary" 
                size="small" 
                icon={<DownloadOutlined />} 
                onClick={handleBackup}
                loading={loading}
                block
              >
                立即备份
              </Button>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 图表分析 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="设备状态分布" size="small">
            <ReactECharts option={deviceStatusOption} style={{ height: '200px' }} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="用户活跃度趋势" size="small">
            <ReactECharts option={userActivityOption} style={{ height: '200px' }} />
          </Card>
        </Col>
      </Row>

      <Tabs 
        defaultActiveKey="1" 
        size="large" 
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: '1',
            label: <span><MonitorOutlined />设备管理</span>,
            children: (
              <Card>
                <div style={{ marginBottom: 16 }}>
                  <Space>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddDevice}>
                      添加设备
                    </Button>
                    <Button icon={<SyncOutlined />} onClick={() => setStats({...stats})}>
                      同步状态
                    </Button>
                    <Button icon={<BarChartOutlined />}>
                      设备统计
                    </Button>
                  </Space>
                </div>
                <Table
                  columns={deviceColumns}
                  dataSource={deviceData}
                  rowKey="id"
                  pagination={{ 
                    pageSize: 10, 
                    showSizeChanger: true, 
                    showQuickJumper: true,
                    showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
                  }}
                  scroll={{ x: 1200 }}
                  loading={loading}
                />
              </Card>
            )
          },
          {
            key: '2',
            label: <span><UserOutlined />用户管理</span>,
            children: (
              <Card>
                <div style={{ marginBottom: 16 }}>
                  <Space>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
                      添加用户
                    </Button>
                    <Button icon={<TeamOutlined />}>
                      角色管理
                    </Button>
                    <Button icon={<KeyOutlined />}>
                      权限配置
                    </Button>
                  </Space>
                </div>
                <Table
                  columns={userColumns}
                  dataSource={userData}
                  rowKey="id"
                  pagination={{ 
                    pageSize: 10, 
                    showSizeChanger: true, 
                    showQuickJumper: true,
                    showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
                  }}
                  scroll={{ x: 1200 }}
                  loading={loading}
                />
              </Card>
            )
          },
          {
            key: '3',
            label: <span><SettingOutlined />系统配置</span>,
            children: (
              <Card>
                <Form form={configForm} layout="vertical" initialValues={systemConfig}>
                  <Row gutter={[24, 16]}>
                    <Col span={12}>
                      <Form.Item label="系统名称" name="systemName">
                        <Input readOnly />
                      </Form.Item>
                      <Form.Item label="系统版本" name="version">
                        <Input readOnly />
                      </Form.Item>
                      <Form.Item label="数据库类型" name="database">
                        <Input readOnly />
                      </Form.Item>
                      <Form.Item label="服务器IP" name="serverIP">
                        <Input readOnly />
                      </Form.Item>
                      <Form.Item label="时区设置" name="timezone">
                        <Select>
                          <Option value="Asia/Shanghai">Asia/Shanghai (UTC+8)</Option>
                          <Option value="UTC">UTC (UTC+0)</Option>
                          <Option value="America/New_York">America/New_York (UTC-5)</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label="语言设置" name="language">
                        <Select>
                          <Option value="zh-CN">简体中文</Option>
                          <Option value="en-US">English</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="最大用户数" name="maxUsers">
                        <InputNumber style={{ width: '100%' }} min={1} max={1000} />
                      </Form.Item>
                      <Form.Item label="报警保留天数" name="alarmRetention">
                        <InputNumber style={{ width: '100%' }} min={1} max={365} />
                      </Form.Item>
                      <Form.Item label="视频保留天数" name="videoRetention">
                        <InputNumber style={{ width: '100%' }} min={1} max={365} />
                      </Form.Item>
                      <Form.Item label="会话超时(分钟)" name="sessionTimeout">
                        <InputNumber style={{ width: '100%' }} min={5} max={1440} />
                      </Form.Item>
                      <Form.Item label="自动备份" name="autoBackup" valuePropName="checked">
                        <Switch />
                      </Form.Item>
                      <Form.Item label="日志级别" name="logLevel">
                        <Select>
                          <Option value="DEBUG">DEBUG</Option>
                          <Option value="INFO">INFO</Option>
                          <Option value="WARN">WARN</Option>
                          <Option value="ERROR">ERROR</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Divider />
                  <Row gutter={[24, 16]}>
                    <Col span={24}>
                      <Form.Item label="密码策略" name="passwordPolicy">
                        <Select>
                          <Option value="弱密码策略">弱密码策略</Option>
                          <Option value="中等密码策略">中等密码策略</Option>
                          <Option value="强密码策略">强密码策略</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label="多因素认证" name="mfaEnabled" valuePropName="checked">
                        <Switch />
                      </Form.Item>
                      <Form.Item label="备份计划" name="backupSchedule">
                        <Select>
                          <Option value="每日凌晨2点">每日凌晨2点</Option>
                          <Option value="每周日凌晨2点">每周日凌晨2点</Option>
                          <Option value="每月1号凌晨2点">每月1号凌晨2点</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item label="邮件通知" name="emailNotification" valuePropName="checked">
                        <Switch />
                      </Form.Item>
                      <Form.Item label="短信通知" name="smsNotification" valuePropName="checked">
                        <Switch />
                      </Form.Item>
                    </Col>
                  </Row>
                  <div style={{ textAlign: 'center', marginTop: 24 }}>
                    <Space>
                      <Button type="primary" size="large" onClick={handleConfigSave} loading={loading}>
                        保存配置
                      </Button>
                      <Button size="large" onClick={() => configForm.resetFields()}>
                        重置
                      </Button>
                    </Space>
                  </div>
                </Form>
              </Card>
            )
          },
          {
            key: '4',
            label: <span><ToolOutlined />系统维护</span>,
            children: (
              <Card>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Card size="small" title="数据库维护" extra={<DatabaseOutlined />}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Button block icon={<DownloadOutlined />} onClick={handleBackup}>
                          数据备份
                        </Button>
                        <Button block icon={<UploadOutlined />}>
                          数据恢复
                        </Button>
                        <Button block icon={<DeleteOutlined />}>
                          数据清理
                        </Button>
                        <Button block icon={<BarChartOutlined />}>
                          性能分析
                        </Button>
                      </Space>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card size="small" title="系统维护" extra={<SettingOutlined />}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Button block icon={<SyncOutlined />} onClick={handleSystemRestart}>
                          系统重启
                        </Button>
                        <Button block icon={<ReloadOutlined />}>
                          服务重启
                        </Button>
                        <Button block icon={<FileTextOutlined />}>
                          日志清理
                        </Button>
                        <Button block icon={<BarChartOutlined />}>
                          性能监控
                        </Button>
                      </Space>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card size="small" title="监控维护" extra={<MonitorOutlined />}>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Button block icon={<CheckCircleOutlined />}>
                          设备检测
                        </Button>
                        <Button block icon={<BarChartOutlined />}>
                          网络诊断
                        </Button>
                        <Button block icon={<LineChartOutlined />}>
                          性能监控
                        </Button>
                        <Button block icon={<PieChartOutlined />}>
                          状态统计
                        </Button>
                      </Space>
                    </Card>
                  </Col>
                </Row>
                
                <Divider />
                
                <Card title="维护任务" size="small">
                  <Steps current={1} size="small">
                    {maintenanceTasks.map((task, index) => (
                      <Step 
                        key={task.id}
                        title={task.name}
                        description={
                          <div>
                            <div>{task.status}</div>
                            <div style={{ fontSize: '12px', color: '#666' }}>
                              {task.startTime} | 预计: {task.estimatedTime}
                            </div>
                            {task.status === '进行中' && (
                              <Progress percent={task.progress} size="small" showInfo={false} />
                            )}
                          </div>
                        }
                        status={
                          task.status === '已完成' ? 'finish' : 
                          task.status === '进行中' ? 'process' : 'wait'
                        }
                      />
                    ))}
                  </Steps>
                </Card>
              </Card>
            )
          }
        ]}
      />

      {/* 添加/编辑设备模态框 */}
      <Modal
        title={editingRecord ? '编辑设备' : '添加设备'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={700}
        confirmLoading={loading}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="设备名称" rules={[{ required: true, message: '请输入设备名称' }]}>
                <Input placeholder="请输入设备名称" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="type" label="设备类型" rules={[{ required: true, message: '请选择设备类型' }]}>
                <Select placeholder="请选择设备类型">
                  <Option value="门禁系统">门禁系统</Option>
                  <Option value="视频监控">视频监控</Option>
                  <Option value="报警系统">报警系统</Option>
                  <Option value="消防系统">消防系统</Option>
                  <Option value="网络设备">网络设备</Option>
                  <Option value="存储设备">存储设备</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="location" label="安装位置" rules={[{ required: true, message: '请输入安装位置' }]}>
                <Input placeholder="请输入安装位置" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="ip" label="IP地址" rules={[{ required: true, message: '请输入IP地址' }]}>
                <Input placeholder="请输入IP地址" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="version" label="设备版本">
                <Input placeholder="请输入设备版本" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="manufacturer" label="设备厂商">
                <Input placeholder="请输入设备厂商" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="description" label="设备描述">
            <TextArea rows={3} placeholder="请输入设备描述信息" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加/编辑用户模态框 */}
      <Modal
        title={editingUser ? '编辑用户' : '添加用户'}
        open={isUserModalVisible}
        onOk={handleUserModalOk}
        onCancel={() => setIsUserModalVisible(false)}
        width={700}
        confirmLoading={loading}
      >
        <Form form={userForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="username" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
                <Input placeholder="请输入用户名" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
                <Input placeholder="请输入姓名" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="role" label="角色" rules={[{ required: true, message: '请选择角色' }]}>
                <Select placeholder="请选择角色">
                  <Option value="超级管理员">超级管理员</Option>
                  <Option value="系统管理员">系统管理员</Option>
                  <Option value="部门主管">部门主管</Option>
                  <Option value="安保人员">安保人员</Option>
                  <Option value="医护人员">医护人员</Option>
                  <Option value="普通用户">普通用户</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="department" label="部门" rules={[{ required: true, message: '请选择部门' }]}>
                <Select placeholder="请选择部门">
                  <Option value="信息科">信息科</Option>
                  <Option value="保卫科">保卫科</Option>
                  <Option value="护理部">护理部</Option>
                  <Option value="急诊科">急诊科</Option>
                  <Option value="行政部">行政部</Option>
                  <Option value="后勤部">后勤部</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="email" label="邮箱" rules={[{ type: 'email', message: '请输入正确的邮箱格式' }]}>
                <Input placeholder="请输入邮箱" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="电话">
                <Input placeholder="请输入电话" />
              </Form.Item>
            </Col>
          </Row>
          {!editingUser && (
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
                  <Input.Password placeholder="请输入密码" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="confirmPassword" label="确认密码" rules={[{ required: true, message: '请确认密码' }]}>
                  <Input.Password placeholder="请确认密码" />
                </Form.Item>
              </Col>
            </Row>
          )}
        </Form>
      </Modal>

      {/* 系统日志抽屉 */}
      <Drawer
        title="系统日志"
        placement="right"
        width={800}
        open={isLogDrawerVisible}
        onClose={() => setIsLogDrawerVisible(false)}
        extra={
          <Space>
            <Button icon={<ReloadOutlined />}>刷新</Button>
            <Button icon={<DownloadOutlined />}>导出</Button>
          </Space>
        }
      >
        <Table
          columns={logColumns}
          dataSource={systemLogs}
          rowKey="id"
          pagination={{ pageSize: 20 }}
          size="small"
        />
      </Drawer>
    </div>
  );
};

export default SystemManagement;
