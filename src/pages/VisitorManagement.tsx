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
  Avatar,
  Alert,
  message,
  Popconfirm,
  Tabs,
  List,
  Upload,
  Image,
  QRCode
} from 'antd';
import {
  UserAddOutlined,
  UserOutlined,
  PhoneOutlined,
  IdcardOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CameraOutlined,
  PrinterOutlined,
  UploadOutlined,
  SearchOutlined,
  FilterOutlined,
  ExportOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { TabPane } = Tabs;

const VisitorManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<any>(null);
  const [form] = Form.useForm();
  const [registerForm] = Form.useForm();

  // 符合兖州区人民医院规模的访客数据
  const visitorData = [
    { 
      id: 1, 
      name: '刘建华', 
      phone: '13705379001',
      idCard: '370829197501011234',
      company: '患者家属',
      visitPurpose: '探视患者',
      visitee: '刘老太',
      visitDepartment: '内科病区',
      checkInTime: '2025-08-30 09:30:00', 
      checkOutTime: '2025-08-30 11:00:00',
      status: '已离开', 
      photo: '/api/placeholder/60/60',
      qrCode: 'VIS20250115001',
      notes: '儿子探视住院母亲，已登记'
    },
    { 
      id: 2, 
      name: '王医生', 
      phone: '13705379002',
      idCard: '370829198203021234',
      company: '济宁市第一人民医院',
      visitPurpose: '学术交流',
      visitee: '张主任',
      visitDepartment: '外科',
      checkInTime: '2025-08-30 14:30:00', 
      checkOutTime: '',
      status: '在院内', 
      photo: '/api/placeholder/60/60',
      qrCode: 'VIS20250115002',
      notes: '来院进行手术技术交流'
    },
    { 
      id: 3, 
      name: '陈师傅', 
      phone: '13705379003',
      idCard: '370829196812031234',
      company: '电梯维修公司',
      visitPurpose: '设备维护',
      visitee: '后勤科',
      visitDepartment: '后勤科',
      checkInTime: '2025-08-30 10:00:00', 
      checkOutTime: '2025-08-30 11:30:00',
      status: '已离开', 
      photo: '/api/placeholder/60/60',
      qrCode: 'VIS20250115003',
      notes: '电梯月度保养维护'
    },
    { 
      id: 4, 
      name: '李大姐', 
      phone: '13705379004',
      idCard: '370829197409041234',
      company: '患者家属',
      visitPurpose: '陪护患者',
      visitee: '李小明',
      visitDepartment: '儿科',
      checkInTime: '2025-08-30 08:00:00', 
      checkOutTime: '',
      status: '在院内', 
      photo: '/api/placeholder/60/60',
      qrCode: 'VIS20250115004',
      notes: '孩子住院，母亲陪护'
    },
    { 
      id: 5, 
      name: '张药师', 
      phone: '13705379005',
      idCard: '370829198606051234',
      company: '山东康源医药',
      visitPurpose: '药品配送',
      visitee: '药剂科',
      visitDepartment: '药剂科',
      checkInTime: '2025-08-30 07:30:00', 
      checkOutTime: '2025-08-30 08:15:00',
      status: '已离开', 
      photo: '/api/placeholder/60/60',
      qrCode: 'VIS20250115005',
      notes: '常规药品配送'
    },
    { 
      id: 6, 
      name: '赵检察', 
      phone: '13705379006',
      idCard: '370829197807061234',
      company: '县卫健局',
      visitPurpose: '工作检查',
      visitee: '院长办公室',
      visitDepartment: '院办',
      checkInTime: '2025-08-14 15:00:00', 
      checkOutTime: '2025-08-14 17:00:00',
      status: '已离开', 
      photo: '/api/placeholder/60/60',
      qrCode: 'VIS20250114006',
      notes: '年度医疗质量检查'
    },
    {
      id: 7,
      name: '孙大爷',
      phone: '13705379007',
      idCard: '370829195012071234',
      company: '患者家属',
      visitPurpose: '探视患者',
      visitee: '孙大娘',
      visitDepartment: '心内科',
      checkInTime: '2025-08-14 14:30:00',
      checkOutTime: '2025-08-14 16:00:00',
      status: '已离开',
      photo: '/api/placeholder/60/60',
      qrCode: 'VIS20250114007',
      notes: '老伴住院，前来探视'
    },
    {
      id: 8,
      name: '马工程师',
      phone: '13705379008',
      idCard: '370829198509081234',
      company: '医疗设备公司',
      visitPurpose: '设备安装',
      visitee: '设备科',
      visitDepartment: '设备科',
      checkInTime: '2025-08-14 13:00:00',
      checkOutTime: '2025-08-14 15:30:00',
      status: '已离开',
      photo: '/api/placeholder/60/60',
      qrCode: 'VIS20250114008',
      notes: '新购CT设备调试安装'
    },
    {
      id: 9,
      name: '田记者',
      phone: '13705379009',
      idCard: '370829198710091234',
      company: '兖州日报',
      visitPurpose: '新闻采访',
      visitee: '宣传科',
      visitDepartment: '宣传科',
      checkInTime: '2025-08-14 10:00:00',
      checkOutTime: '2025-08-14 11:30:00',
      status: '已离开',
      photo: '/api/placeholder/60/60',
      qrCode: 'VIS20250114009',
      notes: '采访医院春节期间服务安排'
    },
    {
      id: 10,
      name: '何律师',
      phone: '13705379010',
      idCard: '370829198112101234',
      company: '山东正义律师事务所',
      visitPurpose: '法律咨询',
      visitee: '医务科',
      visitDepartment: '医务科',
      checkInTime: '2025-08-13 16:00:00',
      checkOutTime: '2025-08-13 17:00:00',
      status: '已离开',
      photo: '/api/placeholder/60/60',
      qrCode: 'VIS20250113010',
      notes: '医疗纠纷案件咨询'
    },
    {
      id: 11,
      name: '刘小华',
      phone: '13705379011',
      idCard: '370829199403111234',
      company: '患者家属',
      visitPurpose: '探视患者',
      visitee: '刘老爷',
      visitDepartment: '骨科',
      checkInTime: '2025-08-13 15:30:00',
      checkOutTime: '2025-08-13 17:30:00',
      status: '已离开',
      photo: '/api/placeholder/60/60',
      qrCode: 'VIS20250113011',
      notes: '父亲骨折手术后探视'
    },
    {
      id: 12,
      name: '黄主任',
      phone: '13705379012',
      idCard: '370829197204121234',
      company: '县中医院',
      visitPurpose: '业务交流',
      visitee: '中医科',
      visitDepartment: '中医科',
      checkInTime: '2025-08-13 14:00:00',
      checkOutTime: '2025-08-13 15:30:00',
      status: '已离开',
      photo: '/api/placeholder/60/60',
      qrCode: 'VIS20250113012',
      notes: '中医科室建设经验交流'
    },
    {
      id: 13,
      name: '吴师傅',
      phone: '13705379013',
      idCard: '370829196705131234',
      company: '清洁服务公司',
      visitPurpose: '保洁服务',
      visitee: '后勤科',
      visitDepartment: '后勤科',
      checkInTime: '2025-08-13 06:00:00',
      checkOutTime: '2025-08-13 18:00:00',
      status: '已离开',
      photo: '/api/placeholder/60/60',
      qrCode: 'VIS20250113013',
      notes: '医院深度保洁服务'
    },
    {
      id: 14,
      name: '齐大姐',
      phone: '13705379014',
      idCard: '370829196808141234',
      company: '患者家属',
      visitPurpose: '陪护患者',
      visitee: '齐婆婆',
      visitDepartment: '呼吸科',
      checkInTime: '2025-08-12 19:00:00',
      checkOutTime: '2025-08-13 08:00:00',
      status: '已离开',
      photo: '/api/placeholder/60/60',
      qrCode: 'VIS20250112014',
      notes: '夜间陪护呼吸科患者'
    },
    {
      id: 15,
      name: '宋工',
      phone: '13705379015',
      idCard: '370829198405151234',
      company: '网络公司',
      visitPurpose: '网络维护',
      visitee: '信息科',
      visitDepartment: '信息科',
      checkInTime: '2025-08-12 14:30:00',
      checkOutTime: '2025-08-12 16:00:00',
      status: '已离开',
      photo: '/api/placeholder/60/60',
      qrCode: 'VIS20250112015',
      notes: '医院网络系统升级维护'
    },
    {
      id: 16,
      name: '郑老师',
      phone: '13705379016',
      idCard: '370829197906161234',
      company: '医学院',
      visitPurpose: '实习指导',
      visitee: '教学办',
      visitDepartment: '教学办',
      checkInTime: '2025-08-12 09:00:00',
      checkOutTime: '2025-08-12 12:00:00',
      status: '已离开',
      photo: '/api/placeholder/60/60',
      qrCode: 'VIS20250112016',
      notes: '医学生实习带教指导'
    },
    {
      id: 17,
      name: '冯大婶',
      phone: '13705379017',
      idCard: '370829195507171234',
      company: '患者家属',
      visitPurpose: '探视患者',
      visitee: '冯大爷',
      visitDepartment: '神经内科',
      checkInTime: '2025-08-11 16:30:00',
      checkOutTime: '2025-08-11 18:00:00',
      status: '已离开',
      photo: '/api/placeholder/60/60',
      qrCode: 'VIS20250111017',
      notes: '探视中风住院的老伴'
    },
    {
      id: 18,
      name: '高总',
      phone: '13705379018',
      idCard: '370829197308181234',
      company: '医疗器械公司',
      visitPurpose: '商务洽谈',
      visitee: '院长办公室',
      visitDepartment: '院办',
      checkInTime: '2025-08-11 15:00:00',
      checkOutTime: '2025-08-11 16:30:00',
      status: '已离开',
      photo: '/api/placeholder/60/60',
      qrCode: 'VIS20250111018',
      notes: '医疗设备采购业务洽谈'
    },
    {
      id: 19,
      name: '罗护士',
      phone: '13705379019',
      idCard: '370829199011191234',
      company: '县妇幼保健院',
      visitPurpose: '学习交流',
      visitee: '妇产科',
      visitDepartment: '妇产科',
      checkInTime: '2025-08-11 13:30:00',
      checkOutTime: '2025-08-11 15:00:00',
      status: '已离开',
      photo: '/api/placeholder/60/60',
      qrCode: 'VIS20250111019',
      notes: '新生儿护理技术学习'
    },
    {
      id: 20,
      name: '韩小姐',
      phone: '13705379020',
      idCard: '370829199212201234',
      company: '保险公司',
      visitPurpose: '保险理赔',
      visitee: '医保科',
      visitDepartment: '医保科',
      checkInTime: '2025-08-11 10:00:00',
      checkOutTime: '2025-08-11 11:00:00',
      status: '已离开',
      photo: '/api/placeholder/60/60',
      qrCode: 'VIS20250111020',
      notes: '处理患者住院保险理赔'
    }
  ];

  // 访客统计
  const visitorStats = {
    todayTotal: visitorData.filter(v => v.checkInTime.includes('2025-08-30')).length,
    currentInHospital: visitorData.filter(v => v.status === '在院内').length,
    checkedOut: visitorData.filter(v => v.status === '已离开').length,
    thisWeekTotal: visitorData.length,
    thisMonthTotal: 168,
    averageVisitTime: 95 // 分钟
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '在院内': return '#1890ff';
      case '已离开': return '#52c41a';
      case '未到达': return '#faad14';
      case '已过期': return '#f5222d';
      default: return '#d9d9d9';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case '在院内': return <ClockCircleOutlined />;
      case '已离开': return <CheckCircleOutlined />;
      case '未到达': return <ClockCircleOutlined />;
      case '已过期': return <CloseCircleOutlined />;
      default: return <UserOutlined />;
    }
  };

  const columns = [
    { 
      title: '访客信息', 
      key: 'visitor',
      render: (_: any, record: any) => (
        <Space>
          <Avatar 
            size={40} 
            src={record.photo}
            icon={<UserOutlined />}
          />
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.name}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{record.phone}</div>
          </div>
        </Space>
      )
    },
    { 
      title: '身份证号', 
      dataIndex: 'idCard', 
      key: 'idCard',
      render: (idCard: string) => idCard.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2')
    },
    { title: '单位/关系', dataIndex: 'company', key: 'company' },
    { title: '来访目的', dataIndex: 'visitPurpose', key: 'visitPurpose' },
    { 
      title: '被访人', 
      key: 'visitee',
      render: (_: any, record: any) => (
        <div>
          <div>{record.visitee}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.visitDepartment}</div>
        </div>
      )
    },
    { title: '入院时间', dataIndex: 'checkInTime', key: 'checkInTime' },
    { 
      title: '状态', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)} icon={getStatusIcon(status)}>
          {status}
        </Tag>
      )
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
          {record.status === '在院内' && (
            <Button 
              type="link" 
              onClick={() => handleCheckOut(record)}
              size="small"
            >
              签出
            </Button>
          )}
          <Button 
            type="link" 
            icon={<PrinterOutlined />} 
            size="small"
            onClick={() => handlePrint(record)}
          >
            打印
          </Button>
        </Space>
      )
    },
  ];

  const showDetail = (record: any) => {
    setSelectedVisitor(record);
    setIsModalVisible(true);
  };

  const handleCheckOut = (record: any) => {
    Modal.confirm({
      title: '确认签出',
      content: `确认 ${record.name} 已离开医院？`,
      onOk: () => {
        message.success('签出成功');
      }
    });
  };

  const handlePrint = (record: any) => {
    message.info('正在打印访客通行证...');
  };

  const handleRegister = () => {
    setIsRegisterModalVisible(true);
  };

  const handleRegisterOk = () => {
    registerForm.validateFields().then(values => {
      console.log('新访客登记:', values);
      message.success('访客登记成功');
      setIsRegisterModalVisible(false);
      registerForm.resetFields();
    });
  };

  const todayVisitors = visitorData.filter(v => 
    dayjs(v.checkInTime).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')
  );

  return (
    <div>
      <div className="page-header">
        <h1>访客管理</h1>
        <p>访客登记、访客监控、访客统计等访客管理功能</p>
      </div>

      {/* 访客统计 */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="今日访客"
              value={visitorStats.todayTotal}
              prefix={<UserAddOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="在院访客"
              value={visitorStats.currentInHospital}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="已离开"
              value={visitorStats.checkedOut}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="statistics-card">
            <Statistic
              title="平均访问时长"
              value={visitorStats.averageVisitTime}
              suffix="分钟"
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="list">
        <TabPane tab="访客列表" key="list">
          {/* 访客列表 */}
          <Card 
            title="访客记录" 
            extra={
              <Space>
                <Button icon={<SearchOutlined />}>查询</Button>
                <Button icon={<FilterOutlined />}>筛选</Button>
                <Button icon={<ExportOutlined />}>导出</Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleRegister}>
                  访客登记
                </Button>
              </Space>
            }
          >
            <Table
              columns={columns}
              dataSource={visitorData}
              rowKey="id"
              pagination={{ pageSize: 10 }}
              size="small"
            />
          </Card>
        </TabPane>

        <TabPane tab="今日访客" key="today">
          {/* 今日访客 */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={16}>
              <Card title="今日访客动态" size="small">
                <List
                  dataSource={todayVisitors}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <Tag color={getStatusColor(item.status)} key="status">{item.status}</Tag>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.photo} icon={<UserOutlined />} />}
                        title={
                          <Space>
                            <span>{item.name}</span>
                            <span style={{ fontSize: '12px', color: '#666' }}>({item.company})</span>
                          </Space>
                        }
                        description={
                          <div>
                            <div>被访人: {item.visitee} ({item.visitDepartment})</div>
                            <div>入院时间: {item.checkInTime}</div>
                            <div>来访目的: {item.visitPurpose}</div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col xs={24} lg={8}>
              <Card title="快速统计" size="small">
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Statistic
                      title="本周访客总数"
                      value={visitorStats.thisWeekTotal}
                      valueStyle={{ color: '#1890ff' }}
                    />
                  </Col>
                  <Col span={24}>
                    <Statistic
                      title="本月访客总数"
                      value={visitorStats.thisMonthTotal}
                      valueStyle={{ color: '#52c41a' }}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="快速登记" key="register">
          {/* 快速登记表单 */}
          <Card title="访客快速登记">
            <Form
              layout="vertical"
              onFinish={handleRegisterOk}
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item name="name" label="访客姓名" rules={[{ required: true, message: '请输入访客姓名' }]}>
                    <Input prefix={<UserOutlined />} placeholder="请输入访客姓名" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name="phone" label="联系电话" rules={[{ required: true, message: '请输入联系电话' }]}>
                    <Input prefix={<PhoneOutlined />} placeholder="请输入联系电话" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item name="idCard" label="身份证号" rules={[{ required: true, message: '请输入身份证号' }]}>
                    <Input prefix={<IdcardOutlined />} placeholder="请输入身份证号" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name="company" label="单位/关系">
                    <Input placeholder="请输入单位或与患者关系" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item name="visitee" label="被访人" rules={[{ required: true, message: '请输入被访人' }]}>
                    <Input placeholder="请输入被访人姓名" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name="visitDepartment" label="科室" rules={[{ required: true, message: '请选择科室' }]}>
                    <Select placeholder="请选择科室">
                      <Option value="门诊部">门诊部</Option>
                      <Option value="内科">内科</Option>
                      <Option value="外科">外科</Option>
                      <Option value="妇产科">妇产科</Option>
                      <Option value="儿科">儿科</Option>
                      <Option value="急诊科">急诊科</Option>
                      <Option value="药剂科">药剂科</Option>
                      <Option value="院办">院办</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="visitPurpose" label="来访目的" rules={[{ required: true, message: '请输入来访目的' }]}>
                <Select placeholder="请选择来访目的">
                  <Option value="探视患者">探视患者</Option>
                  <Option value="业务洽谈">业务洽谈</Option>
                  <Option value="设备维护">设备维护</Option>
                  <Option value="药品配送">药品配送</Option>
                  <Option value="会议参加">会议参加</Option>
                  <Option value="其他">其他</Option>
                </Select>
              </Form.Item>
              <Form.Item name="photo" label="访客照片">
                <Upload
                  name="photo"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  beforeUpload={() => false}
                >
                  <div>
                    <CameraOutlined />
                    <div style={{ marginTop: 8 }}>拍照/上传</div>
                  </div>
                </Upload>
              </Form.Item>
              <Form.Item name="notes" label="备注">
                <TextArea rows={3} placeholder="请输入备注信息" />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="primary" htmlType="submit" size="large">
                    确认登记
                  </Button>
                  <Button size="large">
                    重置
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
      </Tabs>

      {/* 访客详情模态框 */}
      <Modal
        title="访客详情"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedVisitor && (
          <div>
            <Row gutter={16}>
              <Col span={8}>
                <Avatar 
                  size={80} 
                  src={selectedVisitor.photo}
                  icon={<UserOutlined />}
                />
                <div style={{ marginTop: 16 }}>
                  <QRCode 
                    value={selectedVisitor.qrCode} 
                    size={120}
                  />
                  <div style={{ textAlign: 'center', marginTop: 8, fontSize: '12px' }}>
                    {selectedVisitor.qrCode}
                  </div>
                </div>
              </Col>
              <Col span={16}>
                <Row gutter={[16, 8]}>
                  <Col span={12}><strong>姓名:</strong> {selectedVisitor.name}</Col>
                  <Col span={12}><strong>电话:</strong> {selectedVisitor.phone}</Col>
                  <Col span={12}><strong>身份证:</strong> {selectedVisitor.idCard.replace(/(\d{6})\d{8}(\d{4})/, '$1********$2')}</Col>
                  <Col span={12}><strong>单位:</strong> {selectedVisitor.company}</Col>
                  <Col span={12}><strong>被访人:</strong> {selectedVisitor.visitee}</Col>
                  <Col span={12}><strong>科室:</strong> {selectedVisitor.visitDepartment}</Col>
                  <Col span={24}><strong>来访目的:</strong> {selectedVisitor.visitPurpose}</Col>
                  <Col span={12}><strong>入院时间:</strong> {selectedVisitor.checkInTime}</Col>
                  <Col span={12}><strong>离院时间:</strong> {selectedVisitor.checkOutTime || '未离开'}</Col>
                  <Col span={24}>
                    <strong>状态:</strong> 
                    <Tag color={getStatusColor(selectedVisitor.status)} style={{ marginLeft: 8 }}>
                      {selectedVisitor.status}
                    </Tag>
                  </Col>
                  {selectedVisitor.notes && (
                    <Col span={24}>
                      <strong>备注:</strong>
                      <Alert message={selectedVisitor.notes} type="info" style={{ marginTop: 8 }} />
                    </Col>
                  )}
                </Row>
              </Col>
            </Row>
          </div>
        )}
      </Modal>

      {/* 访客登记模态框 */}
      <Modal
        title="访客登记"
        open={isRegisterModalVisible}
        onOk={handleRegisterOk}
        onCancel={() => {
          setIsRegisterModalVisible(false);
          registerForm.resetFields();
        }}
        width={700}
        okText="确认登记"
        cancelText="取消"
      >
        <Form form={registerForm} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="访客姓名" rules={[{ required: true, message: '请输入访客姓名' }]}>
                <Input prefix={<UserOutlined />} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="联系电话" rules={[{ required: true, message: '请输入联系电话' }]}>
                <Input prefix={<PhoneOutlined />} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="idCard" label="身份证号" rules={[{ required: true, message: '请输入身份证号' }]}>
                <Input prefix={<IdcardOutlined />} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="company" label="单位/关系">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="visitee" label="被访人" rules={[{ required: true, message: '请输入被访人' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="visitDepartment" label="科室" rules={[{ required: true, message: '请选择科室' }]}>
                <Select>
                  <Option value="门诊部">门诊部</Option>
                  <Option value="内科">内科</Option>
                  <Option value="外科">外科</Option>
                  <Option value="妇产科">妇产科</Option>
                  <Option value="儿科">儿科</Option>
                  <Option value="急诊科">急诊科</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="visitPurpose" label="来访目的" rules={[{ required: true, message: '请选择来访目的' }]}>
            <Select>
              <Option value="探视患者">探视患者</Option>
              <Option value="业务洽谈">业务洽谈</Option>
              <Option value="设备维护">设备维护</Option>
              <Option value="其他">其他</Option>
            </Select>
          </Form.Item>
          <Form.Item name="notes" label="备注">
            <TextArea rows={2} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VisitorManagement;
