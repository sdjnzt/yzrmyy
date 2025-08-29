import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Space, 
  Tag, 
  Modal, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Row, 
  Col, 
  Statistic, 
  Timeline,
  Alert,
  message,
  Popconfirm,
  Tabs,
  List,
  Avatar,
  Progress
} from 'antd';
import {
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  EnvironmentOutlined,
  UserOutlined,
  CalendarOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { TabPane } = Tabs;

const PatrolManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRouteModalVisible, setIsRouteModalVisible] = useState(false);
  const [isPatrolPlanModalVisible, setIsPatrolPlanModalVisible] = useState(false);
  const [isEditRouteModalVisible, setIsEditRouteModalVisible] = useState(false);
  const [isCheckPointsModalVisible, setIsCheckPointsModalVisible] = useState(false);
  const [selectedPatrol, setSelectedPatrol] = useState<{
    id: number;
    routeName: string;
    patrolUser: string;
    startTime: string;
    endTime: string;
    status: string;
    checkPoints: number;
    completedPoints: number;
    duration: string;
    notes: string;
  } | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<{
    id: number;
    name: string;
    description: string;
    checkPoints: string[];
    estimatedTime: number;
    status: string;
  } | null>(null);
  const [editingRoute, setEditingRoute] = useState<{
    id: number;
    name: string;
    description: string;
    checkPoints: string[];
    estimatedTime: number;
    status: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [routeForm] = Form.useForm();
  const [patrolPlanForm] = Form.useForm();
  const [editRouteForm] = Form.useForm();

  // 符合兖州区人民医院的巡更数据
  const patrolData = [
    { 
      id: 1, 
      routeName: '门诊楼日常巡更', 
      patrolUser: '刘建国',
      startTime: '2025-08-30 08:00:00', 
      endTime: '2025-08-30 08:45:00',
      status: '已完成', 
      checkPoints: 8,
      completedPoints: 8,
      duration: '45分钟',
      notes: '各科室正常，未发现异常情况'
    },
    { 
      id: 2, 
      routeName: '药房安全检查', 
      patrolUser: '陈志强',
      startTime: '2025-08-30 10:30:00', 
      endTime: '2025-08-30 10:50:00',
      status: '已完成', 
      checkPoints: 5,
      completedPoints: 5,
      duration: '20分钟',
      notes: '药房门禁正常，温湿度正常'
    },
    { 
      id: 3, 
      routeName: '住院部夜班巡更', 
      patrolUser: '王德明',
      startTime: '2025-08-14 22:00:00', 
      endTime: '2025-08-14 22:30:00',
      status: '已完成', 
      checkPoints: 6,
      completedPoints: 6,
      duration: '30分钟',
      notes: '夜间查房正常，病区安静'
    },
    { 
      id: 4, 
      routeName: '重点区域检查', 
      patrolUser: '孙志刚',
      startTime: '2025-08-30 14:00:00', 
      endTime: '',
      status: '进行中', 
      checkPoints: 7,
      completedPoints: 4,
      duration: '预计35分钟',
      notes: '正在检查急诊科和手术室区域'
    },
    { 
      id: 5, 
      routeName: '下午常规巡更', 
      patrolUser: '李明华',
      startTime: '2025-08-30 16:00:00', 
      endTime: '',
      status: '待开始', 
      checkPoints: 6,
      completedPoints: 0,
      duration: '预计30分钟',
      notes: ''
    },
    {
      id: 6,
      routeName: '手术室专项检查',
      patrolUser: '张伟民',
      startTime: '2025-08-30 07:30:00',
      endTime: '2025-08-30 08:00:00',
      status: '已完成',
      checkPoints: 4,
      completedPoints: 4,
      duration: '30分钟',
      notes: '手术室区域清洁完毕，设备运行正常'
    },
    {
      id: 7,
      routeName: 'ICU重点监控',
      patrolUser: '王建军',
      startTime: '2025-08-14 20:00:00',
      endTime: '2025-08-14 20:20:00',
      status: '已完成',
      checkPoints: 3,
      completedPoints: 3,
      duration: '20分钟',
      notes: 'ICU病房安全，监控设备正常'
    },
    {
      id: 8,
      routeName: '后勤区域检查',
      patrolUser: '赵国强',
      startTime: '2025-08-14 18:30:00',
      endTime: '2025-08-14 19:00:00',
      status: '已完成',
      checkPoints: 7,
      completedPoints: 7,
      duration: '30分钟',
      notes: '配电房、锅炉房、水泵房等后勤设施正常'
    },
    {
      id: 9,
      routeName: '停车场安全巡查',
      patrolUser: '孙建华',
      startTime: '2025-08-14 15:45:00',
      endTime: '2025-08-14 16:15:00',
      status: '已完成',
      checkPoints: 5,
      completedPoints: 5,
      duration: '30分钟',
      notes: '停车场秩序良好，车辆停放规范'
    },
    {
      id: 10,
      routeName: '门诊楼夜间检查',
      patrolUser: '李志强',
      startTime: '2025-08-13 23:00:00',
      endTime: '2025-08-13 23:35:00',
      status: '已完成',
      checkPoints: 8,
      completedPoints: 8,
      duration: '35分钟',
      notes: '门诊楼各科室已关闭，安全设施正常'
    },
    {
      id: 11,
      routeName: '医技楼设备检查',
      patrolUser: '张建国',
      startTime: '2025-08-13 14:30:00',
      endTime: '2025-08-13 15:00:00',
      status: '已完成',
      checkPoints: 6,
      completedPoints: 6,
      duration: '30分钟',
      notes: '放射科、检验科、B超室等设备运行正常'
    },
    {
      id: 12,
      routeName: '食堂安全检查',
      patrolUser: '王德明',
      startTime: '2025-08-13 12:00:00',
      endTime: '2025-08-13 12:20:00',
      status: '已完成',
      checkPoints: 4,
      completedPoints: 4,
      duration: '20分钟',
      notes: '食堂用火用电安全，食品储存规范'
    },
    {
      id: 13,
      routeName: '周界围墙检查',
      patrolUser: '赵国强',
      startTime: '2025-08-12 21:30:00',
      endTime: '2025-08-12 22:15:00',
      status: '已完成',
      checkPoints: 10,
      completedPoints: 10,
      duration: '45分钟',
      notes: '医院周界完整，监控覆盖正常'
    },
    {
      id: 14,
      routeName: '早班交接巡查',
      patrolUser: '孙建华',
      startTime: '2025-08-12 07:00:00',
      endTime: '2025-08-12 07:30:00',
      status: '已完成',
      checkPoints: 6,
      completedPoints: 6,
      duration: '30分钟',
      notes: '夜班期间无异常，各区域准备就绪'
    },
    {
      id: 15,
      routeName: '特殊科室检查',
      patrolUser: '李明华',
      startTime: '2025-08-11 19:15:00',
      endTime: '2025-08-11 19:45:00',
      status: '已完成',
      checkPoints: 5,
      completedPoints: 5,
      duration: '30分钟',
      notes: '血库、病理科、感染科等特殊区域安全'
    }
  ];

  // 符合兖州区人民医院规模的巡更路线
  const patrolRoutes = [
    {
      id: 1,
      name: '门诊楼日常巡更',
      description: '门诊楼各科室、大厅、收费处等常规检查',
      checkPoints: ['门诊大厅', '挂号收费处', '内科诊室', '外科诊室', '妇产科', '儿科', '急诊科', '药房外围'],
      estimatedTime: 45,
      status: '启用'
    },
    {
      id: 2,
      name: '药房安全检查',
      description: '药房及药品储存区域安全检查',
      checkPoints: ['药房入口', '中药房', '西药房', '冷藏区', '药库'],
      estimatedTime: 20,
      status: '启用'
    },
    {
      id: 3,
      name: '住院部夜班巡更',
      description: '住院部病区夜间安全巡查',
      checkPoints: ['住院部大厅', '内科病区', '外科病区', '妇产科病区', '护士站', '安全出口'],
      estimatedTime: 30,
      status: '启用'
    },
    {
      id: 4,
      name: '重点区域检查',
      description: '手术室、ICU、急诊等重点区域检查',
      checkPoints: ['手术室外围', 'ICU门口', '急诊抢救室', '血库', '检验科', '放射科', '配电房'],
      estimatedTime: 35,
      status: '启用'
    },
    {
      id: 5,
      name: '手术室专项检查',
      description: '手术室区域专项安全检查',
      checkPoints: ['手术室大厅', '洁净走廊', '器械室', '麻醉科'],
      estimatedTime: 30,
      status: '启用'
    },
    {
      id: 6,
      name: 'ICU重点监控',
      description: 'ICU病房重点安全监控',
      checkPoints: ['ICU入口', 'ICU病房', '家属等候区'],
      estimatedTime: 20,
      status: '启用'
    },
    {
      id: 7,
      name: '后勤区域检查',
      description: '医院后勤设施安全检查',
      checkPoints: ['配电房', '锅炉房', '水泵房', '医疗气体站', '垃圾处理站', '洗衣房', '维修间'],
      estimatedTime: 30,
      status: '启用'
    },
    {
      id: 8,
      name: '停车场安全巡查',
      description: '医院停车场及周边安全巡查',
      checkPoints: ['地面停车场', '地下车库', '车辆出入口', '收费岗亭', '监控室'],
      estimatedTime: 30,
      status: '启用'
    },
    {
      id: 9,
      name: '医技楼设备检查',
      description: '医技楼各科室设备安全检查',
      checkPoints: ['放射科', '检验科', 'B超室', '心电图室', '内镜中心', '病理科'],
      estimatedTime: 30,
      status: '启用'
    },
    {
      id: 10,
      name: '食堂安全检查',
      description: '医院食堂及餐饮区域安全检查',
      checkPoints: ['厨房操作间', '食品仓库', '就餐区', '洗消间'],
      estimatedTime: 20,
      status: '启用'
    },
    {
      id: 11,
      name: '周界围墙检查',
      description: '医院周界及围墙完整性检查',
      checkPoints: ['正门周界', '东侧围墙', '南侧围墙', '西侧围墙', '北侧围墙', '后门周界', '绿化带', '监控盲区', '应急通道', '施工区域'],
      estimatedTime: 45,
      status: '启用'
    },
    {
      id: 12,
      name: '特殊科室检查',
      description: '特殊医疗科室安全检查',
      checkPoints: ['血库', '病理科', '感染科', '核医学科', '放疗科'],
      estimatedTime: 30,
      status: '启用'
    },
    {
      id: 13,
      name: '夜间全院巡查',
      description: '夜间全院重点区域巡查',
      checkPoints: ['主要出入口', '各楼层护士站', '电梯间', '楼梯间', '安全出口', '消防设施', '应急设备', '值班室'],
      estimatedTime: 60,
      status: '启用'
    }
  ];

  // 统计数据
  const patrolStats = {
    total: patrolData.length,
    completed: patrolData.filter(p => p.status === '已完成').length,
    inProgress: patrolData.filter(p => p.status === '进行中').length,
    pending: patrolData.filter(p => p.status === '待开始').length,
    todayTotal: 5,
    completionRate: 92
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已完成': return '#52c41a';
      case '进行中': return '#1890ff';
      case '待开始': return '#faad14';
      case '异常': return '#f5222d';
      default: return '#d9d9d9';
    }
  };

  const columns = [
    { 
      title: '巡更路线', 
      dataIndex: 'routeName', 
      key: 'routeName',
      render: (name: string) => (
        <Space>
          <EnvironmentOutlined style={{ color: '#1890ff' }} />
          {name}
        </Space>
      )
    },
    { 
      title: '巡更人员', 
      dataIndex: 'patrolUser', 
      key: 'patrolUser',
      render: (user: string) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          {user}
        </Space>
      )
    },
    { title: '开始时间', dataIndex: 'startTime', key: 'startTime' },
    { title: '结束时间', dataIndex: 'endTime', key: 'endTime' },
    { 
      title: '巡更状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      )
    },
    { 
      title: '检查点进度', 
      key: 'progress',
      render: (_: any, record: any) => (
        <div>
          <div>{record.completedPoints}/{record.checkPoints}</div>
          <Progress 
            percent={Math.round((record.completedPoints / record.checkPoints) * 100)} 
            size="small"
            strokeColor={record.status === '已完成' ? '#52c41a' : '#1890ff'}
          />
        </div>
      )
    },
    { title: '用时', dataIndex: 'duration', key: 'duration' },
    { 
      title: '操作', 
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button 
            type="link" 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => showDetail(record)}
          >
            详情
          </Button>
          {record.status === '进行中' && (
            <Button 
              type="link" 
              icon={<PauseCircleOutlined />} 
              size="small"
              onClick={() => handlePause(record)}
              loading={loading}
            >
              暂停
            </Button>
          )}
          {record.status === '待开始' && (
            <Button 
              type="link" 
              icon={<PlayCircleOutlined />} 
              size="small"
              onClick={() => handleStart(record)}
              loading={loading}
            >
              开始
            </Button>
          )}
        </Space>
      )
    },
  ];

  const routeColumns = [
    { title: '路线名称', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    { 
      title: '检查点数量', 
      dataIndex: 'checkPoints', 
      key: 'checkPoints',
      render: (points: string[]) => points.length
    },
    { title: '预计用时(分钟)', dataIndex: 'estimatedTime', key: 'estimatedTime' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '启用' ? '#52c41a' : '#d9d9d9'}>{status}</Tag>
      )
    },
    { 
      title: '操作', 
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" icon={<EditOutlined />} size="small" onClick={() => handleEditRoute(record)}>
            编辑
          </Button>
          <Button type="link" icon={<EyeOutlined />} size="small" onClick={() => handleViewCheckPoints(record)}>
            查看检查点
          </Button>
          <Popconfirm
            title="确定要删除这条巡更路线吗？"
            onConfirm={() => handleDeleteRoute(record.id)}
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

  const showDetail = (record: any) => {
    setSelectedPatrol(record);
    setIsModalVisible(true);
  };

  const handleAddRoute = () => {
    setIsRouteModalVisible(true);
  };

  // 巡更计划相关函数
  const handleAddPatrolPlan = () => {
    patrolPlanForm.resetFields();
    setIsPatrolPlanModalVisible(true);
  };

  // 巡更路线管理相关函数
  const handleEditRoute = (record: any) => {
    setEditingRoute(record);
    editRouteForm.setFieldsValue({
      name: record.name,
      description: record.description,
      estimatedTime: record.estimatedTime,
      checkPoints: record.checkPoints.join('\n')
    });
    setIsEditRouteModalVisible(true);
  };

  const handleViewCheckPoints = (record: any) => {
    setSelectedRoute(record);
    setIsCheckPointsModalVisible(true);
  };

  const handleDeleteRoute = (id: number) => {
    setLoading(true);
    setTimeout(() => {
      message.success('巡更路线删除成功');
      setLoading(false);
    }, 1000);
  };

  // 巡更控制相关函数
  const handleStart = (record: any) => {
    setLoading(true);
    setTimeout(() => {
      message.success(`开始巡更: ${record.routeName}`);
      setLoading(false);
    }, 1000);
  };

  const handlePause = (record: any) => {
    setLoading(true);
    setTimeout(() => {
      message.success(`暂停巡更: ${record.routeName}`);
      setLoading(false);
    }, 1000);
  };

  // 模态框相关函数
  const handlePatrolPlanModalOk = () => {
    patrolPlanForm.validateFields().then(values => {
      setLoading(true);
      setTimeout(() => {
        message.success('巡更计划创建成功');
        setIsPatrolPlanModalVisible(false);
        patrolPlanForm.resetFields();
        setLoading(false);
      }, 1000);
    });
  };

  const handlePatrolPlanModalCancel = () => {
    setIsPatrolPlanModalVisible(false);
    patrolPlanForm.resetFields();
  };

  const handleEditRouteModalOk = () => {
    editRouteForm.validateFields().then(values => {
      setLoading(true);
      setTimeout(() => {
        message.success('巡更路线更新成功');
        setIsEditRouteModalVisible(false);
        editRouteForm.resetFields();
        setLoading(false);
      }, 1000);
    });
  };

  const handleEditRouteModalCancel = () => {
    setIsEditRouteModalVisible(false);
    editRouteForm.resetFields();
  };

  const handleRouteModalOk = () => {
    routeForm.validateFields().then(values => {
      setLoading(true);
      setTimeout(() => {
        message.success('巡更路线添加成功');
        setIsRouteModalVisible(false);
        routeForm.resetFields();
        setLoading(false);
      }, 1000);
    });
  };

  const handleRouteModalCancel = () => {
    setIsRouteModalVisible(false);
    routeForm.resetFields();
  };

  return (
    <div>
      <div className="page-header">
        <h1>巡更管理</h1>
        <p>巡更计划、巡更监控、巡更记录等巡更管理功能</p>
      </div>

      {/* 巡更统计 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="今日巡更"
              value={patrolStats.todayTotal}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="已完成"
              value={patrolStats.completed}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="进行中"
              value={patrolStats.inProgress}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="完成率"
              value={patrolStats.completionRate}
              suffix="%"
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="records">
        <TabPane tab="巡更记录" key="records">
          {/* 巡更记录列表 */}
          <Card 
            title="巡更记录" 
            extra={
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddPatrolPlan}>
                  新建巡更计划
                </Button>
              </Space>
            }
          >
            <Table
              columns={columns}
              dataSource={patrolData}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              size="small"
            />
          </Card>
        </TabPane>

        <TabPane tab="巡更路线" key="routes">
          {/* 巡更路线管理 */}
          <Card 
            title="巡更路线管理" 
            extra={
                        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddRoute} loading={loading}>
            添加路线
          </Button>
            }
          >
            <Table
              columns={routeColumns}
              dataSource={patrolRoutes}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              size="small"
            />
          </Card>
        </TabPane>

        <TabPane tab="实时监控" key="monitor">
          {/* 实时巡更监控 */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="当前巡更状态" size="small">
                <List
                  dataSource={patrolData.filter(p => p.status === '进行中')}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={item.routeName}
                        description={
                          <div>
                            <div>巡更人员: {item.patrolUser}</div>
                            <div>进度: {item.completedPoints}/{item.checkPoints}</div>
                            <div>开始时间: {item.startTime}</div>
                          </div>
                        }
                      />
                      <Tag color={getStatusColor(item.status)}>{item.status}</Tag>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="巡更时间线" size="small">
                <Timeline>
                  {patrolData.slice(0, 5).map(patrol => (
                    <Timeline.Item 
                      key={patrol.id}
                      color={getStatusColor(patrol.status)}
                      dot={patrol.status === '进行中' ? <ClockCircleOutlined /> : undefined}
                    >
                      <div style={{ fontSize: '12px' }}>
                        <div style={{ fontWeight: 'bold' }}>{patrol.routeName}</div>
                        <div style={{ color: '#666' }}>{patrol.patrolUser} - {patrol.startTime}</div>
                        {patrol.notes && <div style={{ color: '#999' }}>{patrol.notes}</div>}
                      </div>
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* 巡更详情模态框 */}
      <Modal
        title="巡更详情"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedPatrol && (
          <div>
            <Row gutter={16}>
              <Col span={12}>
                <p><strong>巡更路线:</strong> {selectedPatrol.routeName}</p>
                <p><strong>巡更人员:</strong> {selectedPatrol.patrolUser}</p>
                <p><strong>开始时间:</strong> {selectedPatrol.startTime}</p>
                <p><strong>结束时间:</strong> {selectedPatrol.endTime || '进行中'}</p>
              </Col>
              <Col span={12}>
                <p><strong>巡更状态:</strong> <Tag color={getStatusColor(selectedPatrol.status)}>{selectedPatrol.status}</Tag></p>
                <p><strong>检查点进度:</strong> {selectedPatrol.completedPoints}/{selectedPatrol.checkPoints}</p>
                <p><strong>用时:</strong> {selectedPatrol.duration}</p>
              </Col>
            </Row>
            {selectedPatrol.notes && (
              <div>
                <p><strong>巡更备注:</strong></p>
                <Alert message={selectedPatrol.notes} type="info" />
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* 添加路线模态框 */}
      <Modal
        title="添加巡更路线"
        open={isRouteModalVisible}
        onOk={handleRouteModalOk}
        onCancel={handleRouteModalCancel}
        confirmLoading={loading}
        width={600}
      >
        <Form form={routeForm} layout="vertical">
          <Form.Item name="name" label="路线名称" rules={[{ required: true, message: '请输入路线名称' }]}>
            <Input placeholder="请输入巡更路线名称" />
          </Form.Item>
          <Form.Item name="description" label="路线描述">
            <TextArea rows={3} placeholder="请描述巡更路线的主要区域和目的" />
          </Form.Item>
          <Form.Item name="estimatedTime" label="预计用时(分钟)" rules={[{ required: true, message: '请输入预计用时' }]}>
            <Input type="number" placeholder="预计完成该路线所需时间" />
          </Form.Item>
          <Form.Item name="checkPoints" label="检查点" rules={[{ required: true, message: '请输入检查点' }]}>
            <TextArea rows={4} placeholder="请输入检查点列表，每行一个检查点" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 新建巡更计划模态框 */}
      <Modal
        title="新建巡更计划"
        open={isPatrolPlanModalVisible}
        onOk={handlePatrolPlanModalOk}
        onCancel={handlePatrolPlanModalCancel}
        confirmLoading={loading}
        width={700}
      >
        <Form form={patrolPlanForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="routeName" label="巡更路线" rules={[{ required: true, message: '请选择巡更路线' }]}>
                <Select placeholder="请选择巡更路线">
                  {patrolRoutes.map(route => (
                    <Option key={route.id} value={route.name}>{route.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="patrolUser" label="巡更人员" rules={[{ required: true, message: '请选择巡更人员' }]}>
                <Select placeholder="请选择巡更人员">
                  <Option value="刘建国">刘建国</Option>
                  <Option value="陈志强">陈志强</Option>
                  <Option value="王德明">王德明</Option>
                  <Option value="孙志刚">孙志刚</Option>
                  <Option value="李明华">李明华</Option>
                  <Option value="张伟民">张伟民</Option>
                  <Option value="王建军">王建军</Option>
                  <Option value="赵国强">赵国强</Option>
                  <Option value="孙建华">孙建华</Option>
                  <Option value="李志强">李志强</Option>
                  <Option value="张建国">张建国</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="startTime" label="计划开始时间" rules={[{ required: true, message: '请选择开始时间' }]}>
                <DatePicker showTime style={{ width: '100%' }} placeholder="请选择开始时间" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="priority" label="优先级" rules={[{ required: true, message: '请选择优先级' }]}>
                <Select placeholder="请选择优先级">
                  <Option value="high">高</Option>
                  <Option value="medium">中</Option>
                  <Option value="low">低</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="notes" label="备注">
            <TextArea rows={3} placeholder="请输入巡更计划备注信息" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 编辑巡更路线模态框 */}
      <Modal
        title="编辑巡更路线"
        open={isEditRouteModalVisible}
        onOk={handleEditRouteModalOk}
        onCancel={handleEditRouteModalCancel}
        confirmLoading={loading}
        width={600}
      >
        <Form form={editRouteForm} layout="vertical">
          <Form.Item name="name" label="路线名称" rules={[{ required: true, message: '请输入路线名称' }]}>
            <Input placeholder="请输入巡更路线名称" />
          </Form.Item>
          <Form.Item name="description" label="路线描述">
            <TextArea rows={3} placeholder="请描述巡更路线的主要区域和目的" />
          </Form.Item>
          <Form.Item name="estimatedTime" label="预计用时(分钟)" rules={[{ required: true, message: '请输入预计用时' }]}>
            <Input type="number" placeholder="预计完成该路线所需时间" />
          </Form.Item>
          <Form.Item name="checkPoints" label="检查点" rules={[{ required: true, message: '请输入检查点' }]}>
            <TextArea rows={4} placeholder="请输入检查点列表，每行一个检查点" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 查看检查点模态框 */}
      <Modal
        title="检查点详情"
        open={isCheckPointsModalVisible}
        onCancel={() => setIsCheckPointsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsCheckPointsModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={600}
      >
        {selectedRoute && (
          <div>
            <h4>{selectedRoute.name}</h4>
            <p style={{ color: '#666', marginBottom: 16 }}>{selectedRoute.description}</p>
            <div>
              <strong>检查点列表:</strong>
              <List
                size="small"
                dataSource={selectedRoute.checkPoints}
                renderItem={(point: string, index: number) => (
                  <List.Item>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Tag color="blue">{index + 1}</Tag>
                      <span>{point}</span>
                    </div>
                  </List.Item>
                )}
              />
            </div>
            <div style={{ marginTop: 16 }}>
              <strong>预计用时:</strong> {selectedRoute.estimatedTime} 分钟
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PatrolManagement;
