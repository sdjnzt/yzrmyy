import React, { useState } from 'react';
import dayjs from 'dayjs';
// import ReactECharts from 'echarts-for-react';
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
  Progress,
  Alert,
  message,
  Tabs,
  List,
  Avatar,
  Badge,
  Tooltip,
  Popconfirm,
  Switch
} from 'antd';
import {
  CameraOutlined,
  WifiOutlined,
  LockOutlined,
  BellOutlined,
  ToolOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined,
  SettingOutlined,
  WarningOutlined,
  ThunderboltOutlined,
  SecurityScanOutlined,
  MonitorOutlined,
  DeleteOutlined,
  EditOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const DeviceManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMaintenanceModalVisible, setIsMaintenanceModalVisible] = useState(false);
  const [isAddDeviceModalVisible, setIsAddDeviceModalVisible] = useState(false);
  const [isAddMaintenanceModalVisible, setIsAddMaintenanceModalVisible] = useState(false);
  const [isConfigModalVisible, setIsConfigModalVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [maintenanceForm] = Form.useForm();
  const [addDeviceForm] = Form.useForm();
  const [addMaintenanceForm] = Form.useForm();
  const [configForm] = Form.useForm();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [deviceData, setDeviceData] = useState([
    { 
      id: 1, 
      name: '门诊大厅监控-01', 
      type: 'camera',
      model: 'DS-2CD2142FWD-I',
      location: '门诊大厅',
      ip: '192.168.1.101',
      status: 'online',
      healthScore: 92,
      installDate: '2022-03-15',
      lastMaintenance: '2025-08-01',
      nextMaintenance: '2025-12-01',
      warrantyExpiry: '2025-03-15',
      manufacturer: '海康威视',
      firmware: 'V5.5.2',
      uptime: '98.5%',
      faults: 0
    },
    { 
      id: 2, 
      name: '药房门禁系统', 
      type: 'access',
      model: 'ZK-AC2000',
      location: '药房入口',
      ip: '192.168.1.201',
      status: 'online',
      healthScore: 88,
      installDate: '2022-08-20',
      lastMaintenance: '2025-08-29',
      nextMaintenance: '2025-12-15',
      warrantyExpiry: '2025-08-20',
      manufacturer: '中控智慧',
      firmware: 'V2.0.8',
      uptime: '97.2%',
      faults: 0
    },
    { 
      id: 3, 
      name: '配电房烟感器', 
      type: 'sensor',
      model: 'JTY-GD-882',
      location: '配电房',
      ip: '192.168.1.315',
      status: 'online',
      healthScore: 85,
      installDate: '2021-05-10',
      lastMaintenance: '2025-08-10',
      nextMaintenance: '2025-12-10',
      warrantyExpiry: '2025-05-10',
      manufacturer: '海湾安全',
      firmware: 'V1.1.5',
      uptime: '99.1%',
      faults: 0
    },
    { 
      id: 4, 
      name: '信息科核心交换机', 
      type: 'network',
      model: 'H3C-S5120-28P',
      location: '信息科机房',
      ip: '192.168.1.10',
      status: 'online',
      healthScore: 94,
      installDate: '2021-12-01',
      lastMaintenance: '2025-08-29',
      nextMaintenance: '2025-12-30',
      warrantyExpiry: '2025-08-01',
      manufacturer: '华三',
      firmware: 'V7.1.070',
      uptime: '99.8%',
      faults: 0
    },
    { 
      id: 5, 
      name: '急诊科监控', 
      type: 'camera',
      model: 'DS-2CD2123G0-I',
      location: '急诊科',
      ip: '192.168.1.102',
      status: 'warning',
      healthScore: 76,
      installDate: '2022-06-20',
      lastMaintenance: '2025-08-29',
      nextMaintenance: '2025-12-15',
      warrantyExpiry: '2025-06-20',
      manufacturer: '海康威视',
      firmware: 'V5.5.1',
      uptime: '95.8%',
      faults: 1
    },
    { 
      id: 6, 
      name: '手术室门禁', 
      type: 'access',
      model: 'ZK-AC3000',
      location: '手术室',
      ip: '192.168.1.202',
      status: 'online',
      healthScore: 90,
      installDate: '2025-01-10',
      lastMaintenance: '2025-08-10',
      nextMaintenance: '2025-12-10',
      warrantyExpiry: '2026-01-10',
      manufacturer: '中控智慧',
      firmware: 'V2.1.2',
      uptime: '98.9%',
      faults: 0
    },
    { 
      id: 7, 
      name: '疫苗冷库温度监控', 
      type: 'sensor',
      model: 'TH-W200',
      location: '疫苗冷库',
      ip: '192.168.1.316',
      status: 'online',
      healthScore: 93,
      installDate: '2022-10-15',
      lastMaintenance: '2025-08-29',
      nextMaintenance: '2025-12-15',
      warrantyExpiry: '2025-08-29',
      manufacturer: '环控科技',
      firmware: 'V3.2.1',
      uptime: '99.5%',
      faults: 0
    },
    { 
      id: 8, 
      name: '住院部UPS电源', 
      type: 'power',
      model: 'APC-SUA3000ICH',
      location: '住院部配电室',
      ip: '192.168.1.400',
      status: 'online',
      healthScore: 87,
      installDate: '2021-08-01',
      lastMaintenance: '2025-08-01',
      nextMaintenance: '2025-12-01',
      warrantyExpiry: '2025-08-01',
      manufacturer: 'APC',
      firmware: 'V1.5.3',
      uptime: '99.9%',
      faults: 0
    },
    {
      id: 9,
      name: 'ICU监护摄像头',
      type: 'camera',
      model: 'DS-2CD2123G0-I',
      location: 'ICU病房',
      ip: '192.168.1.103',
      status: 'online',
      healthScore: 88,
      installDate: '2022-03-15',
      lastMaintenance: '2025-08-01',
      nextMaintenance: '2025-12-01',
      warrantyExpiry: '2025-03-15',
      manufacturer: '海康威视',
      firmware: 'V5.5.1',
      uptime: '98.2%',
      faults: 0
    },
    {
      id: 10,
      name: '血库门禁系统',
      type: 'access',
      model: 'ZK-AC2000',
      location: '血库',
      ip: '192.168.1.203',
      status: 'online',
      healthScore: 95,
      installDate: '2025-03-20',
      lastMaintenance: '2025-08-29',
      nextMaintenance: '2025-12-15',
      warrantyExpiry: '2026-03-20',
      manufacturer: '中控智慧',
      firmware: 'V2.0.8',
      uptime: '99.3%',
      faults: 0
    },
    {
      id: 11,
      name: '停车场车牌识别',
      type: 'camera',
      model: 'VN-T216',
      location: '停车场入口',
      ip: '192.168.1.105',
      status: 'online',
      healthScore: 86,
      installDate: '2022-09-01',
      lastMaintenance: '2025-08-20',
      nextMaintenance: '2025-05-20',
      warrantyExpiry: '2025-08-01',
      manufacturer: '文安智能',
      firmware: 'V4.2.3',
      uptime: '96.8%',
      faults: 0
    },
    {
      id: 12,
      name: '医技楼消防主机',
      type: 'sensor',
      model: 'JB-QB-GX5000',
      location: '医技楼消防控制室',
      ip: '192.168.1.318',
      status: 'online',
      healthScore: 92,
      installDate: '2021-08-10',
      lastMaintenance: '2025-08-29',
      nextMaintenance: '2025-06-15',
      warrantyExpiry: '2025-08-10',
      manufacturer: '北大青鸟',
      firmware: 'V8.1.2',
      uptime: '99.7%',
      faults: 0
    },
    {
      id: 13,
      name: '财务科保险柜',
      type: 'access',
      model: 'FDG-A1/D-120',
      location: '财务科',
      ip: '192.168.1.204',
      status: 'online',
      healthScore: 98,
      installDate: '2025-05-10',
      lastMaintenance: '2025-08-10',
      nextMaintenance: '2025-07-10',
      warrantyExpiry: '2026-05-10',
      manufacturer: '永发保险柜',
      firmware: 'V1.0.5',
      uptime: '99.9%',
      faults: 0
    },
    {
      id: 14,
      name: '周界红外对射',
      type: 'sensor',
      model: 'ABT-100',
      location: '医院北墙',
      ip: '192.168.1.320',
      status: 'warning',
      healthScore: 72,
      installDate: '2021-12-20',
      lastMaintenance: '2025-06-20',
      nextMaintenance: '2025-02-20',
      warrantyExpiry: '2025-08-20',
      manufacturer: '艾礼富',
      firmware: 'V2.3.1',
      uptime: '94.5%',
      faults: 2
    },
    {
      id: 15,
      name: '放射科辐射监测',
      type: 'sensor',
      model: 'FH-463A',
      location: '放射科',
      ip: '192.168.1.321',
      status: 'online',
      healthScore: 89,
      installDate: '2022-11-01',
      lastMaintenance: '2025-08-01',
      nextMaintenance: '2025-05-01',
      warrantyExpiry: '2025-08-01',
      manufacturer: '东西分析',
      firmware: 'V1.8.2',
      uptime: '98.1%',
      faults: 0
    },
    {
      id: 16,
      name: '病理科冷冻切片机',
      type: 'sensor',
      model: 'CM1950',
      location: '病理科',
      ip: '192.168.1.322',
      status: 'offline',
      healthScore: 45,
      installDate: '2020-05-15',
      lastMaintenance: '2025-08-29',
      nextMaintenance: '2025-02-15',
      warrantyExpiry: '2025-05-15',
      manufacturer: '徕卡',
      firmware: 'V2.1.0',
      uptime: '85.2%',
      faults: 3
    },
    {
      id: 17,
      name: '食堂燃气报警器',
      type: 'sensor',
      model: 'RBK-6000-ZL30',
      location: '食堂厨房',
      ip: '192.168.1.323',
      status: 'online',
      healthScore: 91,
      installDate: '2022-07-20',
      lastMaintenance: '2025-08-20',
      nextMaintenance: '2025-06-20',
      warrantyExpiry: '2025-07-20',
      manufacturer: '济南如特',
      firmware: 'V3.0.1',
      uptime: '98.8%',
      faults: 0
    },
    {
      id: 18,
      name: '洗衣房水浸探测器',
      type: 'sensor',
      model: 'WS-200',
      location: '洗衣房',
      ip: '192.168.1.324',
      status: 'online',
      healthScore: 87,
      installDate: '2022-04-25',
      lastMaintenance: '2025-08-25',
      nextMaintenance: '2025-04-25',
      warrantyExpiry: '2025-04-25',
      manufacturer: '迈思安全',
      firmware: 'V1.5.2',
      uptime: '97.3%',
      faults: 0
    },
    {
      id: 19,
      name: '检验科生物安全柜',
      type: 'sensor',
      model: 'BSC-1100IIA2',
      location: '检验科',
      ip: '192.168.1.325',
      status: 'online',
      healthScore: 94,
      installDate: '2025-02-10',
      lastMaintenance: '2025-08-10',
      nextMaintenance: '2025-08-10',
      warrantyExpiry: '2026-02-10',
      manufacturer: '苏净安泰',
      firmware: 'V2.0.3',
      uptime: '99.1%',
      faults: 0
    },
    {
      id: 20,
      name: '新生儿科保温箱',
      type: 'sensor',
      model: 'BB-200',
      location: '新生儿科',
      ip: '192.168.1.326',
      status: 'online',
      healthScore: 88,
      installDate: '2022-12-01',
      lastMaintenance: '2025-08-01',
      nextMaintenance: '2025-06-01',
      warrantyExpiry: '2025-08-01',
      manufacturer: '戴维医疗',
      firmware: 'V1.2.5',
      uptime: '98.5%',
      faults: 0
    }
  ]);

  // 维护记录
  const [maintenanceRecords, setMaintenanceRecords] = useState([
    {
      id: 1,
      deviceId: 1,
      deviceName: '门诊大厅监控-01',
      type: '定期维护',
      date: '2025-08-01',
      technician: '张琳',
      description: '清洁镜头，检查网络连接',
      result: '正常',
      nextDate: '2025-09-01'
    },
    {
      id: 2,
      deviceId: 2,
      deviceName: '药房门禁系统',
      type: '定期维护',
      date: '2025-08-29',
      technician: '李义',
      description: '更新门禁卡权限，测试读卡器',
      result: '正常',
      nextDate: '2025-09-15'
    },
    {
      id: 3,
      deviceId: 3,
      deviceName: '配电房烟感器',
      type: '预防性维护',
      date: '2025-08-10',
      technician: '王利华',
      description: '清洁传感器，测试报警功能',
      result: '正常',
      nextDate: '2025-09-10'
    },
    {
      id: 4,
      deviceId: 5,
      deviceName: '急诊科监控',
      type: '故障维修',
      date: '2025-08-12',
      technician: '赵洋',
      description: '画面模糊，清洁镜头并调整焦距',
      result: '正常',
      nextDate: '2025-09-12'
    },
    {
      id: 5,
      deviceId: 8,
      deviceName: '住院部UPS电源',
      type: '定期维护',
      date: '2025-08-01',
      technician: '刘峰',
      description: '检查电池状态，测试切换功能',
      result: '正常',
      nextDate: '2025-09-01'
    },
    {
      id: 6,
      deviceId: 9,
      deviceName: 'ICU监护摄像头',
      type: '定期保养',
      date: '2025-08-01',
      technician: '张亮',
      description: '清洁镜头，检查线路连接，更新固件',
      status: '已完成',
      cost: 150,
      nextDate: '2025-09-01'
    },
    {
      id: 7,
      deviceId: 10,
      deviceName: '血库门禁系统',
      type: '紧急维修',
      date: '2025-08-29',
      technician: '张跃',
      description: '门禁读卡器故障，更换读卡模块',
      status: '已完成',
      cost: 800,
      nextDate: '2025-07-15'
    },
    {
      id: 8,
      deviceId: 11,
      deviceName: '停车场车牌识别',
      type: '定期维护',
      date: '2025-08-20',
      technician: '陈成',
      description: '清洁摄像头，调整识别角度，系统升级',
      status: '已完成',
      cost: 200,
      nextDate: '2025-05-20'
    },
    {
      id: 9,
      deviceId: 12,
      deviceName: '医技楼消防主机',
      type: '年度检修',
      date: '2025-08-29',
      technician: '王涛',
      description: '全面检测消防设备，更换老化器件，系统测试',
      status: '已完成',
      cost: 2500,
      nextDate: '2025-06-15'
    },
    {
      id: 10,
      deviceId: 14,
      deviceName: '周界红外对射',
      type: '故障维修',
      date: '2025-06-20',
      technician: '李洋',
      description: '北墙红外对射器件老化，更换发射接收器',
      status: '需要复检',
      cost: 1200,
      nextDate: '2025-02-20'
    },
    {
      id: 11,
      deviceId: 15,
      deviceName: '放射科辐射监测',
      type: '定期校准',
      date: '2025-08-01',
      technician: '计量所',
      description: '辐射探测器精度校准，数据记录检查',
      status: '已完成',
      cost: 600,
      nextDate: '2025-05-01'
    },
    {
      id: 12,
      deviceId: 16,
      deviceName: '病理科冷冻切片机',
      type: '故障维修',
      date: '2025-08-29',
      technician: '设备厂家',
      description: '制冷系统故障，温度控制异常，需更换压缩机',
      status: '待维修',
      cost: 8000,
      nextDate: '2025-02-15'
    },
    {
      id: 13,
      deviceId: 19,
      deviceName: '检验科生物安全柜',
      type: '定期检测',
      date: '2025-08-10',
      technician: '第三方检测',
      description: '风速检测，高效过滤器检查，密封性测试',
      status: '已完成',
      cost: 800,
      nextDate: '2025-08-10'
    },
    {
      id: 14,
      deviceId: 20,
      deviceName: '新生儿科保温箱',
      type: '定期保养',
      date: '2025-08-01',
      technician: '医工科',
      description: '温度传感器校准，湿度系统检查，外观清洁',
      status: '已完成',
      cost: 300,
      nextDate: '2025-06-01'
    },
    {
      id: 15,
      deviceId: 17,
      deviceName: '食堂燃气报警器',
      type: '定期检测',
      date: '2025-08-20',
      technician: '燃气公司',
      description: '传感器灵敏度测试，报警功能检测，管路检查',
      status: '已完成',
      cost: 200,
      nextDate: '2025-06-20'
    }
  ]);

  // 设备统计
  const deviceStats = {
    total: deviceData.length,
    online: deviceData.filter(d => d.status === 'online').length,
    offline: deviceData.filter(d => d.status === 'offline').length,
    warning: deviceData.filter(d => d.status === 'warning').length,
    avgHealth: Math.round(deviceData.reduce((sum, d) => sum + d.healthScore, 0) / deviceData.length),
    maintenanceDue: deviceData.filter(d => new Date(d.nextMaintenance) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length
  };

  // ECharts图表配置
  const deviceStatusPieOption = {
    title: {
      text: '设备状态分布',
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
      data: ['在线', '告警', '离线']
    },
    series: [
      {
        name: '设备状态',
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
        data: [
          { value: deviceStats.online, name: '在线', itemStyle: { color: '#52c41a' } },
          { value: deviceStats.warning, name: '告警', itemStyle: { color: '#faad14' } },
          { value: deviceStats.offline, name: '离线', itemStyle: { color: '#f5222d' } }
        ]
      }
    ]
  };

  const deviceTypeBarOption = {
    title: {
      text: '设备类型统计',
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
    xAxis: [
      {
        type: 'category',
        data: ['监控摄像头', '门禁设备', '传感器', '网络设备', '电源设备'],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          interval: 0,
          rotate: 30
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '设备数量',
        type: 'bar',
        barWidth: '60%',
        data: [
          { value: 3, itemStyle: { color: '#1890ff' } },
          { value: 2, itemStyle: { color: '#52c41a' } },
          { value: 1, itemStyle: { color: '#faad14' } },
          { value: 1, itemStyle: { color: '#f5222d' } },
          { value: 1, itemStyle: { color: '#722ed1' } }
        ]
      }
    ]
  };

  const deviceHealthLineOption = {
    title: {
      text: '设备健康度趋势',
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
      data: ['平均健康度'],
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
      data: ['1月', '2月', '3月', '4月', '5月', '6月']
    },
    yAxis: {
      type: 'value',
      min: 80,
      max: 100,
      axisLabel: {
        formatter: '{value}%'
      }
    },
    series: [
      {
        name: '平均健康度',
        type: 'line',
        smooth: true,
        data: [88, 92, 89, 91, 94, 90],
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return '#52c41a';
      case 'offline': return '#f5222d';
      case 'warning': return '#faad14';
      case 'maintenance': return '#722ed1';
      default: return '#d9d9d9';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return '在线';
      case 'offline': return '离线';
      case 'warning': return '告警';
      case 'maintenance': return '维护中';
      default: return '未知';
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'camera': return <CameraOutlined />;
      case 'access': return <LockOutlined />;
      case 'sensor': return <SecurityScanOutlined />;
      case 'network': return <WifiOutlined />;
      case 'alarm': return <BellOutlined />;
      case 'power': return <ThunderboltOutlined />;
      default: return <MonitorOutlined />;
    }
  };

  const getDeviceTypeText = (type: string) => {
    switch (type) {
      case 'camera': return '监控摄像头';
      case 'access': return '门禁设备';
      case 'sensor': return '传感器';
      case 'network': return '网络设备';
      case 'alarm': return '报警设备';
      case 'power': return '电源设备';
      default: return '其他设备';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return '#52c41a';
    if (score >= 70) return '#faad14';
    if (score >= 50) return '#fa8c16';
    return '#f5222d';
  };

  const columns = [
    { 
      title: '设备信息', 
      key: 'device',
      render: (_: any, record: any) => (
        <Space>
          <Avatar 
            icon={getDeviceIcon(record.type)}
            style={{ 
              backgroundColor: getStatusColor(record.status),
              color: 'white'
            }}
          />
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {getDeviceTypeText(record.type)} | {record.model}
            </div>
          </div>
        </Space>
      )
    },
    { 
      title: '位置', 
      dataIndex: 'location', 
      key: 'location'
    },
    { 
      title: 'IP地址', 
      dataIndex: 'ip', 
      key: 'ip',
      render: (ip: string) => (
        <code style={{ background: '#f0f0f0', padding: '2px 4px', borderRadius: '2px' }}>
          {ip}
        </code>
      )
    },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string, record: any) => (
        <Space>
          <Badge 
            status={status === 'online' ? 'success' : status === 'offline' ? 'error' : 'warning'} 
            text={getStatusText(status)} 
          />
          {record.faults > 0 && (
            <Tooltip title={`${record.faults}个故障`}>
              <WarningOutlined style={{ color: '#f5222d' }} />
            </Tooltip>
          )}
        </Space>
      )
    },
    { 
      title: '健康度', 
      dataIndex: 'healthScore', 
      key: 'healthScore',
      render: (score: number) => (
        <div style={{ width: 80 }}>
          <Progress 
            percent={score} 
            size="small"
            strokeColor={getHealthColor(score)}
            format={percent => `${percent}%`}
          />
        </div>
      )
    },
    { 
      title: '运行时间', 
      dataIndex: 'uptime', 
      key: 'uptime'
    },
    { 
      title: '下次维护', 
      dataIndex: 'nextMaintenance', 
      key: 'nextMaintenance',
      render: (date: string) => {
        const isOverdue = new Date(date) < new Date();
        const isDue = new Date(date) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        return (
          <span style={{ 
            color: isOverdue ? '#f5222d' : isDue ? '#faad14' : '#666'
          }}>
            {date}
            {isOverdue && ' (逾期)'}
            {!isOverdue && isDue && ' (即将到期)'}
          </span>
        );
      }
    },
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
          {/* <Button 
            type="link" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEditDevice(record)}
          >
            编辑
          </Button> */}
          <Button 
            type="link" 
            icon={<ToolOutlined />} 
            size="small"
            onClick={() => handleMaintenance(record)}
          >
            维护
          </Button>
          <Button 
            type="link" 
            icon={<SettingOutlined />} 
            size="small"
            onClick={() => handleConfig(record)}
          >
            配置
          </Button>
          <Popconfirm
            title="确认删除设备"
            description="删除后无法恢复，确认删除吗？"
            onConfirm={() => handleDeleteDevice(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <Button 
              type="link" 
              icon={<DeleteOutlined />} 
              size="small"
              danger
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    },
  ];

  const maintenanceColumns = [
    { title: '设备名称', dataIndex: 'deviceName', key: 'deviceName' },
    { 
      title: '维护类型', 
      dataIndex: 'type', 
      key: 'type',
      render: (type: string) => (
        <Tag color={type === '故障维修' ? '#f5222d' : type === '定期维护' ? '#52c41a' : '#1890ff'}>
          {type}
        </Tag>
      )
    },
    { title: '维护日期', dataIndex: 'date', key: 'date' },
    { title: '维护人员', dataIndex: 'technician', key: 'technician' },
    { title: '维护内容', dataIndex: 'description', key: 'description' },
    { 
      title: '维护结果', 
      dataIndex: 'result', 
      key: 'result',
      render: (result: string) => (
        <Tag color={result === '正常' ? '#52c41a' : result === '待处理' ? '#faad14' : '#f5222d'}>
          {result}
        </Tag>
      )
    },
    { title: '下次维护', dataIndex: 'nextDate', key: 'nextDate' },
  ];

  const showDetail = (record: any) => {
    setSelectedDevice(record);
    setIsModalVisible(true);
  };

  const handleMaintenance = (record: any) => {
    setSelectedDevice(record);
    maintenanceForm.setFieldsValue({
      deviceName: record.name,
      technician: '当前用户',
      date: dayjs(),
      type: '定期维护',
      description: '',
      result: '正常',
      nextDate: dayjs().add(30, 'day'), // 30天后
    });
    setIsMaintenanceModalVisible(true);
  };

  const handleConfig = (record: any) => {
    setSelectedDevice(record);
    configForm.setFieldsValue({
      name: record.name,
      ip: record.ip,
      firmware: record.firmware,
      uptime: record.uptime,
      healthScore: record.healthScore,
      status: record.status,
      faults: record.faults,
      lastMaintenance: record.lastMaintenance ? dayjs(record.lastMaintenance) : null,
      nextMaintenance: record.nextMaintenance ? dayjs(record.nextMaintenance) : null,
      warrantyExpiry: record.warrantyExpiry ? dayjs(record.warrantyExpiry) : null,
    });
    setIsConfigModalVisible(true);
  };

  const handleFirmwareUpgrade = (deviceId: number) => {
    Modal.confirm({
      title: '确认固件升级',
      content: '固件升级过程中设备将重启，确认继续吗？',
      onOk: () => {
        message.loading('固件升级中...', 2);
        setTimeout(() => {
          setDeviceData(prev => prev.map(d => 
            d.id === deviceId ? { 
              ...d, 
              firmware: `${d.firmware.split('.')[0]}.${parseInt(d.firmware.split('.')[1]) + 1}.0`,
              status: 'online',
              healthScore: Math.min(100, d.healthScore + 3)
            } : d
          ));
          message.success('固件升级完成');
        }, 2000);
      }
    });
  };

  const handleNetworkTest = (deviceId: number) => {
    message.loading('网络连接测试中...', 1);
    setTimeout(() => {
      const device = deviceData.find(d => d.id === deviceId);
      if (device) {
        const isOnline = Math.random() > 0.1; // 90%概率在线
        setDeviceData(prev => prev.map(d => 
          d.id === deviceId ? { 
            ...d, 
            status: isOnline ? 'online' : 'offline',
            uptime: isOnline ? '99.9%' : '0%'
          } : d
        ));
        message.success(isOnline ? '网络连接正常' : '网络连接异常');
      }
    }, 1000);
  };

  const getDeviceMaintenanceHistory = (deviceId: number) => {
    return maintenanceRecords.filter(record => record.deviceId === deviceId);
  };

  const handlePerformanceTest = (deviceId: number) => {
    message.loading('性能测试中...', 2);
    setTimeout(() => {
      setDeviceData(prev => prev.map(d => 
        d.id === deviceId ? { 
          ...d, 
          healthScore: Math.min(100, d.healthScore + Math.floor(Math.random() * 5)),
          uptime: `${(95 + Math.random() * 5).toFixed(1)}%`
        } : d
      ));
      message.success('性能测试完成');
    }, 2000);
  };

  const handleRestart = (record: any) => {
    Modal.confirm({
      title: '确认重启设备',
      content: `确认重启设备 "${record.name}" 吗？`,
      onOk: () => {
        message.success('设备重启命令已发送');
      }
    });
  };

  const handleRefresh = () => {
    // 模拟实时状态更新
    setDeviceData(prev => prev.map(device => {
      // 随机更新一些设备的状态
      if (Math.random() > 0.7) {
        const statusChange = Math.random() > 0.5 ? 1 : -1;
        return {
          ...device,
          healthScore: Math.max(0, Math.min(100, device.healthScore + statusChange)),
          uptime: `${(95 + Math.random() * 5).toFixed(1)}%`
        };
      }
      return device;
    }));
    message.success('设备状态已刷新');
  };

  const handleAlert = (deviceId: number, action: 'handle' | 'ignore') => {
    if (action === 'handle') {
      message.success('告警已处理');
      // 更新设备状态为在线
      setDeviceData(prev => prev.map(d => 
        d.id === deviceId ? { ...d, status: 'online', faults: Math.max(0, d.faults - 1) } : d
      ));
    } else {
      message.info('告警已忽略');
    }
  };

  const handleDeleteDevice = (deviceId: number) => {
    Modal.confirm({
      title: '确认删除设备',
      content: '删除后无法恢复，确认删除吗？',
      onOk: () => {
        setDeviceData(prev => prev.filter(d => d.id !== deviceId));
        message.success('设备删除成功');
      }
    });
  };

  const handleEditDevice = (record: any) => {
    setSelectedDevice(record);
    addDeviceForm.setFieldsValue({
      name: record.name,
      type: record.type,
      model: record.model,
      location: record.location,
      ip: record.ip,
      manufacturer: record.manufacturer,
      firmware: record.firmware,
      installDate: record.installDate ? dayjs(record.installDate) : null,
      warrantyExpiry: record.warrantyExpiry ? dayjs(record.warrantyExpiry) : null,
    });
    setIsAddDeviceModalVisible(true);
  };

  const handleToggleDeviceStatus = (deviceId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'online' ? 'offline' : 'online';
    setDeviceData(prev => prev.map(d => 
      d.id === deviceId ? { ...d, status: newStatus } : d
    ));
    message.success(`设备状态已切换为${newStatus === 'online' ? '在线' : '离线'}`);
  };

  const handleBatchEnable = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择设备');
      return;
    }
    setDeviceData(prev => prev.map(d => 
      selectedRowKeys.includes(d.id) ? { ...d, status: 'online' } : d
    ));
    message.success(`已启用 ${selectedRowKeys.length} 台设备`);
    setSelectedRowKeys([]);
  };

  const handleBatchDisable = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择设备');
      return;
    }
    setDeviceData(prev => prev.map(d => 
      selectedRowKeys.includes(d.id) ? { ...d, status: 'offline' } : d
    ));
    message.success(`已禁用 ${selectedRowKeys.length} 台设备`);
    setSelectedRowKeys([]);
  };

  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择设备');
      return;
    }
    Modal.confirm({
      title: '确认批量删除',
      content: `确认删除选中的 ${selectedRowKeys.length} 台设备吗？删除后无法恢复。`,
      onOk: () => {
        setDeviceData(prev => prev.filter(d => !selectedRowKeys.includes(d.id)));
        message.success(`已删除 ${selectedRowKeys.length} 台设备`);
        setSelectedRowKeys([]);
      }
    });
  };

  return (
    <div>
      <div className="page-header">
        <h1>设备管理</h1>
        <p>设备监控、设备维护、设备配置等设备管理功能</p>
      </div>

      {/* 设备统计 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="设备总数"
              value={deviceStats.total}
              prefix={<MonitorOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="在线设备"
              value={deviceStats.online}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="离线设备"
              value={deviceStats.offline}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="平均健康度"
              value={deviceStats.avgHealth}
              suffix="%"
              prefix={<ThunderboltOutlined />}
              valueStyle={{ color: getHealthColor(deviceStats.avgHealth) }}
            />
          </Card>
        </Col>
      </Row>

      {/* 设备状态概览 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="设备状态分布" size="small">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
                    {deviceStats.online}
                  </div>
                  <div style={{ color: '#666' }}>在线</div>
                </div>
              </Col>
              <Col span={8}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#faad14' }}>
                    {deviceStats.warning}
                  </div>
                  <div style={{ color: '#666' }}>告警</div>
                </div>
              </Col>
              <Col span={8}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f5222d' }}>
                    {deviceStats.offline}
                  </div>
                  <div style={{ color: '#666' }}>离线</div>
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="设备健康度" size="small">
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
                {deviceStats.avgHealth}%
              </div>
              <div style={{ color: '#666' }}>平均健康度</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* 维护提醒 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24}>
          <Card title="维护提醒" size="small">
            {deviceStats.maintenanceDue > 0 ? (
              <Alert
                message={`有 ${deviceStats.maintenanceDue} 台设备需要维护`}
                description="请及时安排设备维护，确保设备正常运行"
                type="warning"
                showIcon
                action={
                  <Button size="small" danger>
                    查看详情
                  </Button>
                }
              />
            ) : (
              <Alert
                message="所有设备维护计划正常"
                type="success"
                showIcon
              />
            )}
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="devices">
        <TabPane tab="设备列表" key="devices">
          {/* 设备列表 */}
          <Card 
            title="设备监控" 
            extra={
              <Space>
                <Button icon={<ReloadOutlined />} onClick={handleRefresh}>刷新</Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddDeviceModalVisible(true)}>
                  添加设备
                </Button>
              </Space>
            }
          >
            <Table
              columns={columns}
              dataSource={deviceData}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              size="small"
            />
          </Card>
        </TabPane>

        <TabPane tab="维护记录" key="maintenance">
          {/* 维护记录 */}
          <Card 
            title="设备维护记录" 
            extra={
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddMaintenanceModalVisible(true)}>
                新增维护记录
              </Button>
            }
          >
            <Table
              columns={maintenanceColumns}
              dataSource={maintenanceRecords}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              size="small"
            />
          </Card>
        </TabPane>

        <TabPane tab="设备告警" key="alerts">
          {/* 设备告警 */}
          <Card title="设备告警信息">
            <List
              dataSource={deviceData.filter(d => d.status === 'offline' || d.status === 'warning')}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button key="handle" type="link" onClick={() => handleAlert(item.id, 'handle')}>处理</Button>,
                    <Button key="ignore" type="link" onClick={() => handleAlert(item.id, 'ignore')}>忽略</Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar 
                        icon={getDeviceIcon(item.type)}
                        style={{ 
                          backgroundColor: getStatusColor(item.status),
                          color: 'white'
                        }}
                      />
                    }
                    title={
                      <Space>
                        <span>{item.name}</span>
                        <Tag color={getStatusColor(item.status)}>{getStatusText(item.status)}</Tag>
                      </Space>
                    }
                    description={
                      <div>
                        <div>位置: {item.location} | IP: {item.ip}</div>
                        <div>健康度: {item.healthScore}% | 故障数: {item.faults}</div>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* 设备详情模态框 */}
      <Modal
        title="设备详情"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="config" icon={<SettingOutlined />} onClick={() => handleConfig(selectedDevice)}>
            配置
          </Button>,
          <Button key="firmware" icon={<ToolOutlined />} onClick={() => handleFirmwareUpgrade(selectedDevice.id)}>
            固件升级
          </Button>,
          <Button key="network" icon={<WifiOutlined />} onClick={() => handleNetworkTest(selectedDevice.id)}>
            网络测试
          </Button>,
          <Button key="performance" icon={<ThunderboltOutlined />} onClick={() => handlePerformanceTest(selectedDevice.id)}>
            性能测试
          </Button>,
          <Button key="restart" onClick={() => handleRestart(selectedDevice)}>
            重启
          </Button>,
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={700}
      >
        {selectedDevice && (
          <div>
            <Row gutter={16}>
              <Col span={12}>
                <p><strong>设备名称:</strong> {selectedDevice.name}</p>
                <p><strong>设备类型:</strong> {getDeviceTypeText(selectedDevice.type)}</p>
                <p><strong>设备型号:</strong> {selectedDevice.model}</p>
                <p><strong>安装位置:</strong> {selectedDevice.location}</p>
                <p><strong>IP地址:</strong> {selectedDevice.ip}</p>
                <p><strong>制造商:</strong> {selectedDevice.manufacturer}</p>
              </Col>
              <Col span={12}>
                <p><strong>设备状态:</strong> 
                  <Tag color={getStatusColor(selectedDevice.status)} style={{ marginLeft: 8 }}>
                    {getStatusText(selectedDevice.status)}
                  </Tag>
                  <Switch
                    checked={selectedDevice.status === 'online'}
                    onChange={() => handleToggleDeviceStatus(selectedDevice.id, selectedDevice.status)}
                    style={{ marginLeft: 8 }}
                    checkedChildren="启用"
                    unCheckedChildren="禁用"
                  />
                </p>
                <p><strong>健康度:</strong> 
                  <Progress 
                    percent={selectedDevice.healthScore} 
                    size="small" 
                    strokeColor={getHealthColor(selectedDevice.healthScore)}
                    style={{ width: 100, marginLeft: 8 }}
                  />
                </p>
                <p><strong>运行时间:</strong> {selectedDevice.uptime}</p>
                <p><strong>固件版本:</strong> {selectedDevice.firmware}</p>
                <p><strong>安装日期:</strong> {selectedDevice.installDate}</p>
                <p><strong>保修到期:</strong> {selectedDevice.warrantyExpiry}</p>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <p><strong>最后维护:</strong> {selectedDevice.lastMaintenance}</p>
                <p><strong>下次维护:</strong> {selectedDevice.nextMaintenance}</p>
              </Col>
              <Col span={12}>
                <p><strong>故障次数:</strong> {selectedDevice.faults}</p>
              </Col>
            </Row>
            
            {/* 维护历史 */}
            <div style={{ marginTop: 16 }}>
              <h4>维护历史</h4>
              <List
                size="small"
                dataSource={getDeviceMaintenanceHistory(selectedDevice.id)}
                renderItem={(record: any) => (
                  <List.Item>
                    <div style={{ width: '100%' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span><strong>{record.type}</strong></span>
                        <span style={{ color: '#666', fontSize: '12px' }}>{record.date}</span>
                      </div>
                      <div style={{ color: '#666', fontSize: '12px' }}>维护人员: {record.technician}</div>
                      <div style={{ marginTop: 4 }}>{record.description}</div>
                      <div style={{ marginTop: 4 }}>
                        <Tag color={record.result === '正常' ? '#52c41a' : '#faad14'}>
                          {record.result}
                        </Tag>
                      </div>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          </div>
        )}
      </Modal>

      {/* 维护记录模态框 */}
      <Modal
        title="设备维护"
        open={isMaintenanceModalVisible}
        onOk={() => {
          maintenanceForm.validateFields().then(values => {
            // 创建新的维护记录
            const newMaintenanceRecord = {
              id: maintenanceRecords.length + 1,
              deviceId: selectedDevice?.id,
              deviceName: values.deviceName,
              type: values.type,
              date: values.date.format('YYYY-MM-DD'),
              technician: values.technician,
              description: values.description,
              result: values.result,
              nextDate: values.nextDate.format('YYYY-MM-DD'),
              status: '已完成',
              cost: 0
            };
            
            // 添加到维护记录列表
            setMaintenanceRecords(prev => [...prev, newMaintenanceRecord]);
            
            // 更新设备状态
            if (selectedDevice) {
              setDeviceData(prev => prev.map(d => 
                d.id === selectedDevice.id ? {
                  ...d,
                  lastMaintenance: values.date.format('YYYY-MM-DD'),
                  nextMaintenance: values.nextDate.format('YYYY-MM-DD'),
                  healthScore: Math.min(100, d.healthScore + 5), // 维护后健康度提升
                  faults: Math.max(0, d.faults - 1), // 故障数减少
                  status: 'online' // 维护后状态设为在线
                } : d
              ));
            }
            
            message.success('维护记录保存成功，设备状态已更新');
            setIsMaintenanceModalVisible(false);
            maintenanceForm.resetFields();
          });
        }}
        onCancel={() => {
          setIsMaintenanceModalVisible(false);
          maintenanceForm.resetFields();
        }}
        width={600}
      >
        <Form form={maintenanceForm} layout="vertical">
          <Form.Item name="deviceName" label="设备名称">
            <Input readOnly />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="type" label="维护类型" rules={[{ required: true, message: '请选择维护类型' }]}>
                <Select placeholder="请选择维护类型">
                  <Option value="定期维护">定期维护</Option>
                  <Option value="故障维修">故障维修</Option>
                  <Option value="预防性维护">预防性维护</Option>
                  <Option value="升级更新">升级更新</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="technician" label="维护人员" rules={[{ required: true, message: '请输入维护人员' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="date" label="维护日期" rules={[{ required: true, message: '请选择维护日期' }]}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="nextDate" label="下次维护日期">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="description" label="维护内容" rules={[{ required: true, message: '请输入维护内容' }]}>
            <TextArea rows={3} placeholder="请详细描述维护内容和过程" />
          </Form.Item>
          <Form.Item name="result" label="维护结果" rules={[{ required: true, message: '请选择维护结果' }]}>
            <Select placeholder="请选择维护结果">
              <Option value="正常">正常</Option>
              <Option value="需要跟进">需要跟进</Option>
              <Option value="待处理">待处理</Option>
              <Option value="已更换">已更换</Option>
            </Select>
          </Form.Item>
          <Form.Item name="notes" label="备注">
            <TextArea rows={2} placeholder="其他需要说明的信息" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加设备模态框 */}
      <Modal
        title="添加设备"
        open={isAddDeviceModalVisible}
        onOk={() => {
          addDeviceForm.validateFields().then(values => {
            console.log('添加设备:', values);
            const newDevice = {
              id: deviceData.length + 1, // 简单生成ID
              ...values,
              status: 'online', // 默认在线
              healthScore: 95, // 默认健康度
              uptime: '99.9%', // 默认运行时间
              faults: 0, // 默认故障数
              installDate: new Date().toISOString().split('T')[0], // 默认安装日期
              lastMaintenance: new Date().toISOString().split('T')[0], // 默认最后维护
              nextMaintenance: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 默认下次维护
              warrantyExpiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 默认保修到期
            };
            setDeviceData([...deviceData, newDevice]);
            message.success('设备添加成功');
            setIsAddDeviceModalVisible(false);
            addDeviceForm.resetFields();
          });
        }}
        onCancel={() => {
          setIsAddDeviceModalVisible(false);
          addDeviceForm.resetFields();
        }}
        width={600}
      >
        <Form form={addDeviceForm} layout="vertical">
          <Form.Item name="name" label="设备名称" rules={[{ required: true, message: '请输入设备名称' }]}>
            <Input />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="type" label="设备类型" rules={[{ required: true, message: '请选择设备类型' }]}>
                <Select placeholder="请选择设备类型">
                  <Option value="camera">监控摄像头</Option>
                  <Option value="access">门禁设备</Option>
                  <Option value="sensor">传感器</Option>
                  <Option value="network">网络设备</Option>
                  <Option value="power">电源设备</Option>
                  <Option value="alarm">报警设备</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="model" label="设备型号" rules={[{ required: true, message: '请输入设备型号' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="location" label="安装位置" rules={[{ required: true, message: '请输入安装位置' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="ip" label="IP地址" rules={[{ required: true, message: '请输入IP地址' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="manufacturer" label="制造商" rules={[{ required: true, message: '请输入制造商' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="firmware" label="固件版本">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="installDate" label="安装日期" rules={[{ required: true, message: '请选择安装日期' }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="warrantyExpiry" label="保修到期">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* 添加维护记录模态框 */}
      <Modal
        title="新增维护记录"
        open={isAddMaintenanceModalVisible}
        onOk={() => {
          addMaintenanceForm.validateFields().then(values => {
            console.log('新增维护记录:', values);
            const newRecord = {
              id: maintenanceRecords.length + 1, // 简单生成ID
              ...values,
              date: new Date().toISOString().split('T')[0],
              nextDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              status: '待处理', // 默认待处理
              cost: 0, // 默认成本
              notes: '' // 默认备注
            };
            setMaintenanceRecords([...maintenanceRecords, newRecord]);
            message.success('维护记录添加成功');
            setIsAddMaintenanceModalVisible(false);
            addMaintenanceForm.resetFields();
          });
        }}
        onCancel={() => {
          setIsAddMaintenanceModalVisible(false);
          addMaintenanceForm.resetFields();
        }}
        width={600}
      >
        <Form form={addMaintenanceForm} layout="vertical">
          <Form.Item name="deviceName" label="设备名称" rules={[{ required: true, message: '请选择设备' }]}>
            <Select
              placeholder="请选择设备"
              loading={loading}
              onSearch={async (value) => {
                setLoading(true);
                try {
                  const filtered = deviceData.filter(d => d.name.includes(value));
                  setDeviceData(filtered);
                } catch (e) {
                  message.error('搜索设备失败');
                } finally {
                  setLoading(false);
                }
              }}
              onSelect={(value) => {
                const selected = deviceData.find(d => d.name === value);
                if (selected) {
                  addMaintenanceForm.setFieldsValue({ deviceName: selected.name });
                  setDeviceData([selected]); // 只显示选中的设备
                }
              }}
            >
              {deviceData.map(d => (
                <Select.Option key={d.id} value={d.name}>
                  {d.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="type" label="维护类型" rules={[{ required: true, message: '请选择维护类型' }]}>
                <Select placeholder="请选择维护类型">
                  <Option value="定期维护">定期维护</Option>
                  <Option value="故障维修">故障维修</Option>
                  <Option value="预防性维护">预防性维护</Option>
                  <Option value="升级更新">升级更新</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="technician" label="维护人员" rules={[{ required: true, message: '请输入维护人员' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="date" label="维护日期" rules={[{ required: true, message: '请选择维护日期' }]}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="nextDate" label="下次维护日期">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="description" label="维护内容" rules={[{ required: true, message: '请输入维护内容' }]}>
            <TextArea rows={3} placeholder="请详细描述维护内容和过程" />
          </Form.Item>
          <Form.Item name="result" label="维护结果" rules={[{ required: true, message: '请选择维护结果' }]}>
            <Select placeholder="请选择维护结果">
              <Option value="正常">正常</Option>
              <Option value="需要跟进">需要跟进</Option>
              <Option value="待处理">待处理</Option>
              <Option value="已更换">已更换</Option>
            </Select>
          </Form.Item>
          <Form.Item name="cost" label="维护成本">
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item name="notes" label="备注">
            <TextArea rows={2} placeholder="其他需要说明的信息" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 配置设备模态框 */}
      <Modal
        title="设备配置"
        open={isConfigModalVisible}
        onOk={() => {
          configForm.validateFields().then(values => {
            // 更新设备配置
            if (selectedDevice) {
              setDeviceData(prev => prev.map(d => 
                d.id === selectedDevice.id ? {
                  ...d,
                  ip: values.ip,
                  firmware: values.firmware,
                  uptime: values.uptime,
                  healthScore: values.healthScore,
                  status: values.status,
                  faults: values.faults,
                  lastMaintenance: values.lastMaintenance ? values.lastMaintenance.toISOString().split('T')[0] : d.lastMaintenance,
                  nextMaintenance: values.nextMaintenance ? values.nextMaintenance.toISOString().split('T')[0] : d.nextMaintenance,
                  warrantyExpiry: values.warrantyExpiry ? values.warrantyExpiry.toISOString().split('T')[0] : d.warrantyExpiry,
                } : d
              ));
            }
            
            message.success('设备配置保存成功');
            setIsConfigModalVisible(false);
            configForm.resetFields();
          });
        }}
        onCancel={() => {
          setIsConfigModalVisible(false);
          configForm.resetFields();
        }}
        width={600}
      >
        <Form form={configForm} layout="vertical">
          <Form.Item name="name" label="设备名称" rules={[{ required: true, message: '请选择设备' }]}>
            <Select
              placeholder="请选择设备"
              loading={loading}
              onSearch={async (value) => {
                setLoading(true);
                try {
                  const filtered = deviceData.filter(d => d.name.includes(value));
                  setDeviceData(filtered);
                } catch (e) {
                  message.error('搜索设备失败');
                } finally {
                  setLoading(false);
                }
              }}
              onSelect={(value) => {
                const selected = deviceData.find(d => d.name === value);
                if (selected) {
                  configForm.setFieldsValue({ name: selected.name });
                  setDeviceData([selected]); // 只显示选中的设备
                }
              }}
            >
              {deviceData.map(d => (
                <Select.Option key={d.id} value={d.name}>
                  {d.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="ip" label="IP地址" rules={[{ required: true, message: '请输入IP地址' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="firmware" label="固件版本">
            <Input />
          </Form.Item>
          <Form.Item name="uptime" label="运行时间">
            <Input />
          </Form.Item>
          <Form.Item name="healthScore" label="健康度">
            <Input type="number" min={0} max={100} />
          </Form.Item>
          <Form.Item name="status" label="设备状态" rules={[{ required: true, message: '请选择设备状态' }]}>
            <Select placeholder="请选择设备状态">
              <Option value="online">在线</Option>
              <Option value="offline">离线</Option>
              <Option value="warning">告警</Option>
              <Option value="maintenance">维护中</Option>
            </Select>
          </Form.Item>
          <Form.Item name="faults" label="故障次数">
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item name="lastMaintenance" label="最后维护">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="nextMaintenance" label="下次维护">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="warrantyExpiry" label="保修到期">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeviceManagement;
