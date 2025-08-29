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
  InputNumber,
  Switch,
  Descriptions
} from 'antd';
import {
  SafetyOutlined,
  UserOutlined,
  TeamOutlined,
  KeyOutlined,
  CarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  ReloadOutlined,
  ExportOutlined,
  FilterOutlined,
} from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const SecurityManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isPatrolModalVisible, setIsPatrolModalVisible] = useState(false);
  const [isIncidentModalVisible, setIsIncidentModalVisible] = useState(false);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [editingPatrol, setEditingPatrol] = useState<any>(null);
  const [editingIncident, setEditingIncident] = useState<any>(null);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [patrolForm] = Form.useForm();
  const [incidentForm] = Form.useForm();
  const [filterForm] = Form.useForm();

  // 模拟安保人员数据
  const securityStaff = [
    { 
      id: 1, 
      name: '张建国', 
      employeeId: 'SEC001', 
      phone: '138****2695', 
      department: '保卫科', 
      position: '保安队长', 
      status: '在岗', 
      location: '门诊楼', 
      shift: '白班',
      lastCheckIn: '2025-08-30 08:00:00',
      experience: '5年'
    },
    { 
      id: 2, 
      name: '李明华', 
      employeeId: 'SEC002', 
      phone: '139****8597', 
      department: '保卫科', 
      position: '保安员', 
      status: '在岗', 
      location: '急诊科', 
      shift: '白班',
      lastCheckIn: '2025-08-30 08:00:00',
      experience: '3年'
    },
    { 
      id: 3, 
      name: '王德胜', 
      employeeId: 'SEC003', 
      phone: '137****9654', 
      department: '保卫科', 
      position: '保安员', 
      status: '休息', 
      location: '住院部', 
      shift: '夜班',
      lastCheckIn: '2025-08-30 20:00:00',
      experience: '2年'
    },
    { 
      id: 4, 
      name: '赵志强', 
      employeeId: 'SEC004', 
      phone: '136****5658', 
      department: '保卫科', 
      position: '保安员', 
      status: '在岗', 
      location: '停车场', 
      shift: '白班',
      lastCheckIn: '2025-08-30 08:00:00',
      experience: '4年'
    },
    {
      id: 5,
      name: '孙建军',
      employeeId: 'SEC005',
      phone: '135****9858',
      department: '保卫科',
      position: '保安员',
      status: '在岗',
      location: '医技楼',
      shift: '白班',
      lastCheckIn: '2025-08-30 08:00:00',
      experience: '1年'
    },
    {
      id: 6,
      name: '刘志刚',
      employeeId: 'SEC006',
      phone: '134****3454',
      department: '保卫科',
      position: '值班班长',
      status: '在岗',
      location: '监控中心',
      shift: '白班',
      lastCheckIn: '2025-08-30 08:00:00',
      experience: '8年'
    },
    {
      id: 7,
      name: '马国强',
      employeeId: 'SEC007',
      phone: '133****7869',
      department: '保卫科',
      position: '保安员',
      status: '休息',
      location: '手术室',
      shift: '夜班',
      lastCheckIn: '2025-08-14 20:00:00',
      experience: '3年'
    },
    {
      id: 8,
      name: '陈志明',
      employeeId: 'SEC008',
      phone: '132****4598',
      department: '保卫科',
      position: '保安员',
      status: '在岗',
      location: 'ICU',
      shift: '白班',
      lastCheckIn: '2025-08-30 08:00:00',
      experience: '2年'
    },
    {
      id: 9,
      name: '黄建军',
      employeeId: 'SEC009',
      phone: '131****6789',
      department: '保卫科',
      position: '保安员',
      status: '在岗',
      location: '食堂',
      shift: '白班',
      lastCheckIn: '2025-08-30 08:00:00',
      experience: '6年'
    },
    {
      id: 10,
      name: '周志强',
      employeeId: 'SEC010',
      phone: '130****8901',
      department: '保卫科',
      position: '保安员',
      status: '请假',
      location: '后勤区',
      shift: '白班',
      lastCheckIn: '2025-08-14 08:00:00',
      experience: '1年'
    },
    {
      id: 11,
      name: '吴德胜',
      employeeId: 'SEC011',
      phone: '159****1234',
      department: '保卫科',
      position: '保安员',
      status: '在岗',
      location: '血库',
      shift: '白班',
      lastCheckIn: '2025-08-30 08:00:00',
      experience: '4年'
    },
    {
      id: 12,
      name: '郑志刚',
      employeeId: 'SEC012',
      phone: '158****5678',
      department: '保卫科',
      position: '安保主管',
      status: '在岗',
      location: '保卫科办公室',
      shift: '白班',
      lastCheckIn: '2025-08-30 08:00:00',
      experience: '10年'
    },
    {
      id: 13,
      name: '冯志明',
      employeeId: 'SEC013',
      phone: '157****9012',
      department: '保卫科',
      position: '保安员',
      status: '在岗',
      location: '财务科',
      shift: '白班',
      lastCheckIn: '2025-08-30 08:00:00',
      experience: '3年'
    },
    {
      id: 14,
      name: '秦志强',
      employeeId: 'SEC014',
      phone: '156****3456',
      department: '保卫科',
      position: '保安员',
      status: '休息',
      location: '周界巡逻',
      shift: '夜班',
      lastCheckIn: '2025-08-14 20:00:00',
      experience: '5年'
    },
    {
      id: 15,
      name: '田志刚',
      employeeId: 'SEC015',
      phone: '155****7890',
      department: '保卫科',
      position: '保安员',
      status: '在岗',
      location: '配电房',
      shift: '白班',
      lastCheckIn: '2025-08-30 08:00:00',
      experience: '2年'
    }
  ];

  // 模拟巡逻记录数据
  const patrolRecords = [
    { 
      id: 1, 
      staff: '张建国', 
      route: '门诊楼-急诊科-住院部', 
      startTime: '2025-08-30 09:00:00', 
      endTime: '2025-08-30 10:30:00', 
      duration: '1小时30分钟', 
      status: '已完成', 
      issues: '无异常',
      checkPoints: 8
    },
    { 
      id: 2, 
      staff: '李明华', 
      route: '急诊科-药房-停车场', 
      startTime: '2025-08-30 10:00:00', 
      endTime: '2025-08-30 11:00:00', 
      duration: '1小时', 
      status: '进行中', 
      issues: '药房门口有人员聚集',
      checkPoints: 6
    },
    { 
      id: 3, 
      staff: '王德胜', 
      route: '住院部-门诊楼-后门', 
      startTime: '2025-08-30 21:00:00', 
      endTime: '2025-08-30 22:30:00', 
      duration: '1小时30分钟', 
      status: '已完成', 
      issues: '后门锁具松动',
      checkPoints: 7
    },
    {
      id: 4,
      staff: '孙建军',
      route: '医技楼-放射科-检验科',
      startTime: '2025-08-30 14:00:00',
      endTime: '2025-08-30 15:30:00',
      duration: '1小时30分钟',
      status: '已完成',
      issues: '检验科冰箱温度正常',
      checkPoints: 7
    },
    {
      id: 5,
      staff: '刘志刚',
      route: '监控中心全面检查',
      startTime: '2025-08-30 13:00:00',
      endTime: '2025-08-30 13:45:00',
      duration: '45分钟',
      status: '已完成',
      issues: '3号摄像头需要调整角度',
      checkPoints: 12
    },
    {
      id: 6,
      staff: '陈志明',
      route: 'ICU-手术室-血库',
      startTime: '2025-08-30 11:30:00',
      endTime: '2025-08-30 12:30:00',
      duration: '1小时',
      status: '已完成',
      issues: '手术室门锁需要润滑',
      checkPoints: 6
    },
    {
      id: 7,
      staff: '黄建军',
      route: '食堂-洗衣房-垃圾站',
      startTime: '2025-08-30 10:30:00',
      endTime: '2025-08-30 11:15:00',
      duration: '45分钟',
      status: '已完成',
      issues: '食堂燃气阀门正常',
      checkPoints: 4
    },
    {
      id: 8,
      staff: '吴德胜',
      route: '血库-财务科-院办',
      startTime: '2025-08-30 09:30:00',
      endTime: '2025-08-30 10:30:00',
      duration: '1小时',
      status: '已完成',
      issues: '财务科保险柜正常',
      checkPoints: 5
    },
    {
      id: 9,
      staff: '冯志明',
      route: '财务科专项检查',
      startTime: '2025-08-30 15:00:00',
      endTime: '2025-08-30 15:30:00',
      duration: '30分钟',
      status: '已完成',
      issues: '现金柜台安全正常',
      checkPoints: 3
    },
    {
      id: 10,
      staff: '田志刚',
      route: '配电房-锅炉房-机房',
      startTime: '2025-08-30 08:30:00',
      endTime: '2025-08-30 09:30:00',
      duration: '1小时',
      status: '已完成',
      issues: '配电房温度偏高需通风',
      checkPoints: 6
    },
    {
      id: 11,
      staff: '马国强',
      route: '手术室夜间巡查',
      startTime: '2025-08-14 22:00:00',
      endTime: '2025-08-14 22:45:00',
      duration: '45分钟',
      status: '已完成',
      issues: '手术器械室锁具正常',
      checkPoints: 8
    },
    {
      id: 12,
      staff: '秦志强',
      route: '周界围墙巡逻',
      startTime: '2025-08-14 21:00:00',
      endTime: '2025-08-14 22:30:00',
      duration: '1小时30分钟',
      status: '已完成',
      issues: '东墙监控盲区发现垃圾堆积',
      checkPoints: 15
    },
    {
      id: 13,
      staff: '张建国',
      route: '门诊楼夜间检查',
      startTime: '2025-08-14 23:00:00',
      endTime: '2025-08-14 23:45:00',
      duration: '45分钟',
      status: '已完成',
      issues: '各科室门窗关闭正常',
      checkPoints: 10
    },
    {
      id: 14,
      staff: '李明华',
      route: '急诊科-120站-停车场',
      startTime: '2025-08-14 19:30:00',
      endTime: '2025-08-14 20:30:00',
      duration: '1小时',
      status: '已完成',
      issues: '停车场照明需要修理',
      checkPoints: 7
    },
    {
      id: 15,
      staff: '王德胜',
      route: '住院部病区巡查',
      startTime: '2025-08-14 20:00:00',
      endTime: '2025-08-14 21:00:00',
      duration: '1小时',
      status: '已完成',
      issues: '病区走廊安全出口畅通',
      checkPoints: 9
    }
  ];

  // 模拟门禁记录数据
  const accessRecords = [
    { 
      id: 1, 
      person: '张医生', 
      cardId: 'CARD001', 
      location: '门诊楼1层', 
      time: '2025-08-30 15:30:00', 
      type: '刷卡进入', 
      status: '正常',
      department: '内科'
    },
    { 
      id: 2, 
      person: '李护士', 
      cardId: 'CARD002', 
      location: '住院部3层', 
      time: '2025-08-30 15:25:00', 
      type: '刷卡进入', 
      status: '正常',
      department: '护理部'
    },
    { 
      id: 3, 
      person: '王患者', 
      cardId: 'CARD003', 
      location: '急诊科', 
      time: '2025-08-30 15:20:00', 
      type: '刷卡进入', 
      status: '正常',
      department: '急诊科'
    },
    { 
      id: 4, 
      person: '未知人员', 
      cardId: 'CARD004', 
      location: '药房', 
      time: '2025-08-30 15:15:00', 
      type: '刷卡进入', 
      status: '异常',
      department: '未知'
    },
    {
      id: 5,
      person: '赵医生',
      cardId: 'CARD005',
      location: 'ICU',
      time: '2025-08-30 15:10:00',
      type: '刷卡进入',
      status: '正常',
      department: 'ICU'
    },
    {
      id: 6,
      person: '陈主任',
      cardId: 'CARD006',
      location: '手术室',
      time: '2025-08-30 15:05:00',
      type: '刷卡进入',
      status: '正常',
      department: '外科'
    },
    {
      id: 7,
      person: '孙护士',
      cardId: 'CARD007',
      location: '血库',
      time: '2025-08-30 15:00:00',
      type: '刷卡进入',
      status: '正常',
      department: '检验科'
    },
    {
      id: 8,
      person: '刘药师',
      cardId: 'CARD008',
      location: '药房',
      time: '2025-08-30 14:55:00',
      type: '刷卡进入',
      status: '正常',
      department: '药剂科'
    },
    {
      id: 9,
      person: '王主管',
      cardId: 'CARD009',
      location: '财务科',
      time: '2025-08-30 14:50:00',
      type: '刷卡进入',
      status: '正常',
      department: '财务科'
    },
    {
      id: 10,
      person: '张技师',
      cardId: 'CARD010',
      location: '放射科',
      time: '2025-08-30 14:45:00',
      type: '刷卡进入',
      status: '正常',
      department: '放射科'
    },
    {
      id: 11,
      person: '李工程师',
      cardId: 'CARD011',
      location: '配电房',
      time: '2025-08-30 14:40:00',
      type: '刷卡进入',
      status: '正常',
      department: '后勤科'
    },
    {
      id: 12,
      person: '马主任',
      cardId: 'CARD012',
      location: '院办',
      time: '2025-08-30 14:35:00',
      type: '刷卡进入',
      status: '正常',
      department: '院办'
    },
    {
      id: 13,
      person: '过期卡片',
      cardId: 'CARD013',
      location: '手术室',
      time: '2025-08-30 14:30:00',
      type: '刷卡进入',
      status: '异常',
      department: '未知'
    },
    {
      id: 14,
      person: '杨医生',
      cardId: 'CARD014',
      location: '检验科',
      time: '2025-08-30 14:25:00',
      type: '刷卡进入',
      status: '正常',
      department: '检验科'
    },
    {
      id: 15,
      person: '周护士',
      cardId: 'CARD015',
      location: '新生儿科',
      time: '2025-08-30 14:20:00',
      type: '刷卡进入',
      status: '正常',
      department: '妇产科'
    },
    {
      id: 16,
      person: '无效卡片',
      cardId: 'CARD016',
      location: '血库',
      time: '2025-08-30 14:15:00',
      type: '刷卡进入',
      status: '异常',
      department: '未知'
    },
    {
      id: 17,
      person: '吴医生',
      cardId: 'CARD017',
      location: '病理科',
      time: '2025-08-30 14:10:00',
      type: '刷卡进入',
      status: '正常',
      department: '病理科'
    },
    {
      id: 18,
      person: '郑主任',
      cardId: 'CARD018',
      location: '信息科',
      time: '2025-08-30 14:05:00',
      type: '刷卡进入',
      status: '正常',
      department: '信息科'
    },
    {
      id: 19,
      person: '黄保洁',
      cardId: 'CARD019',
      location: '食堂',
      time: '2025-08-30 14:00:00',
      type: '刷卡进入',
      status: '正常',
      department: '后勤科'
    },
    {
      id: 20,
      person: '冯医生',
      cardId: 'CARD020',
      location: '心内科',
      time: '2025-08-30 13:55:00',
      type: '刷卡进入',
      status: '正常',
      department: '心内科'
    }
  ];

  // 安全事件记录数据
  const securityIncidents = [
    {
      id: 1,
      type: '医疗纠纷',
      location: '门诊大厅',
      time: '2025-08-30 14:30:00',
      description: '患者对诊疗费用有异议，情绪激动',
      handler: '张建国',
      status: '已处理',
      severity: 'low',
      resolution: '协调医务科处理，患者情绪稳定'
    },
    {
      id: 2,
      type: '设备故障',
      location: '急诊科',
      time: '2025-08-30 11:20:00',
      description: '急诊科自动门故障，无法正常开关',
      handler: '李明华',
      status: '已处理',
      severity: 'medium',
      resolution: '联系维修人员，已修复'
    },
    {
      id: 3,
      type: '可疑人员',
      location: '住院部',
      time: '2025-08-30 09:15:00',
      description: '发现陌生人在病区游荡，行为可疑',
      handler: '王德胜',
      status: '已处理',
      severity: 'medium',
      resolution: '确认为新患者家属，已引导'
    },
    {
      id: 4,
      type: '火灾隐患',
      location: '食堂',
      time: '2025-08-14 16:45:00',
      description: '食堂后厨堆放杂物阻挡安全通道',
      handler: '黄建军',
      status: '已处理',
      severity: 'high',
      resolution: '立即清理通道，加强巡查'
    },
    {
      id: 5,
      type: '停车纠纷',
      location: '停车场',
      time: '2025-08-14 15:30:00',
      description: '两车主因停车位发生争执',
      handler: '赵志强',
      status: '已处理',
      severity: 'low',
      resolution: '协调解决，重新安排停车位'
    },
    {
      id: 6,
      type: '盗窃事件',
      location: '病房',
      time: '2025-08-14 13:20:00',
      description: '患者反映手机丢失',
      handler: '陈志明',
      status: '处理中',
      severity: 'high',
      resolution: '调取监控录像，配合公安调查'
    },
    {
      id: 7,
      type: '暴力事件',
      location: 'ICU',
      time: '2025-08-13 22:15:00',
      description: '患者家属因探视时间发生冲突',
      handler: '马国强',
      status: '已处理',
      severity: 'high',
      resolution: '制止冲突，说服教育后和解'
    },
    {
      id: 8,
      type: '环境安全',
      location: '配电房',
      time: '2025-08-13 19:00:00',
      description: '配电房门锁损坏，存在安全隐患',
      handler: '田志刚',
      status: '已处理',
      severity: 'high',
      resolution: '立即更换门锁，加强巡查'
    },
    {
      id: 9,
      type: '违规吸烟',
      location: '住院部走廊',
      time: '2025-08-13 17:30:00',
      description: '患者家属在病区走廊吸烟',
      handler: '吴德胜',
      status: '已处理',
      severity: 'medium',
      resolution: '制止吸烟行为，进行安全教育'
    },
    {
      id: 10,
      type: '紧急疏散',
      location: '医技楼',
      time: '2025-08-12 20:45:00',
      description: '放射科设备故障触发疏散警报',
      handler: '刘志刚',
      status: '已处理',
      severity: 'high',
      resolution: '组织人员有序疏散，确认安全后复原'
    },
    {
      id: 11,
      type: '网络安全',
      location: '信息科',
      time: '2025-08-12 16:20:00',
      description: '发现异常网络访问，疑似攻击',
      handler: '郑志刚',
      status: '已处理',
      severity: 'high',
      resolution: '立即断开网络，联系信息科处理'
    },
    {
      id: 12,
      type: '食品安全',
      location: '食堂',
      time: '2025-08-12 11:30:00',
      description: '发现过期食材仍在使用',
      handler: '孙建军',
      status: '已处理',
      severity: 'high',
      resolution: '立即停用并销毁，通报相关部门'
    },
    {
      id: 13,
      type: '设施损坏',
      location: '门诊大厅',
      time: '2025-08-11 14:15:00',
      description: '大厅玻璃门被撞裂',
      handler: '冯志明',
      status: '已处理',
      severity: 'medium',
      resolution: '设置警示标志，联系维修更换'
    },
    {
      id: 14,
      type: '违规入内',
      location: '手术室',
      time: '2025-08-11 10:00:00',
      description: '非手术人员试图进入手术区域',
      handler: '陈志明',
      status: '已处理',
      severity: 'high',
      resolution: '阻止入内，加强门禁管理'
    },
    {
      id: 15,
      type: '突发疾病',
      location: '停车场',
      time: '2025-08-10 18:30:00',
      description: '访客在停车场突发心脏病',
      handler: '秦志强',
      status: '已处理',
      severity: 'critical',
      resolution: '立即呼叫急救，配合医护抢救'
    }
  ];

  // 统计信息
  const stats = {
    totalStaff: securityStaff.length,
    onDuty: securityStaff.filter(s => s.status === '在岗').length,
    offDuty: securityStaff.filter(s => s.status === '休息').length,
    totalPatrols: patrolRecords.length,
    completedPatrols: patrolRecords.filter(p => p.status === '已完成').length,
    activePatrols: patrolRecords.filter(p => p.status === '进行中').length,
    totalAccess: accessRecords.length,
    normalAccess: accessRecords.filter(a => a.status === '正常').length,
    abnormalAccess: accessRecords.filter(a => a.status === '异常').length,
    totalIncidents: securityIncidents.length,
    resolvedIncidents: securityIncidents.filter(i => i.status === '已处理').length,
    pendingIncidents: securityIncidents.filter(i => i.status === '处理中').length,
    criticalIncidents: securityIncidents.filter(i => i.severity === 'critical').length,
    highIncidents: securityIncidents.filter(i => i.severity === 'high').length,
  };

  const staffColumns = [
    { 
      title: '姓名', 
      dataIndex: 'name', 
      key: 'name',
      render: (name: string, record: any) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <span>{name}</span>
        </Space>
      )
    },
    { title: '工号', dataIndex: 'employeeId', key: 'employeeId' },
    { title: '电话', dataIndex: 'phone', key: 'phone' },
    { title: '部门', dataIndex: 'department', key: 'department' },
    { title: '职位', dataIndex: 'position', key: 'position' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '在岗' ? 'green' : 'orange'}>{status}</Tag>
      )
    },
    { title: '当前位置', dataIndex: 'location', key: 'location' },
    { title: '班次', dataIndex: 'shift', key: 'shift' },
    { title: '操作', key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />} size="small" onClick={() => handleViewStaff(record)}>
            详情
          </Button>
          <Button type="link" icon={<EditOutlined />} size="small" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个安保人员吗？"
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

  const patrolColumns = [
    { title: '巡逻人员', dataIndex: 'staff', key: 'staff' },
    { title: '巡逻路线', dataIndex: 'route', key: 'route' },
    { title: '开始时间', dataIndex: 'startTime', key: 'startTime' },
    { title: '结束时间', dataIndex: 'endTime', key: 'endTime' },
    { title: '耗时', dataIndex: 'duration', key: 'duration' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '已完成' ? 'green' : status === '进行中' ? 'blue' : 'orange'}>
          {status}
        </Tag>
      )
    },
    { title: '发现问题', dataIndex: 'issues', key: 'issues' },
    { title: '检查点', dataIndex: 'checkPoints', key: 'checkPoints' },
    { title: '操作', key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />} size="small" onClick={() => handleViewPatrol(record)}>
            详情
          </Button>
          <Button type="link" icon={<EditOutlined />} size="small" onClick={() => handleEditPatrol(record)}>
            编辑
          </Button>
        </Space>
      )
    },
  ];

  const accessColumns = [
    { title: '人员姓名', dataIndex: 'person', key: 'person' },
    { title: '卡号', dataIndex: 'cardId', key: 'cardId' },
    { title: '门禁位置', dataIndex: 'location', key: 'location' },
    { title: '时间', dataIndex: 'time', key: 'time' },
    { title: '类型', dataIndex: 'type', key: 'type' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '正常' ? 'green' : 'red'}>{status}</Tag>
      )
    },
    { title: '部门', dataIndex: 'department', key: 'department' },
    { title: '操作', key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />} size="small" onClick={() => handleViewAccess(record)}>
            详情
          </Button>
          <Button type="link" icon={<EditOutlined />} size="small" onClick={() => handleEditAccess(record)}>
            编辑
          </Button>
        </Space>
      )
    },
  ];

  const incidentColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 60 },
    { title: '事件类型', dataIndex: 'type', key: 'type' },
    { title: '发生位置', dataIndex: 'location', key: 'location' },
    { title: '发生时间', dataIndex: 'time', key: 'time', width: 150 },
    { 
      title: '严重程度', 
      dataIndex: 'severity', 
      key: 'severity',
      render: (severity: string) => {
        const colors = {
          'low': 'green',
          'medium': 'orange', 
          'high': 'red',
          'critical': 'purple'
        };
        const labels = {
          'low': '低',
          'medium': '中',
          'high': '高',
          'critical': '紧急'
        };
        return <Tag color={colors[severity as keyof typeof colors]}>{labels[severity as keyof typeof labels]}</Tag>;
      }
    },
    { 
      title: '处理状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={status === '已处理' ? 'green' : 'orange'}>{status}</Tag>
      )
    },
    { title: '处理人员', dataIndex: 'handler', key: 'handler' },
    { 
      title: '事件描述', 
      dataIndex: 'description', 
      key: 'description',
      ellipsis: true,
      width: 200
    },
    { title: '操作', key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />} size="small" onClick={() => handleViewIncident(record)}>
            详情
          </Button>
          <Button type="link" icon={<EditOutlined />} size="small" onClick={() => handleEditIncident(record)}>
            编辑
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

  const handleDelete = (id: number) => {
    message.success('删除成功');
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      if (editingRecord) {
        message.success('更新成功');
      } else {
        message.success('添加成功');
      }
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // 安保人员管理相关函数
  const handleViewStaff = (record: any) => {
    setSelectedRecord(record);
    setIsDetailModalVisible(true);
  };

  // 巡逻管理相关函数
  const handleAddPatrol = () => {
    setEditingPatrol(null);
    patrolForm.resetFields();
    setIsPatrolModalVisible(true);
  };

  const handleEditPatrol = (record: any) => {
    setEditingPatrol(record);
    patrolForm.setFieldsValue(record);
    setIsPatrolModalVisible(true);
  };

  const handleViewPatrol = (record: any) => {
    setSelectedRecord(record);
    setIsDetailModalVisible(true);
  };

  const handlePatrolPlan = () => {
    message.info('巡逻计划功能开发中...');
  };

  const handleRefreshPatrol = () => {
    setLoading(true);
    setTimeout(() => {
      message.success('巡逻状态已刷新');
      setLoading(false);
    }, 1000);
  };

  // 门禁管理相关函数
  const handleViewAccess = (record: any) => {
    setSelectedRecord(record);
    setIsDetailModalVisible(true);
  };

  const handleEditAccess = (record: any) => {
    message.info('门禁记录编辑功能开发中...');
  };

  const handleFilterAccess = () => {
    setIsFilterModalVisible(true);
  };

  const handleExportAccess = () => {
    setLoading(true);
    setTimeout(() => {
      message.success('门禁记录导出成功');
      setLoading(false);
    }, 1500);
  };

  const handleRefreshAccess = () => {
    setLoading(true);
    setTimeout(() => {
      message.success('门禁数据已刷新');
      setLoading(false);
    }, 1000);
  };

  // 安全事件相关函数
  const handleAddIncident = () => {
    setEditingIncident(null);
    incidentForm.resetFields();
    setIsIncidentModalVisible(true);
  };

  const handleEditIncident = (record: any) => {
    setEditingIncident(record);
    incidentForm.setFieldsValue(record);
    setIsIncidentModalVisible(true);
  };

  const handleViewIncident = (record: any) => {
    setSelectedRecord(record);
    setIsDetailModalVisible(true);
  };

  const handleFilterIncident = () => {
    setIsFilterModalVisible(true);
  };

  const handleExportIncident = () => {
    setLoading(true);
    setTimeout(() => {
      message.success('安全事件报告导出成功');
      setLoading(false);
    }, 1500);
  };

  // 模态框相关函数
  const handlePatrolModalOk = () => {
    patrolForm.validateFields().then(values => {
      if (editingPatrol) {
        message.success('巡逻任务更新成功');
      } else {
        message.success('巡逻任务创建成功');
      }
      setIsPatrolModalVisible(false);
      patrolForm.resetFields();
    });
  };

  const handlePatrolModalCancel = () => {
    setIsPatrolModalVisible(false);
    patrolForm.resetFields();
  };

  const handleIncidentModalOk = () => {
    incidentForm.validateFields().then(values => {
      if (editingIncident) {
        message.success('安全事件更新成功');
      } else {
        message.success('安全事件上报成功');
      }
      setIsIncidentModalVisible(false);
      incidentForm.resetFields();
    });
  };

  const handleIncidentModalCancel = () => {
    setIsIncidentModalVisible(false);
    incidentForm.resetFields();
  };

  const handleFilterModalOk = () => {
    filterForm.validateFields().then(values => {
      message.success('筛选条件已应用');
      setIsFilterModalVisible(false);
      filterForm.resetFields();
    });
  };

  const handleFilterModalCancel = () => {
    setIsFilterModalVisible(false);
    filterForm.resetFields();
  };

  return (
    <div>
      <div className="page-header">
        <h1>安保管理</h1>
        <p>安保人员管理、巡逻管理、门禁管理等安保相关功能</p>
      </div>

      {/* 统计信息 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="安保人员总数"
              value={stats.totalStaff}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
            <div className="statistics-label">
              在岗: {stats.onDuty} | 休息: {stats.offDuty}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="巡逻任务"
              value={stats.totalPatrols}
              prefix={<CarOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
            <div className="statistics-label">
              已完成: {stats.completedPatrols} | 进行中: {stats.activePatrols}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="门禁记录"
              value={stats.totalAccess}
              prefix={<KeyOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
            <div className="statistics-label">
              正常: {stats.normalAccess} | 异常: {stats.abnormalAccess}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="安全事件"
              value={stats.totalIncidents}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
            <div className="statistics-label">
              已处理: {stats.resolvedIncidents} | 处理中: {stats.pendingIncidents}
            </div>
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1" size="large">
        <TabPane tab={<span><TeamOutlined />安保人员管理</span>} key="1">
          <Card>
            <div style={{ marginBottom: 16 }}>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
                添加安保人员
              </Button>
            </div>
            <Table
              columns={staffColumns}
              dataSource={securityStaff}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane tab={<span><CarOutlined />巡逻管理</span>} key="2">
          <Card>
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddPatrol}>
                  新建巡逻任务
                </Button>
                <Button icon={<CalendarOutlined />} onClick={handlePatrolPlan}>
                  巡逻计划
                </Button>
                <Button icon={<ReloadOutlined />} onClick={handleRefreshPatrol} loading={loading}>
                  刷新状态
                </Button>
              </Space>
            </div>
            <Table
              columns={patrolColumns}
              dataSource={patrolRecords}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane tab={<span><KeyOutlined />门禁管理</span>} key="3">
          <Card>
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Button icon={<FilterOutlined />} onClick={handleFilterAccess}>
                  筛选记录
                </Button>
                <Button icon={<ExportOutlined />} onClick={handleExportAccess} loading={loading}>
                  导出记录
                </Button>
                <Button icon={<ReloadOutlined />} onClick={handleRefreshAccess} loading={loading}>
                  刷新数据
                </Button>
              </Space>
            </div>
            <Table
              columns={accessColumns}
              dataSource={accessRecords}
              rowKey="id"
              pagination={{ pageSize: 10 }}
            />
          </Card>
        </TabPane>

        <TabPane tab={<span><ExclamationCircleOutlined />安全事件</span>} key="4">
          <Card>
            <div style={{ marginBottom: 16 }}>
              <Space>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleAddIncident}>
                  上报事件
                </Button>
                <Button icon={<FilterOutlined />} onClick={handleFilterIncident}>
                  筛选事件
                </Button>
                <Button icon={<ExportOutlined />} onClick={handleExportIncident} loading={loading}>
                  导出报告
                </Button>
              </Space>
            </div>
            <Table
              columns={incidentColumns}
              dataSource={securityIncidents}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </TabPane>

        <TabPane tab={<span><SafetyOutlined />安全监控</span>} key="5">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="实时监控" size="small">
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <SafetyOutlined style={{ fontSize: '48px', color: '#52c41a' }} />
                  <div style={{ marginTop: 16, color: '#666' }}>
                    安保系统运行正常
                  </div>
                  <div style={{ marginTop: 8, fontSize: '12px', color: '#999' }}>
                    最后更新: {new Date().toLocaleString()}
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="安全事件" size="small">
                <Timeline>
                  <Timeline.Item color="green">
                    <div style={{ fontSize: '12px' }}>
                      <div style={{ fontWeight: 'bold' }}>巡逻任务完成</div>
                      <div style={{ color: '#666' }}>张建国完成门诊楼巡逻 - 15:30</div>
                    </div>
                  </Timeline.Item>
                  <Timeline.Item color="blue">
                    <div style={{ fontSize: '12px' }}>
                      <div style={{ fontWeight: 'bold' }}>门禁异常</div>
                      <div style={{ color: '#666' }}>药房门禁检测到异常 - 15:15</div>
                    </div>
                  </Timeline.Item>
                  <Timeline.Item color="green">
                    <div style={{ fontSize: '12px' }}>
                      <div style={{ fontWeight: 'bold' }}>安保人员签到</div>
                      <div style={{ color: '#666' }}>李明华完成签到 - 08:00</div>
                    </div>
                  </Timeline.Item>
                </Timeline>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* 添加/编辑安保人员模态框 */}
      <Modal
        title={editingRecord ? '编辑安保人员' : '添加安保人员'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="employeeId" label="工号" rules={[{ required: true, message: '请输入工号' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="phone" label="电话" rules={[{ required: true, message: '请输入电话' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="department" label="部门" rules={[{ required: true, message: '请选择部门' }]}>
                <Select>
                  <Option value="保卫科">保卫科</Option>
                  <Option value="安全科">安全科</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="position" label="职位" rules={[{ required: true, message: '请选择职位' }]}>
                <Select>
                  <Option value="保安队长">保安队长</Option>
                  <Option value="保安员">保安员</Option>
                  <Option value="安全员">安全员</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="shift" label="班次" rules={[{ required: true, message: '请选择班次' }]}>
                <Select>
                  <Option value="白班">白班</Option>
                  <Option value="夜班">夜班</Option>
                  <Option value="中班">中班</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* 详情查看模态框 */}
      <Modal
        title="详细信息"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsDetailModalVisible(false)}>
            关闭
          </Button>
        ]}
        width={700}
      >
        {selectedRecord && (
          <Descriptions column={2} bordered>
            {Object.keys(selectedRecord).map(key => {
              if (key === 'id') return null;
              const label = {
                name: '姓名',
                employeeId: '工号',
                phone: '电话',
                department: '部门',
                position: '职位',
                status: '状态',
                location: '当前位置',
                shift: '班次',
                lastCheckIn: '最后签到',
                experience: '工作经验',
                staff: '巡逻人员',
                route: '巡逻路线',
                startTime: '开始时间',
                endTime: '结束时间',
                duration: '耗时',
                issues: '发现问题',
                checkPoints: '检查点',
                person: '人员姓名',
                cardId: '卡号',
                time: '时间',
                type: '类型',
                description: '事件描述',
                handler: '处理人员',
                resolution: '处理结果'
              }[key] || key;
              
              const value = selectedRecord[key];
              return (
                <Descriptions.Item key={key} label={label}>
                  {key === 'status' ? (
                    <Tag color={value === '在岗' || value === '已完成' || value === '正常' ? 'green' : 'orange'}>
                      {value}
                    </Tag>
                  ) : (
                    value
                  )}
                </Descriptions.Item>
              );
            })}
          </Descriptions>
        )}
      </Modal>

      {/* 巡逻任务模态框 */}
      <Modal
        title={editingPatrol ? '编辑巡逻任务' : '新建巡逻任务'}
        open={isPatrolModalVisible}
        onOk={handlePatrolModalOk}
        onCancel={handlePatrolModalCancel}
        width={700}
      >
        <Form form={patrolForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="staff" label="巡逻人员" rules={[{ required: true, message: '请选择巡逻人员' }]}>
                <Select placeholder="请选择巡逻人员">
                  {securityStaff.map(staff => (
                    <Option key={staff.id} value={staff.name}>{staff.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="route" label="巡逻路线" rules={[{ required: true, message: '请输入巡逻路线' }]}>
                <Input placeholder="请输入巡逻路线" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="startTime" label="开始时间" rules={[{ required: true, message: '请选择开始时间' }]}>
                <DatePicker showTime style={{ width: '100%' }} placeholder="请选择开始时间" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="checkPoints" label="检查点数量" rules={[{ required: true, message: '请输入检查点数量' }]}>
                <InputNumber style={{ width: '100%' }} min={1} max={20} placeholder="检查点数量" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* 安全事件模态框 */}
      <Modal
        title={editingIncident ? '编辑安全事件' : '上报安全事件'}
        open={isIncidentModalVisible}
        onOk={handleIncidentModalOk}
        onCancel={handleIncidentModalCancel}
        width={700}
      >
        <Form form={incidentForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="type" label="事件类型" rules={[{ required: true, message: '请选择事件类型' }]}>
                <Select placeholder="请选择事件类型">
                  <Option value="医疗纠纷">医疗纠纷</Option>
                  <Option value="设备故障">设备故障</Option>
                  <Option value="可疑人员">可疑人员</Option>
                  <Option value="火灾隐患">火灾隐患</Option>
                  <Option value="停车纠纷">停车纠纷</Option>
                  <Option value="盗窃事件">盗窃事件</Option>
                  <Option value="暴力事件">暴力事件</Option>
                  <Option value="环境安全">环境安全</Option>
                  <Option value="违规吸烟">违规吸烟</Option>
                  <Option value="紧急疏散">紧急疏散</Option>
                  <Option value="网络安全">网络安全</Option>
                  <Option value="食品安全">食品安全</Option>
                  <Option value="设施损坏">设施损坏</Option>
                  <Option value="违规入内">违规入内</Option>
                  <Option value="突发疾病">突发疾病</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="location" label="发生位置" rules={[{ required: true, message: '请输入发生位置' }]}>
                <Input placeholder="请输入发生位置" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="severity" label="严重程度" rules={[{ required: true, message: '请选择严重程度' }]}>
                <Select placeholder="请选择严重程度">
                  <Option value="low">低</Option>
                  <Option value="medium">中</Option>
                  <Option value="high">高</Option>
                  <Option value="critical">紧急</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="handler" label="处理人员" rules={[{ required: true, message: '请选择处理人员' }]}>
                <Select placeholder="请选择处理人员">
                  {securityStaff.map(staff => (
                    <Option key={staff.id} value={staff.name}>{staff.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="description" label="事件描述" rules={[{ required: true, message: '请输入事件描述' }]}>
            <TextArea rows={4} placeholder="请详细描述事件经过" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 筛选模态框 */}
      <Modal
        title="筛选条件"
        open={isFilterModalVisible}
        onOk={handleFilterModalOk}
        onCancel={handleFilterModalCancel}
        width={600}
      >
        <Form form={filterForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="dateRange" label="时间范围">
                <DatePicker.RangePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="status" label="状态">
                <Select placeholder="请选择状态" allowClear>
                  <Option value="正常">正常</Option>
                  <Option value="异常">异常</Option>
                  <Option value="在岗">在岗</Option>
                  <Option value="休息">休息</Option>
                  <Option value="已完成">已完成</Option>
                  <Option value="进行中">进行中</Option>
                  <Option value="已处理">已处理</Option>
                  <Option value="处理中">处理中</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="location" label="位置">
                <Input placeholder="请输入位置关键词" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="department" label="部门">
                <Select placeholder="请选择部门" allowClear>
                  <Option value="保卫科">保卫科</Option>
                  <Option value="安全科">安全科</Option>
                  <Option value="信息科">信息科</Option>
                  <Option value="财务科">财务科</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default SecurityManagement;
