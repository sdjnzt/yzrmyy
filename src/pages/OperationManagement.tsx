import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
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
  Progress,
  Alert,
  message,
  Timeline,
  Descriptions,
  Switch,
  InputNumber,
  Divider,
  List,
  Badge,
  Tooltip,
  Popconfirm,
  notification
} from 'antd';
import {
  ToolOutlined,
  MonitorOutlined,
  FileTextOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
  ReloadOutlined,
  SettingOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  BarChartOutlined,
  DatabaseOutlined,
  CloudServerOutlined,
  ClusterOutlined,
  SafetyOutlined,
  ExportOutlined,
  FilterOutlined,
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const OperationManagement: React.FC = () => {
  const [isBackupModalVisible, setIsBackupModalVisible] = useState(false);
  const [isLogModalVisible, setIsLogModalVisible] = useState(false);
  const [isPerformanceModalVisible, setIsPerformanceModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [realTimeData, setRealTimeData] = useState({
    cpu: 35,
    memory: 68,
    disk: 52,
    network: 28
  });

  // 实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        cpu: Math.floor(Math.random() * 40) + 20,
        memory: Math.floor(Math.random() * 30) + 50,
        disk: Math.floor(Math.random() * 20) + 40,
        network: Math.floor(Math.random() * 20) + 20
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 模拟系统性能数据将在下面定义

  // 模拟系统日志数据
  const systemLogs = [
    { 
      id: 1, 
      level: 'INFO', 
      module: '系统启动', 
      message: '系统启动成功，所有服务正常运行', 
      time: '2025-08-30 08:00:00', 
      user: 'system',
      ip: '127.0.0.1'
    },
    { 
      id: 2, 
      level: 'WARNING', 
      module: '数据库连接', 
      message: '数据库连接池使用率超过80%', 
      time: '2025-08-30 10:30:00', 
      user: 'system',
      ip: '127.0.0.1'
    },
    { 
      id: 3, 
      level: 'ERROR', 
      module: '视频服务', 
      message: '摄像头001连接超时，尝试重新连接', 
      time: '2025-08-30 12:15:00', 
      user: 'system',
      ip: '127.0.0.1'
    },
    { 
      id: 4, 
      level: 'INFO', 
      module: '用户登录', 
      message: '用户admin登录系统', 
      time: '2025-08-30 15:00:00', 
      user: 'admin',
      ip: '192.168.1.100'
    },
    { 
      id: 5, 
      level: 'INFO', 
      module: '备份任务', 
      message: '系统自动备份任务完成', 
      time: '2025-08-30 16:00:00', 
      user: 'system',
      ip: '127.0.0.1'
    },
  ];

  // 模拟备份记录数据
  const backupRecords = [
    { 
      id: 1, 
      type: '自动备份', 
      description: '每日系统自动备份', 
      startTime: '2025-08-30 02:00:00', 
      endTime: '2025-08-30 02:30:00', 
      size: '2.5GB', 
      status: '成功',
      location: '/backup/2025-08-30/'
    },
    { 
      id: 2, 
      type: '手动备份', 
      description: '系统升级前手动备份', 
      startTime: '2025-08-14 18:00:00', 
      endTime: '2025-08-14 18:45:00', 
      size: '2.8GB', 
      status: '成功',
      location: '/backup/2025-08-14/'
    },
    { 
      id: 3, 
      type: '增量备份', 
      description: '数据库增量备份', 
      startTime: '2025-08-30 12:00:00', 
      endTime: '2025-08-30 12:15:00', 
      size: '500MB', 
      status: '成功',
      location: '/backup/incremental/2025-08-30/'
    },
  ];

  // 模拟服务状态数据
  const serviceStatus = [
    { name: 'Web服务', status: 'running', port: 8080, uptime: '7天12小时', cpu: 15, memory: 25 },
    { name: '数据库服务', status: 'running', port: 3306, uptime: '7天12小时', cpu: 35, memory: 45 },
    { name: '视频服务', status: 'running', port: 8081, uptime: '7天12小时', cpu: 25, memory: 30 },
    { name: '报警服务', status: 'running', port: 8082, uptime: '7天12小时', cpu: 20, memory: 20 },
    { name: '文件服务', status: 'warning', port: 8083, uptime: '6天8小时', cpu: 40, memory: 35 },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR': return '#f5222d';
      case 'WARNING': return '#fa8c16';
      case 'INFO': return '#52c41a';
      default: return '#d9d9d9';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'green';
      case 'stopped': return 'red';
      case 'warning': return 'orange';
      default: return 'default';
    }
  };

  const logColumns = [
    { 
      title: '级别', 
      dataIndex: 'level', 
      key: 'level',
      render: (level: string) => (
        <Tag color={getLevelColor(level)}>{level}</Tag>
      )
    },
    { title: '模块', dataIndex: 'module', key: 'module' },
    { title: '消息', dataIndex: 'message', key: 'message' },
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '用户', dataIndex: 'user', key: 'user' },
    { title: 'IP地址', dataIndex: 'ip', key: 'ip' },
    { title: '操作', key: 'action',
      render: (_: any, record: any) => (
        <Button type="link" size="small">
          查看详情
        </Button>
      )
    },
  ];

  const backupColumns = [
    { title: '备份类型', dataIndex: 'type', key: 'type' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    { title: '开始时间', dataIndex: 'startTime', key: 'startTime' },
    { title: '结束时间', dataIndex: 'endTime', key: 'endTime' },
    { title: '文件大小', dataIndex: 'size', key: 'size' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '成功' ? 'green' : 'red'}>{status}</Tag>
      )
    },
    { title: '存储位置', dataIndex: 'location', key: 'location' },
    { title: '操作', key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" size="small">
            下载
          </Button>
          <Button type="link" size="small">
            恢复
          </Button>
        </Space>
      )
    },
  ];

  const handleBackup = () => {
    setIsBackupModalVisible(true);
  };

  const handleBackupOk = () => {
    form.validateFields().then(values => {
      message.success('备份任务已启动');
      setIsBackupModalVisible(false);
      form.resetFields();
    });
  };

  const handleBackupCancel = () => {
    setIsBackupModalVisible(false);
    form.resetFields();
  };

  const handleLogFilter = () => {
    setIsLogModalVisible(true);
  };

  // 系统性能数据
  const systemPerformance = {
    cpu: {
      usage: 35,
      cores: 4,
      temperature: 45
    },
    memory: {
      usage: 68,
      total: 16,
      used: 10.9,
      available: 5.1
    },
    disk: {
      usage: 52,
      total: 500,
      available: 240
    },
    network: {
      connections: 28,
      upload: 12.5,
      download: 45.8
    },
    database: {
      connections: 15,
      queries: 89,
      responseTime: 25
    }
  };

  // ECharts图表配置
  const cpuUsageOption = {
    title: {
      text: 'CPU使用率趋势',
      left: 'center',
      textStyle: {
        fontSize: 14,
        color: '#333'
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
      max: 100,
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [
      {
        name: 'CPU使用率',
        type: 'line',
        smooth: true,
        data: [25, 30, 45, 35, 60, 40, 35],
        lineStyle: {
          color: '#1890ff'
        },
        itemStyle: {
          color: '#1890ff'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(24, 144, 255, 0.3)'
            }, {
              offset: 1, color: 'rgba(24, 144, 255, 0.1)'
            }]
          }
        }
      }
    ]
  };

  const memoryUsageOption = {
    title: {
      text: '内存使用情况',
      left: 'center',
      textStyle: {
        fontSize: 14,
        color: '#333'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}GB ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      data: ['已使用', '可用']
    },
    series: [
      {
        name: '内存使用',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        data: [
          { value: systemPerformance.memory.used, name: '已使用', itemStyle: { color: '#722ed1' } },
          { value: systemPerformance.memory.total - systemPerformance.memory.used, name: '可用', itemStyle: { color: '#52c41a' } }
        ]
      }
    ]
  };

  const networkTrafficOption = {
    title: {
      text: '网络流量监控',
      left: 'center',
      textStyle: {
        fontSize: 14,
        color: '#333'
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['上传', '下载'],
      bottom: 10
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} Mbps'
      }
    },
    series: [
      {
        name: '上传',
        type: 'bar',
        data: [8, 10, 15, 12, 18, 14, 12],
        itemStyle: {
          color: '#13c2c2'
        }
      },
      {
        name: '下载',
        type: 'bar',
        data: [25, 30, 50, 45, 60, 48, 46],
        itemStyle: {
          color: '#fa8c16'
        }
      }
    ]
  };

  const systemResourceOption = {
    title: {
      text: '系统资源使用率',
      left: 'center',
      textStyle: {
        fontSize: 14,
        color: '#333'
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
      type: 'value',
      max: 100,
      axisLabel: {
        formatter: '{value}%'
      }
    },
    yAxis: {
      type: 'category',
      data: ['磁盘使用率', '内存使用率', 'CPU使用率']
    },
    series: [
      {
        name: '使用率',
        type: 'bar',
        data: [
          { value: systemPerformance.disk.usage, itemStyle: { color: '#faad14' } },
          { value: systemPerformance.memory.usage, itemStyle: { color: '#722ed1' } },
          { value: systemPerformance.cpu.usage, itemStyle: { color: '#1890ff' } }
        ]
      }
    ]
  };

  return (
    <div>
      <div className="page-header">
        <h1>运行管理</h1>
        <p>系统监控、日志管理、备份恢复、性能分析等运行管理功能</p>
        <div style={{ marginTop: 16 }}>
          <Space>
            <Button type="primary" icon={<MonitorOutlined />} onClick={() => setIsPerformanceModalVisible(true)}>
              性能详情
            </Button>
            <Button icon={<SettingOutlined />}>
              系统设置
            </Button>
            <Button icon={<ReloadOutlined />}>
              刷新数据
            </Button>
          </Space>
        </div>
      </div>

      {/* 系统性能概览 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card" hoverable>
            <Statistic
              title="CPU使用率"
              value={realTimeData.cpu}
              suffix="%"
              prefix={<CloudServerOutlined />}
              valueStyle={{ color: realTimeData.cpu > 80 ? '#f5222d' : realTimeData.cpu > 60 ? '#fa8c16' : '#52c41a' }}
            />
            <div className="statistics-label">
              温度: {systemPerformance.cpu.temperature}°C
            </div>
            <Progress 
              percent={realTimeData.cpu} 
              strokeColor={realTimeData.cpu > 80 ? '#f5222d' : realTimeData.cpu > 60 ? '#fa8c16' : '#52c41a'}
              showInfo={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card" hoverable>
            <Statistic
              title="内存使用率"
              value={realTimeData.memory}
              suffix="%"
              prefix={<DatabaseOutlined />}
              valueStyle={{ color: realTimeData.memory > 80 ? '#f5222d' : realTimeData.memory > 60 ? '#fa8c16' : '#52c41a' }}
            />
            <div className="statistics-label">
              可用: {systemPerformance.memory.available}GB
            </div>
            <Progress 
              percent={realTimeData.memory} 
              strokeColor={realTimeData.memory > 80 ? '#f5222d' : realTimeData.memory > 60 ? '#fa8c16' : '#52c41a'}
              showInfo={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card" hoverable>
            <Statistic
              title="磁盘使用率"
              value={realTimeData.disk}
              suffix="%"
              prefix={<CloudUploadOutlined />}
              valueStyle={{ color: realTimeData.disk > 80 ? '#f5222d' : realTimeData.disk > 60 ? '#fa8c16' : '#52c41a' }}
            />
            <div className="statistics-label">
              可用: {systemPerformance.disk.available}GB
            </div>
            <Progress 
              percent={realTimeData.disk} 
              strokeColor={realTimeData.disk > 80 ? '#f5222d' : realTimeData.disk > 60 ? '#fa8c16' : '#52c41a'}
              showInfo={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card" hoverable>
            <Statistic
              title="网络连接"
              value={realTimeData.network}
              prefix={<ClusterOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <div className="statistics-label">
              上传: {systemPerformance.network.upload}Mbps
            </div>
            <Progress 
              percent={(realTimeData.network / 100) * 100} 
              strokeColor="#1890ff"
              showInfo={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" size="large">
        <TabPane tab={<span><MonitorOutlined />系统监控</span>} key="1">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="CPU使用率趋势" size="small">
                <ReactECharts option={cpuUsageOption} style={{ height: '200px' }} />
                <div style={{ textAlign: 'center', marginTop: 16 }}>
                  <div style={{ fontSize: '12px', color: '#999' }}>
                    核心数: {systemPerformance.cpu.cores} | 温度: {systemPerformance.cpu.temperature}°C
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="内存使用情况" size="small">
                <ReactECharts option={memoryUsageOption} style={{ height: '200px' }} />
                <div style={{ textAlign: 'center', marginTop: 16 }}>
                  <div style={{ fontSize: '12px', color: '#999' }}>
                    总内存: {systemPerformance.memory.total}GB | 可用: {systemPerformance.memory.available}GB
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
          
          <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
            <Col xs={24} lg={12}>
              <Card title="网络流量监控" size="small">
                <ReactECharts option={networkTrafficOption} style={{ height: '200px' }} />
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="系统资源使用率" size="small">
                <ReactECharts option={systemResourceOption} style={{ height: '200px' }} />
              </Card>
            </Col>
          </Row>
          
          <Card title="服务状态监控" style={{ marginTop: '16px' }}>
            <Table
              dataSource={serviceStatus}
              pagination={false}
              size="small"
              columns={[
                { 
                  title: '服务名称', 
                  dataIndex: 'name', 
                  key: 'name',
                  render: (name: string, record: any) => (
                    <Space>
                      <Badge status={getStatusColor(record.status) as any} />
                      {name}
                    </Space>
                  )
                },
                { title: '端口', dataIndex: 'port', key: 'port' },
                { title: '运行时间', dataIndex: 'uptime', key: 'uptime' },
                { 
                  title: 'CPU使用率', 
                  dataIndex: 'cpu', 
                  key: 'cpu',
                  render: (cpu: number) => (
                    <Progress percent={cpu} size="small" showInfo={false} />
                  )
                },
                { 
                  title: '内存使用率', 
                  dataIndex: 'memory', 
                  key: 'memory',
                  render: (memory: number) => (
                    <Progress percent={memory} size="small" showInfo={false} />
                  )
                },
                { title: '操作', key: 'action',
                  render: (_: any, record: any) => (
                    <Space>
                      <Button type="link" size="small">
                        重启
                      </Button>
                      <Button type="link" size="small">
                        日志
                      </Button>
                    </Space>
                  )
                },
              ]}
              rowKey="name"
            />
          </Card>
        </TabPane>

        <TabPane tab={<span><FileTextOutlined />日志管理</span>} key="2">
          <Card>
            <div style={{ marginBottom: 16 }}>
              <Space>
                <RangePicker showTime />
                <Select placeholder="选择级别" style={{ width: 120 }}>
                  <Option value="all">全部级别</Option>
                  <Option value="ERROR">错误</Option>
                  <Option value="WARNING">警告</Option>
                  <Option value="INFO">信息</Option>
                </Select>
                <Select placeholder="选择模块" style={{ width: 150 }}>
                  <Option value="all">全部模块</Option>
                  <Option value="系统启动">系统启动</Option>
                  <Option value="数据库连接">数据库连接</Option>
                  <Option value="视频服务">视频服务</Option>
                  <Option value="用户登录">用户登录</Option>
                </Select>
                <Button icon={<FilterOutlined />} onClick={handleLogFilter}>
                  筛选
                </Button>
                <Button icon={<ExportOutlined />}>
                  导出日志
                </Button>
                <Button icon={<ReloadOutlined />}>
                  刷新
                </Button>
              </Space>
            </div>
            <Table
              columns={logColumns}
              dataSource={systemLogs}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              size="small"
            />
          </Card>
        </TabPane>

        <TabPane tab={<span><CloudUploadOutlined />备份管理</span>} key="3">
          <Card>
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Button type="primary" icon={<CloudUploadOutlined />} onClick={handleBackup}>
                  创建备份
                </Button>
                <Button icon={<CloudDownloadOutlined />}>
                  恢复备份
                </Button>
                <Button icon={<SettingOutlined />}>
                  备份策略
                </Button>
                <Button icon={<ReloadOutlined />}>
                  刷新
                </Button>
              </Space>
            </div>
            <Table
              columns={backupColumns}
              dataSource={backupRecords}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              size="small"
            />
          </Card>
        </TabPane>

        <TabPane tab={<span><BarChartOutlined />性能分析</span>} key="4">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="数据库性能" size="small">
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>连接数</span>
                    <span>{systemPerformance.database.connections}</span>
                  </div>
                  <Progress percent={(systemPerformance.database.connections / 50) * 100} strokeColor="#52c41a" />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>查询数/分钟</span>
                    <span>{systemPerformance.database.queries}</span>
                  </div>
                  <Progress percent={(systemPerformance.database.queries / 200) * 100} strokeColor="#1890ff" />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>响应时间</span>
                    <span>{systemPerformance.database.responseTime}ms</span>
                  </div>
                  <Progress percent={(systemPerformance.database.responseTime / 100) * 100} strokeColor="#722ed1" />
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="网络性能" size="small">
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>上传速度</span>
                    <span>{systemPerformance.network.upload} Mbps</span>
                  </div>
                  <Progress percent={(systemPerformance.network.upload / 50) * 100} strokeColor="#13c2c2" />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>下载速度</span>
                    <span>{systemPerformance.network.download} Mbps</span>
                  </div>
                  <Progress percent={(systemPerformance.network.download / 100) * 100} strokeColor="#fa8c16" />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>活跃连接</span>
                    <span>{systemPerformance.network.connections}</span>
                  </div>
                  <Progress percent={(systemPerformance.network.connections / 200) * 100} strokeColor="#f5222d" />
                </div>
              </Card>
            </Col>
          </Row>
          
          <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
            <Col xs={24} lg={12}>
              <Card title="系统告警" size="small">
                <Timeline>
                  <Timeline.Item color="green">
                    <div style={{ fontSize: '12px' }}>
                      <div style={{ fontWeight: 'bold' }}>系统运行正常</div>
                      <div style={{ color: '#666' }}>所有核心服务运行正常 - {new Date().toLocaleString()}</div>
                    </div>
                  </Timeline.Item>
                  <Timeline.Item color="orange">
                    <div style={{ fontSize: '12px' }}>
                      <div style={{ fontWeight: 'bold' }}>磁盘空间警告</div>
                      <div style={{ color: '#666' }}>磁盘使用率超过70%，建议清理 - 14:30</div>
                    </div>
                  </Timeline.Item>
                  <Timeline.Item color="blue">
                    <div style={{ fontSize: '12px' }}>
                      <div style={{ fontWeight: 'bold' }}>备份任务完成</div>
                      <div style={{ color: '#666' }}>每日自动备份任务完成 - 02:30</div>
                    </div>
                  </Timeline.Item>
                </Timeline>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="性能趋势" size="small">
                <ReactECharts option={cpuUsageOption} style={{ height: '200px' }} />
              </Card>
            </Col>
          </Row>
          

        </TabPane>
      </Tabs>

      {/* 创建备份模态框 */}
      <Modal
        title="创建备份"
        open={isBackupModalVisible}
        onOk={handleBackupOk}
        onCancel={handleBackupCancel}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="type" label="备份类型" rules={[{ required: true, message: '请选择备份类型' }]}>
                <Select>
                  <Option value="full">完整备份</Option>
                  <Option value="incremental">增量备份</Option>
                  <Option value="differential">差异备份</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="priority" label="优先级" rules={[{ required: true, message: '请选择优先级' }]}>
                <Select>
                  <Option value="low">低</Option>
                  <Option value="normal">普通</Option>
                  <Option value="high">高</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="description" label="备份描述">
            <TextArea rows={3} placeholder="请输入备份描述" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="compression" label="压缩" valuePropName="checked" initialValue={true}>
                <Switch />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="encryption" label="加密" valuePropName="checked" initialValue={false}>
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* 日志筛选模态框 */}
      <Modal
        title="日志筛选"
        open={isLogModalVisible}
        onCancel={() => setIsLogModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form layout="vertical">
          <Form.Item label="时间范围">
            <RangePicker showTime style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="日志级别">
            <Select mode="multiple" placeholder="请选择日志级别">
              <Option value="ERROR">错误</Option>
              <Option value="WARNING">警告</Option>
              <Option value="INFO">信息</Option>
            </Select>
          </Form.Item>
          <Form.Item label="模块">
            <Select mode="multiple" placeholder="请选择模块">
              <Option value="系统启动">系统启动</Option>
              <Option value="数据库连接">数据库连接</Option>
              <Option value="视频服务">视频服务</Option>
              <Option value="用户登录">用户登录</Option>
            </Select>
          </Form.Item>
          <Form.Item label="关键词">
            <Input placeholder="请输入关键词" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 性能详情模态框 */}
      <Modal
        title="系统性能详情"
        open={isPerformanceModalVisible}
        onCancel={() => setIsPerformanceModalVisible(false)}
        footer={null}
        width={800}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card title="CPU详细信息" size="small">
              <Descriptions column={1} size="small">
                <Descriptions.Item label="核心数">{systemPerformance.cpu.cores}</Descriptions.Item>
                <Descriptions.Item label="当前使用率">{realTimeData.cpu}%</Descriptions.Item>
                <Descriptions.Item label="温度">{systemPerformance.cpu.temperature}°C</Descriptions.Item>
                <Descriptions.Item label="频率">2.4 GHz</Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="内存详细信息" size="small">
              <Descriptions column={1} size="small">
                <Descriptions.Item label="总内存">{systemPerformance.memory.total} GB</Descriptions.Item>
                <Descriptions.Item label="已使用">{systemPerformance.memory.used} GB</Descriptions.Item>
                <Descriptions.Item label="可用">{systemPerformance.memory.available} GB</Descriptions.Item>
                <Descriptions.Item label="使用率">{realTimeData.memory}%</Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
          <Col span={24}>
            <Card title="实时性能监控" size="small">
              <ReactECharts option={cpuUsageOption} style={{ height: '300px' }} />
            </Card>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default OperationManagement;
