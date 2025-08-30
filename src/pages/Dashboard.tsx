import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Progress, Alert, Space, Button, Badge, Timeline, Tag, Avatar, List, Tooltip } from 'antd';
import ReactECharts from 'echarts-for-react';
import {
  VideoCameraOutlined,
  AlertOutlined,
  SafetyOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  MonitorOutlined,
  FireOutlined,
  ReloadOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  SettingOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  RadarChartOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const Dashboard: React.FC = () => {
  const [realTimeData, setRealTimeData] = useState({
    cameraOnline: 156,
    alarmCount: 8,
    securityOnline: 24,
    userOnline: 45
  });

  // 实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        cameraOnline: Math.floor(Math.random() * 20) + 150,
        alarmCount: Math.floor(Math.random() * 5) + 5,
        securityOnline: Math.floor(Math.random() * 10) + 20,
        userOnline: Math.floor(Math.random() * 20) + 35
      }));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // 模拟数据
  const systemStatus = [
    { name: '视频监控系统', status: 'normal', progress: 95, icon: <VideoCameraOutlined />, color: '#1890ff' },
    { name: '报警系统', status: 'normal', progress: 88, icon: <AlertOutlined />, color: '#faad14' },
    { name: '门禁系统', status: 'warning', progress: 72, icon: <SafetyOutlined />, color: '#fa8c16' },
    { name: '消防系统', status: 'normal', progress: 96, icon: <FireOutlined />, color: '#f5222d' },
    { name: '网络系统', status: 'normal', progress: 91, icon: <MonitorOutlined />, color: '#52c41a' },
  ];

  const recentAlarms = [
    { id: 1, type: '门禁异常', location: '门诊楼1层', time: '2025-08-29 14:30', status: '已处理', level: 'medium' },
    { id: 2, type: '视频丢失', location: '住院部3层', time: '2025-08-29 13:45', status: '处理中', level: 'high' },
    { id: 3, type: '人员聚集', location: '急诊科', time: '2025-08-29 12:20', status: '已处理', level: 'low' },
    { id: 4, type: '设备离线', location: '药房', time: '2025-08-29 11:15', status: '待处理', level: 'high' },
    { id: 5, type: '异常访问', location: '行政楼', time: '2025-08-29 10:30', status: '已处理', level: 'medium' },
  ];

  const securityPatrols = [
    { id: 1, guard: '王磊', route: '门诊楼→住院部→急诊科', status: '巡逻中', time: '14:25', progress: 65 },
    { id: 2, guard: '李玉', route: '药房→行政楼→停车场', status: '巡逻中', time: '14:20', progress: 45 },
    { id: 3, guard: '苏黎世', route: '食堂→宿舍楼→门诊楼', status: '已完成', time: '14:00', progress: 100 },
  ];

  const systemAnnouncements = [
    { id: 1, title: '系统维护通知', content: '系统将于今晚22:00-24:00进行例行维护，期间部分功能可能受到影响。', type: 'info', time: '2小时前' },
    { id: 2, title: '安全提醒', content: '请及时更新密码，确保账户安全。建议每90天更换一次密码。', type: 'warning', time: '4小时前' },
    { id: 3, title: '新功能上线', content: '视频智能分析功能已上线，支持人员聚集检测和异常行为识别。', type: 'success', time: '1天前' },
  ];

  const columns = [
    { 
      title: '报警类型', 
      dataIndex: 'type', 
      key: 'type',
      render: (type: string, record: any) => (
        <Space>
          <Badge status={record.level === 'high' ? 'error' : record.level === 'medium' ? 'warning' : 'default'} />
          {type}
        </Space>
      )
    },
    { title: '发生位置', dataIndex: 'location', key: 'location' },
    { title: '发生时间', dataIndex: 'time', key: 'time' },
    { 
      title: '处理状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => {
        const color = status === '已处理' ? 'green' : status === '处理中' ? 'blue' : 'red';
        return <Tag color={color}>{status}</Tag>;
      }
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return '#52c41a';
      case 'warning': return '#faad14';
      case 'error': return '#f5222d';
      default: return '#d9d9d9';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'normal': return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'warning': return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
      case 'error': return <ExclamationCircleOutlined style={{ color: '#f5222d' }} />;
      default: return null;
    }
  };

  // ECharts图表配置
  const alarmTrendOption = {
    title: {
      text: '报警趋势分析',
      left: 'center',
      textStyle: {
        fontSize: 14,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
    },
    yAxis: {
      type: 'value',
      name: '报警数量'
    },
    series: [
      {
        name: '报警数量',
        type: 'line',
        smooth: true,
        data: [2, 1, 3, 8, 12, 15, 8],
        lineStyle: { color: '#f5222d' },
        itemStyle: { color: '#f5222d' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(245, 34, 45, 0.3)' },
              { offset: 1, color: 'rgba(245, 34, 45, 0.1)' }
            ]
          }
        }
      }
    ]
  };

  const systemHealthOption = {
    title: {
      text: '系统健康度',
      left: 'center',
      textStyle: {
        fontSize: 14,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}%'
    },
    series: [
      {
        name: '系统状态',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '50%'],
        data: [
          { value: 75, name: '优秀', itemStyle: { color: '#52c41a' } },
          { value: 20, name: '良好', itemStyle: { color: '#1890ff' } },
          { value: 5, name: '需关注', itemStyle: { color: '#faad14' } }
        ]
      }
    ]
  };

  const resourceUsageOption = {
    title: {
      text: '资源使用率',
      left: 'center',
      textStyle: {
        fontSize: 14,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['CPU', '内存', '存储', '网络']
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [
      {
        name: '使用率',
        type: 'bar',
        data: [
          { value: 35, itemStyle: { color: '#1890ff' } },
          { value: 68, itemStyle: { color: '#722ed1' } },
          { value: 52, itemStyle: { color: '#faad14' } },
          { value: 45, itemStyle: { color: '#52c41a' } }
        ]
      }
    ]
  };

  const handleRefresh = () => {
    // 刷新数据逻辑
    console.log('刷新数据');
  };

  return (
    <div>
      <div className="page-header">
        <h1>系统概览</h1>
        <p>济宁市兖州区人民医院综合安防管理平台实时状态监控</p>
        <div style={{ marginTop: 16 }}>
          <Space>
            <Button type="primary" icon={<ReloadOutlined />} onClick={handleRefresh}>
              刷新数据
            </Button>
            <Button icon={<SettingOutlined />}>
              系统设置
            </Button>
            <Button icon={<BarChartOutlined />}>
              详细报表
            </Button>
          </Space>
        </div>
      </div>

      {/* 统计卡片 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card" hoverable>
            <Statistic
              title="在线摄像头"
              value={realTimeData.cameraOnline}
              prefix={<VideoCameraOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <div className="statistics-label">总数: 180 | 在线率: {Math.round((realTimeData.cameraOnline / 180) * 100)}%</div>
            <Progress 
              percent={(realTimeData.cameraOnline / 180) * 100} 
              strokeColor="#1890ff"
              showInfo={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card" hoverable>
            <Statistic
              title="今日报警"
              value={realTimeData.alarmCount}
              prefix={<AlertOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
            <div className="statistics-label">已处理: 6 | 处理率: 75%</div>
            <Progress 
              percent={75} 
              strokeColor="#faad14"
              showInfo={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card" hoverable>
            <Statistic
              title="在线安保人员"
              value={realTimeData.securityOnline}
              prefix={<SafetyOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <div className="statistics-label">总数: 30 | 出勤率: {Math.round((realTimeData.securityOnline / 30) * 100)}%</div>
            <Progress 
              percent={(realTimeData.securityOnline / 30) * 100} 
              strokeColor="#52c41a"
              showInfo={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card" hoverable>
            <Statistic
              title="在线用户"
              value={realTimeData.userOnline}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
            <div className="statistics-label">活跃用户 | 峰值: 68</div>
            <Progress 
              percent={(realTimeData.userOnline / 68) * 100} 
              strokeColor="#722ed1"
              showInfo={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* 图表区域 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={8}>
          <Card title="报警趋势分析" size="small">
            <ReactECharts option={alarmTrendOption} style={{ height: '200px' }} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="系统健康度" size="small">
            <ReactECharts option={systemHealthOption} style={{ height: '200px' }} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="资源使用率" size="small">
            <ReactECharts option={resourceUsageOption} style={{ height: '200px' }} />
          </Card>
        </Col>
      </Row>

      {/* 系统状态 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="系统运行状态" size="small">
            {systemStatus.map((item, index) => (
              <div key={index} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Space>
                    <span style={{ color: item.color }}>{item.icon}</span>
                    <span>{item.name}</span>
                  </Space>
                  <span>{item.progress}%</span>
                </div>
                <Progress
                  percent={item.progress}
                  strokeColor={getStatusColor(item.status)}
                  size="small"
                  showInfo={false}
                />
              </div>
            ))}
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="安保巡逻状态" size="small">
            {securityPatrols.map((patrol, index) => (
              <div key={index} style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <Space>
                    <Avatar size="small" icon={<TeamOutlined />} />
                    <span>{patrol.guard}</span>
                    <Tag color={patrol.status === '巡逻中' ? 'blue' : 'green'}>{patrol.status}</Tag>
                  </Space>
                  <span>{patrol.time}</span>
                </div>
                <div style={{ marginBottom: 8, fontSize: '12px', color: '#666' }}>
                  {patrol.route}
                </div>
                <Progress
                  percent={patrol.progress}
                  strokeColor={patrol.progress === 100 ? '#52c41a' : '#1890ff'}
                  size="small"
                  showInfo={false}
                />
              </div>
            ))}
          </Card>
        </Col>
      </Row>

      {/* 最新报警和公告 */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="最新报警记录" size="small" extra={<Button type="link" size="small">查看全部</Button>}>
            <Table
              columns={columns}
              dataSource={recentAlarms}
              pagination={false}
              size="small"
              rowKey="id"
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="系统公告" size="small" extra={<Button type="link" size="small">更多</Button>}>
            <List
              dataSource={systemAnnouncements}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        icon={
                          item.type === 'info' ? <InfoCircleOutlined /> :
                          item.type === 'warning' ? <ExclamationCircleOutlined /> :
                          <CheckCircleOutlined />
                        }
                        style={{ 
                          backgroundColor: 
                            item.type === 'info' ? '#1890ff' :
                            item.type === 'warning' ? '#faad14' :
                            '#52c41a'
                        }}
                      />
                    }
                    title={
                      <Space>
                        <span>{item.title}</span>
                        <Tag color={item.type === 'info' ? 'blue' : item.type === 'warning' ? 'orange' : 'green'}>
                          {item.type === 'info' ? '通知' : item.type === 'warning' ? '提醒' : '更新'}
                        </Tag>
                      </Space>
                    }
                    description={
                      <div>
                        <div style={{ marginBottom: 4 }}>{item.content}</div>
                        <div style={{ fontSize: '12px', color: '#999' }}>{item.time}</div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>


    </div>
  );
};

export default Dashboard;
