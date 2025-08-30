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
  Row, 
  Col, 
  Statistic, 
  Progress,
  message,
  Popconfirm,
  Timeline,
  Descriptions
} from 'antd';
import {
  AlertOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  WarningOutlined,
  FilterOutlined,
  ExportOutlined,
  ReloadOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;

const AlarmManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedAlarm, setSelectedAlarm] = useState<any>(null);
  const [form] = Form.useForm();

  // 符合兖州区人民医院规模的报警数据
  const alarmData = [
    { 
      id: 1, 
      type: '门禁异常', 
      level: 'medium', 
      location: '药房入口', 
      device: '药房门禁-01', 
      time: '2025-08-29 09:15:00', 
      status: '已处理', 
      description: '药房工作人员忘记携带门禁卡，触发异常报警',
      operator: '李明华',
      processTime: '2025-08-29 09:20:00',
      processResult: '核实身份后正常进入，已提醒携带门禁卡'
    },
    { 
      id: 2, 
      type: '设备故障', 
      level: 'low', 
      location: '门诊大厅', 
      device: '监控摄像头-05', 
      time: '2025-08-29 08:30:00', 
      status: '待处理', 
      description: '门诊大厅监控画面模糊，可能镜头需要清洁',
      operator: '',
      processTime: '',
      processResult: ''
    },
    { 
      id: 3, 
      type: '人员滞留', 
      level: 'low', 
      location: '急诊科走廊', 
      device: '区域监控-02', 
      time: '2025-08-28 23:45:00', 
      status: '已处理', 
      description: '夜间急诊科走廊有人员长时间滞留',
      operator: '值班保安',
      processTime: '2025-08-28 23:50:00',
      processResult: '核实为等候家属，情况正常'
    },
    { 
      id: 4, 
      type: '烟雾报警', 
      level: 'high', 
      location: '配电房', 
      device: '烟感器-08', 
      time: '2025-08-28 16:20:00', 
      status: '已处理', 
      description: '配电房烟感器报警，检测到异常烟雾',
      operator: '维修工程师',
      processTime: '2025-08-28 16:25:00',
      processResult: '设备过热导致轻微烟雾，已检修排除故障'
    },
    { 
      id: 5, 
      type: '网络异常', 
      level: 'medium', 
      location: '信息科机房', 
      device: '网络交换机-01', 
      time: '2025-08-28 14:10:00', 
      status: '已处理', 
      description: '部分监控设备网络连接不稳定',
      operator: '网络管理员',
      processTime: '2025-08-28 14:30:00',
      processResult: '重启交换机，网络连接恢复正常'
    },
    { 
      id: 6, 
      type: '温度异常', 
      level: 'medium', 
      location: '疫苗冷库', 
      device: '温度传感器-03', 
      time: '2025-08-28 11:00:00', 
      status: '已处理', 
      description: '疫苗冷库温度超出正常范围',
      operator: '药剂科主任',
      processTime: '2025-08-28 11:15:00',
      processResult: '调整制冷设备参数，温度已恢复正常'
    },
    {
      id: 7,
      type: '入侵检测',
      level: 'high',
      location: '手术室区域',
      device: '红外探测器-12',
      time: '2025-08-28 02:30:00',
      status: '已处理',
      description: '手术室区域深夜检测到异常移动',
      operator: '夜班保安',
      processTime: '2025-08-28 02:35:00',
      processResult: '巡查确认为清洁工人正常工作，已登记'
    },
    {
      id: 8,
      type: '门禁异常',
      level: 'medium',
      location: '血库',
      device: '门禁控制器-07',
      time: '2025-08-13 18:45:00',
      status: '已处理',
      description: '非授权时间段有人员尝试进入血库',
      operator: '安保主管',
      processTime: '2025-08-13 18:50:00',
      processResult: '确认为值班医生紧急用血，已补充授权'
    },
    {
      id: 9,
      type: '设备故障',
      level: 'medium',
      location: 'ICU病房',
      device: '监控摄像头-15',
      time: '2025-08-13 16:20:00',
      status: '处理中',
      description: 'ICU监控设备断电，影响实时监控',
      operator: '技术维修组',
      processTime: '2025-08-13 16:25:00',
      processResult: '正在更换备用电源模块'
    },
    {
      id: 10,
      type: '火灾报警',
      level: 'critical',
      location: '医疗废物处理室',
      device: '烟感器-06',
      time: '2025-08-13 14:15:00',
      status: '已处理',
      description: '医疗废物处理室烟感器报警',
      operator: '消防值班员',
      processTime: '2025-08-13 14:18:00',
      processResult: '确认为焚烧炉正常工作产生烟雾，系统复位'
    },
    {
      id: 11,
      type: '水浸报警',
      level: 'high',
      location: '地下室药品仓库',
      device: '水浸传感器-02',
      time: '2025-08-13 10:30:00',
      status: '已处理',
      description: '药品仓库检测到地面积水',
      operator: '后勤维修班',
      processTime: '2025-08-13 10:45:00',
      processResult: '管道漏水已修复，药品未受影响'
    },
    {
      id: 12,
      type: '人员异常',
      level: 'medium',
      location: '新生儿科',
      device: '区域监控-08',
      time: '2025-08-12 22:15:00',
      status: '已处理',
      description: '新生儿科非探视时间发现陌生人员',
      operator: '科室护士长',
      processTime: '2025-08-12 22:20:00',
      processResult: '确认为新生儿家属，已引导至正确区域'
    },
    {
      id: 13,
      type: '门禁故障',
      level: 'low',
      location: '停车场入口',
      device: '车辆识别系统-01',
      time: '2025-08-12 19:00:00',
      status: '已处理',
      description: '停车场车牌识别系统无法正常识别',
      operator: '停车场管理员',
      processTime: '2025-08-12 19:10:00',
      processResult: '清洁摄像头镜头，系统恢复正常'
    },
    {
      id: 14,
      type: '温度异常',
      level: 'high',
      location: '血液透析室',
      device: '温度传感器-09',
      time: '2025-08-12 15:30:00',
      status: '已处理',
      description: '透析室室温过高，影响设备运行',
      operator: '空调维修工',
      processTime: '2025-08-12 15:45:00',
      processResult: '空调系统故障已修复，温度恢复正常'
    },
    {
      id: 15,
      type: '网络异常',
      level: 'medium',
      location: '放射科',
      device: '网络交换机-05',
      time: '2025-08-12 13:20:00',
      status: '已处理',
      description: '放射科监控设备网络连接中断',
      operator: 'IT技术员',
      processTime: '2025-08-12 13:35:00',
      processResult: '更换网络线缆，连接已恢复'
    },
    {
      id: 16,
      type: '周界入侵',
      level: 'medium',
      location: '医院后门',
      device: '周界探测器-03',
      time: '2025-08-11 23:45:00',
      status: '已处理',
      description: '医院后门周界检测到翻越行为',
      operator: '巡逻保安',
      processTime: '2025-08-11 23:50:00',
      processResult: '发现为流浪猫触发报警，无异常'
    },
    {
      id: 17,
      type: '设备离线',
      level: 'low',
      location: '康复科',
      device: '监控摄像头-22',
      time: '2025-08-11 20:10:00',
      status: '待处理',
      description: '康复科走廊监控设备离线',
      operator: '',
      processTime: '',
      processResult: ''
    },
    {
      id: 18,
      type: '门禁异常',
      level: 'medium',
      location: '财务科',
      device: '门禁控制器-04',
      time: '2025-08-11 17:30:00',
      status: '已处理',
      description: '财务科门禁卡读取异常',
      operator: '门禁维护员',
      processTime: '2025-08-11 17:40:00',
      processResult: '清洁读卡器，系统恢复正常'
    },
    {
      id: 19,
      type: '视频遮挡',
      level: 'low',
      location: '门诊药房',
      device: '监控摄像头-18',
      time: '2025-08-11 14:15:00',
      status: '已处理',
      description: '药房监控画面被药品展示架遮挡',
      operator: '药房主任',
      processTime: '2025-08-11 14:25:00',
      processResult: '调整展示架位置，监控视野恢复'
    },
    {
      id: 20,
      type: '电源异常',
      level: 'high',
      location: '医技楼UPS机房',
      device: 'UPS监控系统',
      time: '2025-08-11 11:00:00',
      status: '已处理',
      description: 'UPS电源系统电池电量异常',
      operator: '电工班长',
      processTime: '2025-08-11 11:20:00',
      processResult: '更换故障电池组，系统运行正常'
    }
  ];

  // 报警统计
  const alarmStats = {
    total: alarmData.length,
    pending: alarmData.filter(a => a.status === '待处理').length,
    processing: alarmData.filter(a => a.status === '处理中').length,
    resolved: alarmData.filter(a => a.status === '已处理').length,
    critical: alarmData.filter(a => a.level === 'critical').length,
    high: alarmData.filter(a => a.level === 'high').length,
    medium: alarmData.filter(a => a.level === 'medium').length,
    low: alarmData.filter(a => a.level === 'low').length,
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'critical': return '#f5222d';
      case 'high': return '#fa8c16';
      case 'medium': return '#faad14';
      case 'low': return '#52c41a';
      default: return '#d9d9d9';
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'critical': return '紧急';
      case 'high': return '高';
      case 'medium': return '中';
      case 'low': return '低';
      default: return '未知';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '待处理': return '#fa8c16';
      case '处理中': return '#1890ff';
      case '已处理': return '#52c41a';
      default: return '#d9d9d9';
    }
  };

  const columns = [
    { 
      title: '报警类型', 
      dataIndex: 'type', 
      key: 'type',
      render: (type: string, record: any) => (
        <Space>
          <AlertOutlined style={{ color: getLevelColor(record.level) }} />
          {type}
        </Space>
      )
    },
    { 
      title: '报警级别', 
      dataIndex: 'level', 
      key: 'level',
      render: (level: string) => (
        <Tag color={getLevelColor(level)}>{getLevelText(level)}</Tag>
      )
    },
    { title: '发生位置', dataIndex: 'location', key: 'location' },
    { title: '设备名称', dataIndex: 'device', key: 'device' },
    { title: '报警时间', dataIndex: 'time', key: 'time' },
    { 
      title: '处理状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      )
    },
    { title: '操作', key: 'action',
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
          {record.status === '待处理' && (
            <Button 
              type="link" 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => handleProcess(record)}
            >
              处理
            </Button>
          )}
          <Popconfirm
            title="确定要删除这个报警记录吗？"
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

  const showDetail = (record: any) => {
    setSelectedAlarm(record);
    setIsDetailModalVisible(true);
  };

  const handleProcess = (record: any) => {
    setSelectedAlarm(record);
    form.setFieldsValue({
      operator: '当前用户',
      processResult: '',
    });
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    message.success('删除成功');
  };

  const handleProcessOk = () => {
    form.validateFields().then(values => {
      message.success('处理成功');
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleProcessCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div>
      <div className="page-header">
        <h1>报警管理</h1>
        <p>实时报警监控、报警处理、报警统计等报警管理功能</p>
      </div>

      {/* 报警统计 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="总报警数"
              value={alarmStats.total}
              prefix={<AlertOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="待处理"
              value={alarmStats.pending}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="处理中"
              value={alarmStats.processing}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="已处理"
              value={alarmStats.resolved}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 报警级别统计 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card title="报警级别分布" size="small">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>紧急</span>
                    <span>{alarmStats.critical}</span>
                  </div>
                  <Progress percent={(alarmStats.critical / alarmStats.total) * 100} strokeColor="#f5222d" />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>高级</span>
                    <span>{alarmStats.high}</span>
                  </div>
                  <Progress percent={(alarmStats.high / alarmStats.total) * 100} strokeColor="#fa8c16" />
                </div>
              </Col>
              <Col span={12}>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>中级</span>
                    <span>{alarmStats.medium}</span>
                  </div>
                  <Progress percent={(alarmStats.medium / alarmStats.total) * 100} strokeColor="#faad14" />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>低级</span>
                    <span>{alarmStats.low}</span>
                  </div>
                  <Progress percent={(alarmStats.low / alarmStats.total) * 100} strokeColor="#52c41a" />
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="实时报警" size="small">
            <Timeline>
              {alarmData.slice(0, 5).map(alarm => (
                <Timeline.Item 
                  key={alarm.id}
                  color={getLevelColor(alarm.level)}
                  dot={alarm.level === 'critical' ? <WarningOutlined /> : undefined}
                >
                  <div style={{ fontSize: '12px' }}>
                    <div style={{ fontWeight: 'bold' }}>{alarm.type}</div>
                    <div style={{ color: '#666' }}>{alarm.location} - {alarm.time}</div>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
      </Row>

      {/* 报警列表 */}
      <Card 
        title="报警列表" 
        extra={
          <Space>
            <Button icon={<FilterOutlined />}>筛选</Button>
            <Button icon={<ExportOutlined />}>导出</Button>
            <Button icon={<ReloadOutlined />}>刷新</Button>
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={alarmData}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          size="small"
        />
      </Card>

      {/* 报警处理模态框 */}
      <Modal
        title="报警处理"
        open={isModalVisible}
        onOk={handleProcessOk}
        onCancel={handleProcessCancel}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="报警类型">
                <Input value={selectedAlarm?.type} readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="报警级别">
                <Input value={getLevelText(selectedAlarm?.level)} readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="发生位置">
                <Input value={selectedAlarm?.location} readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="设备名称">
                <Input value={selectedAlarm?.device} readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="报警描述">
            <TextArea value={selectedAlarm?.description} readOnly rows={3} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="operator" label="处理人员" rules={[{ required: true, message: '请输入处理人员' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="处理时间">
                <Input value={new Date().toLocaleString()} readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="processResult" label="处理结果" rules={[{ required: true, message: '请输入处理结果' }]}>
            <TextArea rows={3} placeholder="请描述处理过程和结果" />
          </Form.Item>
        </Form>
      </Modal>

      {/* 报警详情模态框 */}
      <Modal
        title="报警详情"
        open={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedAlarm && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="报警类型">{selectedAlarm.type}</Descriptions.Item>
            <Descriptions.Item label="报警级别">
              <Tag color={getLevelColor(selectedAlarm.level)}>{getLevelText(selectedAlarm.level)}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="发生位置">{selectedAlarm.location}</Descriptions.Item>
            <Descriptions.Item label="设备名称">{selectedAlarm.device}</Descriptions.Item>
            <Descriptions.Item label="报警时间">{selectedAlarm.time}</Descriptions.Item>
            <Descriptions.Item label="处理状态">
              <Tag color={getStatusColor(selectedAlarm.status)}>{selectedAlarm.status}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="报警描述">{selectedAlarm.description}</Descriptions.Item>
            {selectedAlarm.operator && (
              <>
                <Descriptions.Item label="处理人员">{selectedAlarm.operator}</Descriptions.Item>
                <Descriptions.Item label="处理时间">{selectedAlarm.processTime}</Descriptions.Item>
                <Descriptions.Item label="处理结果">{selectedAlarm.processResult}</Descriptions.Item>
              </>
            )}
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default AlarmManagement;
