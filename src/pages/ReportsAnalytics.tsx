import React, { useState } from 'react';
// import ReactECharts from 'echarts-for-react';
import { 
  Card, 
  Button, 
  Space, 
  Row, 
  Col, 
  Statistic, 
  Select,
  DatePicker, 
  Table,
  Progress,
  Alert,
  Tabs,
  List,
  Avatar,
  Tag,
  Timeline
} from 'antd';
import {
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  RiseOutlined,
  DownloadOutlined,
  PrinterOutlined,
  CalendarOutlined,
  AlertOutlined,
  UserOutlined,
  CameraOutlined,
  LockOutlined,
  SecurityScanOutlined,
  FileTextOutlined,
  EyeOutlined
} from '@ant-design/icons';
// 简化版本，不使用Chart.js，使用Ant Design内置组件

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const ReportsAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [reportType, setReportType] = useState('security');

  // 符合兖州区人民医院规模的安防数据统计
  const securityStats = {
    totalAlarms: 28,
    resolvedAlarms: 26,
    pendingAlarms: 2,
    avgResponseTime: 8, // 分钟
    securityIncidents: 3,
    visitorCount: 168,
    patrolCount: 24,
    deviceUptime: 97.8
  };

  // 符合医院规模的图表数据
  const monthlyAlarmData = [
    { month: '1月', alarms: 5, resolved: 5 },
    { month: '2月', alarms: 3, resolved: 3 },
    { month: '3月', alarms: 7, resolved: 6 },
    { month: '4月', alarms: 4, resolved: 4 },
    { month: '5月', alarms: 6, resolved: 6 },
    { month: '6月', alarms: 3, resolved: 2 },
  ];

  const deviceTypeData = [
    { type: '监控摄像头', count: 3, color: '#1890ff' },
    { type: '门禁设备', count: 2, color: '#52c41a' },
    { type: '传感器', count: 1, color: '#faad14' },
    { type: '网络设备', count: 1, color: '#f5222d' },
    { type: '电源设备', count: 1, color: '#722ed1' },
  ];

  const weeklyVisitorData = [
    { day: '周一', visitors: 25 },
    { day: '周二', visitors: 18 },
    { day: '周三', visitors: 32 },
    { day: '周四', visitors: 28 },
    { day: '周五', visitors: 22 },
    { day: '周六', visitors: 15 },
    { day: '周日', visitors: 12 },
  ];

  const incidentData = [
    { id: 1, type: '设备故障', count: 2, trend: 'stable', severity: 'medium' },
    { id: 2, type: '门禁异常', count: 1, trend: 'down', severity: 'low' },
    { id: 3, type: '网络故障', count: 1, trend: 'stable', severity: 'low' },
    { id: 4, type: '温度异常', count: 1, trend: 'down', severity: 'medium' },
    { id: 5, type: '人员滞留', count: 1, trend: 'stable', severity: 'low' }
  ];

  const maxVisitors = Math.max(...weeklyVisitorData.map(d => d.visitors));
  const totalDevices = deviceTypeData.reduce((sum, d) => sum + d.count, 0);

  // ECharts图表配置
  const alarmTrendLineOption = {
    title: {
      text: '报警趋势分析',
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
      data: ['报警数量', '处理完成'],
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
      data: monthlyAlarmData.map(item => item.month)
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '报警数量',
        type: 'line',
        data: monthlyAlarmData.map(item => item.alarms),
        lineStyle: {
          color: '#f5222d'
        },
        itemStyle: {
          color: '#f5222d'
        }
      },
      {
        name: '处理完成',
        type: 'line',
        data: monthlyAlarmData.map(item => item.resolved),
        lineStyle: {
          color: '#52c41a'
        },
        itemStyle: {
          color: '#52c41a'
        }
      }
    ]
  };

  const visitorFlowBarOption = {
    title: {
      text: '访客流量统计',
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
      type: 'category',
      data: weeklyVisitorData.map(item => item.day),
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: '访客数量',
        type: 'bar',
        barWidth: '60%',
        data: weeklyVisitorData.map(item => ({
          value: item.visitors,
          itemStyle: { color: '#1890ff' }
        }))
      }
    ]
  };

  const deviceTypePieOption = {
    title: {
      text: '设备类型分布',
      left: 'center',
      textStyle: {
        fontSize: 14,
        color: '#333'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      right: 10,
      data: deviceTypeData.map(item => item.type)
    },
    series: [
      {
        name: '设备类型',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['40%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '18',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: deviceTypeData.map(item => ({
          value: item.count,
          name: item.type,
          itemStyle: { color: item.color }
        }))
      }
    ]
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#f5222d';
      case 'high': return '#fa8c16';
      case 'medium': return '#faad14';
      case 'low': return '#52c41a';
      default: return '#d9d9d9';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const incidentColumns = [
    {
      title: '事件类型',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: '发生次数',
      dataIndex: 'count',
      key: 'count',
      render: (count: number, record: any) => (
        <Space>
          <span style={{ fontWeight: 'bold' }}>{count}</span>
          <span>{getTrendIcon(record.trend)}</span>
        </Space>
      )
    },
    {
      title: '严重程度',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => (
        <Tag color={getSeverityColor(severity)}>
          {severity === 'critical' ? '紧急' : 
           severity === 'high' ? '高' :
           severity === 'medium' ? '中' : '低'}
        </Tag>
      )
    }
  ];

  const handleExport = () => {
    console.log('导出报表');
  };

  const handlePrint = () => {
    console.log('打印报表');
  };

  return (
    <div>
      <div className="page-header">
        <h1>报表分析</h1>
        <p>安防数据统计、趋势分析、报表生成等数据分析功能</p>
      </div>

      {/* 控制面板 */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={16} align="middle">
          <Col>
            <Space>
              <span>报表类型:</span>
              <Select value={reportType} onChange={setReportType} style={{ width: 120 }}>
                <Option value="security">安防报表</Option>
                <Option value="device">设备报表</Option>
                <Option value="visitor">访客报表</Option>
                <Option value="patrol">巡更报表</Option>
              </Select>
            </Space>
          </Col>
          <Col>
            <Space>
              <span>时间范围:</span>
              <Select value={timeRange} onChange={setTimeRange} style={{ width: 120 }}>
                <Option value="week">本周</Option>
                <Option value="month">本月</Option>
                <Option value="quarter">本季度</Option>
                <Option value="year">本年</Option>
              </Select>
            </Space>
          </Col>
          <Col>
            <RangePicker />
          </Col>
          <Col>
            <Space>
              <Button type="primary" icon={<DownloadOutlined />} onClick={handleExport}>
                导出
              </Button>
              <Button icon={<PrinterOutlined />} onClick={handlePrint}>
                打印
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* 统计概览 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="总报警数"
              value={securityStats.totalAlarms}
              prefix={<AlertOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="处理完成率"
              value={Math.round((securityStats.resolvedAlarms / securityStats.totalAlarms) * 100)}
              suffix="%"
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="平均响应时间"
              value={securityStats.avgResponseTime}
              suffix="分钟"
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="设备在线率"
              value={securityStats.deviceUptime}
              suffix="%"
              prefix={<SecurityScanOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="overview">
        <TabPane tab="数据概览" key="overview">
          <Row gutter={[16, 16]}>
            {/* 报警趋势分析 */}
            <Col xs={24} lg={12}>
              <Card title="报警趋势分析" extra={<LineChartOutlined />}>
                <div style={{ padding: '16px 0' }}>
                  {monthlyAlarmData.map((item, index) => (
                    <div key={index} style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span>{item.month}</span>
                        <span>{item.resolved}/{item.alarms}</span>
                      </div>
                      <Progress 
                        percent={Math.round((item.resolved / item.alarms) * 100)} 
                        strokeColor="#52c41a"
                        trailColor="#f5f5f5"
                        size="small"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            {/* 访客流量统计 */}
            <Col xs={24} lg={12}>
              <Card title="访客流量统计" extra={<BarChartOutlined />}>
                <div style={{ padding: '16px 0' }}>
                  {weeklyVisitorData.map((item, index) => (
                    <div key={index} style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span>{item.day}</span>
                        <span>{item.visitors}人</span>
                      </div>
                      <Progress 
                        percent={Math.round((item.visitors / maxVisitors) * 100)} 
                        strokeColor="#1890ff"
                        size="small"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            {/* 设备类型分布 */}
            <Col xs={24} lg={12}>
              <Card title="设备类型分布" extra={<PieChartOutlined />}>
                <div style={{ padding: '16px 0' }}>
                  {deviceTypeData.map((item, index) => (
                    <div key={index} style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span>{item.type}</span>
                        <span>{item.count}台 ({Math.round((item.count / totalDevices) * 100)}%)</span>
                      </div>
                      <Progress 
                        percent={Math.round((item.count / totalDevices) * 100)} 
                        strokeColor={item.color}
                        size="small"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            {/* 安全事件统计 */}
            <Col xs={24} lg={12}>
              <Card title="安全事件统计" extra={<EyeOutlined />}>
                <Table 
                  columns={incidentColumns}
                  dataSource={incidentData}
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="详细报告" key="details">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card title="安防运行报告">
                <div style={{ marginBottom: 16 }}>
                  <h4>兖州区人民医院安防运行报告摘要</h4>
                  <p>本月我院安防系统运行稳定，共处理报警事件 {securityStats.totalAlarms} 起，处理完成率达到 {Math.round((securityStats.resolvedAlarms / securityStats.totalAlarms) * 100)}%。设备在线率保持在 {securityStats.deviceUptime}%，平均响应时间为 {securityStats.avgResponseTime} 分钟。各类安防设备运行正常，有效保障了医院安全。</p>
                </div>

                <div style={{ marginBottom: 16 }}>
                  <h4>关键指标</h4>
                  <Row gutter={16}>
                    <Col span={12}>
                      <div style={{ marginBottom: 8 }}>
                        <span>报警处理效率: </span>
                        <Progress percent={93} size="small" />
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <span>设备健康度: </span>
                        <Progress percent={91} size="small" strokeColor="#52c41a" />
                      </div>
                    </Col>
                    <Col span={12}>
                      <div style={{ marginBottom: 8 }}>
                        <span>访客管理规范性: </span>
                        <Progress percent={96} size="small" strokeColor="#1890ff" />
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <span>巡更完成率: </span>
                        <Progress percent={92} size="small" strokeColor="#722ed1" />
                      </div>
                    </Col>
                  </Row>
                </div>

                <div>
                  <h4>改进建议</h4>
                  <List
                    size="small"
                    dataSource={[
                      '建议对急诊科监控设备进行定期维护清洁',
                      '完善夜间巡更路线，增加重点区域检查',
                      '加强访客管理数字化建设',
                      '定期检查UPS电源及备用电池状态'
                    ]}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar size="small" icon={<FileTextOutlined />} />}
                          description={item}
                        />
                      </List.Item>
                    )}
                  />
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={8}>
              <Card title="本月亮点" style={{ marginBottom: 16 }}>
                <Timeline>
                  <Timeline.Item color="green">
                    <div style={{ fontSize: '12px' }}>
                      <div style={{ fontWeight: 'bold' }}>设备升级完成</div>
                      <div style={{ color: '#666' }}>1月15日 - 完成监控系统升级</div>
                    </div>
                  </Timeline.Item>
                  <Timeline.Item color="blue">
                    <div style={{ fontSize: '12px' }}>
                      <div style={{ fontWeight: 'bold' }}>响应时间优化</div>
                      <div style={{ color: '#666' }}>1月10日 - 平均响应时间缩短20%</div>
                    </div>
                  </Timeline.Item>
                  <Timeline.Item color="orange">
                    <div style={{ fontSize: '12px' }}>
                      <div style={{ fontWeight: 'bold' }}>访客系统上线</div>
                      <div style={{ color: '#666' }}>1月5日 - 新访客管理系统投入使用</div>
                    </div>
                  </Timeline.Item>
                </Timeline>
              </Card>

              <Card title="数据质量">
                <Alert
                  message="数据完整性: 99.2%"
                  description="本月数据采集完整，可用于分析"
                  type="success"
                  showIcon
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="趋势分析" key="trends">
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Card title="安防趋势分析">
                <Row gutter={16}>
                  <Col xs={24} lg={8}>
                    <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '6px', marginBottom: '16px' }}>
                      <h4>报警趋势</h4>
                      <p>过去3个月报警数量呈下降趋势，主要原因：</p>
                      <ul>
                        <li>设备维护加强</li>
                        <li>预警机制完善</li>
                        <li>人员培训到位</li>
                      </ul>
                    </div>
                  </Col>
                  <Col xs={24} lg={8}>
                    <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '6px', marginBottom: '16px' }}>
                      <h4>访客管理</h4>
                      <p>访客流量稳定增长，管理效率提升：</p>
                      <ul>
                        <li>数字化登记普及</li>
                        <li>快速通道优化</li>
                        <li>安全检查规范</li>
                      </ul>
                    </div>
                  </Col>
                  <Col xs={24} lg={8}>
                    <div style={{ padding: '16px', background: '#f5f5f5', borderRadius: '6px', marginBottom: '16px' }}>
                      <h4>设备状态</h4>
                      <p>设备整体运行稳定，在线率持续改善：</p>
                      <ul>
                        <li>预防性维护增加</li>
                        <li>故障预警机制</li>
                        <li>备件储备充足</li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ReportsAnalytics;
