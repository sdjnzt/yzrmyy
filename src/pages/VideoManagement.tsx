import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Button, 
  Space, 
  Select, 
  Input, 
  Table, 
  Tag, 
  Modal, 
  Form, 
  InputNumber,
  DatePicker,
  TimePicker,
  message,
  Tabs,
  Badge,
  Tooltip
} from 'antd';
import {
  VideoCameraOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  DownloadOutlined,
  SettingOutlined,
  FullscreenOutlined,
  ReloadOutlined,
  SearchOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

const VideoManagement: React.FC = () => {
  const [selectedCamera, setSelectedCamera] = useState<string>('1');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [form] = Form.useForm();

  // 实时更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 模拟摄像头数据
  const cameras = [
    { id: '1', name: '门诊楼大厅-01', location: '门诊楼1层大厅', status: '在线', type: '高清球机', resolution: '1080P' },
    { id: '2', name: '门诊大楼停车场-02', location: '急诊科入口', status: '在线', type: '高清枪机', resolution: '1080P' },
    { id: '3', name: '停车棚-03', location: '住院部2层走廊', status: '在线', type: '高清球机', resolution: '1080P' },
    { id: '4', name: '药房窗口-04', location: '药房窗口', status: '离线', type: '高清枪机', resolution: '720P' },
    { id: '5', name: '停车场-05', location: '地下停车场', status: '在线', type: '高清球机', resolution: '1080P' },
    { id: '6', name: '后门通道-06', location: '医院后门', status: '在线', type: '高清枪机', resolution: '1080P' },
  ];

  // 模拟录像数据
  const recordings = [
    { id: 1, camera: '门诊楼大厅-01', startTime: '2025-08-15 14:00:00', endTime: '2025-08-15 15:00:00', duration: '1小时', size: '2.5GB', type: '定时录像' },
    { id: 2, camera: '急诊科入口-02', startTime: '2025-08-15 13:00:00', endTime: '2025-08-15 14:00:00', duration: '1小时', size: '2.3GB', type: '定时录像' },
    { id: 3, camera: '住院部走廊-03', startTime: '2025-08-15 12:00:00', endTime: '2025-08-15 13:00:00', duration: '1小时', size: '2.4GB', type: '定时录像' },
    { id: 4, camera: '门诊楼大厅-01', startTime: '2025-08-15 11:00:00', endTime: '2025-08-15 12:00:00', duration: '1小时', size: '2.5GB', type: '报警录像' },
  ];

  const recordingColumns = [
    { title: '摄像头', dataIndex: 'camera', key: 'camera' },
    { title: '开始时间', dataIndex: 'startTime', key: 'startTime' },
    { title: '结束时间', dataIndex: 'endTime', key: 'endTime' },
    { title: '时长', dataIndex: 'duration', key: 'duration' },
    { title: '文件大小', dataIndex: 'size', key: 'size' },
    { title: '录像类型', dataIndex: 'type', key: 'type',
      render: (type: string) => (
        <Tag color={type === '报警录像' ? 'red' : 'blue'}>{type}</Tag>
      )
    },
    { title: '操作', key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" icon={<PlayCircleOutlined />} size="small">
            播放
          </Button>
          <Button type="link" icon={<DownloadOutlined />} size="small">
            下载
          </Button>
        </Space>
      )
    },
  ];

  const handleCameraChange = (value: string) => {
    setSelectedCamera(value);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    message.info(isFullscreen ? '退出全屏' : '进入全屏');
  };

  const handleRecording = () => {
    setIsRecording(!isRecording);
    message.success(isRecording ? '停止录像' : '开始录像');
  };

  const handleSearch = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      console.log('搜索条件:', values);
      message.success('搜索完成');
      setIsModalVisible(false);
    });
  };

  const renderVideoPlayer = () => {
    const camera = cameras.find(c => c.id === selectedCamera);
    
    // 根据摄像头ID选择对应的媒体文件
    const getCameraMedia = (cameraId: string) => {
      switch (cameraId) {
        case '1': return { type: 'video', src: '/img/11.mp4' }; // 门诊楼大厅-01 - 视频
        case '2': return { type: 'image', src: '/img/13.png' }; // 急诊科入口-02
        case '3': return { type: 'image', src: '/img/14.png' }; // 住院部走廊-03
        case '4': return { type: 'image', src: '/img/12.png' }; // 药房窗口-04
        case '5': return { type: 'image', src: '/img/13.png' }; // 停车场-05
        case '6': return { type: 'image', src: '/img/14.png' }; // 后门通道-06
        default: return { type: 'image', src: '/img/12.png' };
      }
    };
    
    const mediaInfo = camera ? getCameraMedia(camera.id) : { type: 'image', src: '/img/12.png' };
    
    return (
      <div style={{ 
        background: '#000', 
        height: isFullscreen ? '70vh' : '400px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        position: 'relative',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '2px solid #333',
        boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)'
      }}>
        {camera?.status === '在线' ? (
          mediaInfo.type === 'video' ? (
            <video 
              src={mediaInfo.src}
              autoPlay
              loop
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '6px'
              }}
            />
          ) : (
            <img 
              src={mediaInfo.src} 
              alt={camera.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '6px'
              }}
            />
          )
        ) : (
          <div style={{ textAlign: 'center', color: '#fff' }}>
            <VideoCameraOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
            <div>{camera?.name}</div>
            <div style={{ fontSize: '12px', marginTop: '8px', opacity: 0.7 }}>
              设备离线
            </div>
          </div>
        )}
        
                 {/* 监控系统时间戳 */}
         <div style={{
           position: 'absolute',
           top: '16px',
           right: '16px',
           background: 'rgba(0, 0, 0, 0.8)',
           color: '#fff',
           padding: '6px 10px',
           borderRadius: '4px',
           fontSize: '11px',
           fontFamily: 'monospace',
           border: '1px solid #444'
         }}>
           {currentTime.toLocaleString('zh-CN', {
             year: 'numeric',
             month: '2-digit',
             day: '2-digit',
             hour: '2-digit',
             minute: '2-digit',
             second: '2-digit'
           })}
         </div>
        
        {/* 摄像头信息覆盖层 */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          border: '1px solid #444',
          minWidth: '180px'
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{camera?.name}</div>
          <div style={{ fontSize: '11px', opacity: 0.9, marginBottom: '4px' }}>{camera?.location}</div>
          <div style={{ color: '#52c41a', fontSize: '11px' }}>● 在线 | {camera?.type} | {camera?.resolution}</div>
        </div>
        

        
        {/* 录制状态指示器 */}
        {isRecording && (
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(255, 0, 0, 0.8)',
            color: '#fff',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: 'bold',
            border: '1px solid #ff0000',
            animation: 'blink 1s infinite'
          }}>
            ● REC
          </div>
        )}
        
        {/* LIVE 指示器 */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(255, 0, 0, 0.9)',
          color: '#fff',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: 'bold',
          border: '1px solid #ff0000',
          marginTop: isRecording ? '40px' : '0px'
        }}>
          ● LIVE
        </div>
        
        {/* 控制按钮 */}
        <div style={{ 
          position: 'absolute', 
          bottom: '16px', 
          left: '50%', 
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px'
        }}>
          <Button 
            type={isRecording ? 'primary' : 'default'} 
            icon={isRecording ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
            onClick={handleRecording}
            size="small"
            style={{
              background: isRecording ? '#ff4d4f' : 'rgba(0,0,0,0.7)',
              borderColor: isRecording ? '#ff4d4f' : '#444',
              color: '#fff'
            }}
          >
            {isRecording ? '停止' : '录像'}
          </Button>
          <Button 
            icon={<FullscreenOutlined />} 
            onClick={handleFullscreen}
            size="small"
            style={{
              background: 'rgba(0,0,0,0.7)',
              borderColor: '#444',
              color: '#fff'
            }}
          >
            全屏
          </Button>
        </div>
        
        {/* 监控画面边框装饰 */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '8px',
          right: '8px',
          bottom: '8px',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '4px',
          pointerEvents: 'none'
        }} />
        
        {/* 画面质量指示器 */}
        <div style={{
          position: 'absolute',
          bottom: '50px',
          right: '16px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '10px',
          border: '1px solid #444'
        }}>
          {camera?.resolution} | 实时
        </div>
        
        {/* 信号强度指示器 */}
        <div style={{
          position: 'absolute',
          bottom: '50px',
          left: '16px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '10px',
          border: '1px solid #444'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>信号:</span>
            <div style={{ display: 'flex', gap: '1px' }}>
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} style={{
                  width: '3px',
                  height: `${(i + 1) * 3}px`,
                  background: i < 4 ? '#52c41a' : '#666',
                  borderRadius: '1px'
                }} />
              ))}
            </div>
          </div>
        </div>
        
        {/* 帧率指示器 */}
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '16px',
          background: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '10px',
          border: '1px solid #444'
        }}>
          25 FPS | 流畅
        </div>
      </div>
    );
  };

  return (
    <div>
             <style>
         {`
           @keyframes blink {
             0%, 50% { opacity: 1; }
             51%, 100% { opacity: 0.3; }
           }
         `}
       </style>
      
      <div className="page-header">
        <h1>视频管理</h1>
        <p>实时监控、录像回放、视频配置等视频管理功能</p>
      </div>

      <Row gutter={[16, 16]}>
        {/* 左侧摄像头列表 */}
        <Col xs={24} lg={8}>
          <Card title="摄像头列表" size="small">
            <div style={{ marginBottom: 16 }}>
              <Input 
                placeholder="搜索摄像头" 
                prefix={<SearchOutlined />} 
                style={{ marginBottom: 8 }}
              />
              <Select 
                placeholder="选择区域" 
                style={{ width: '100%' }}
                defaultValue="all"
              >
                <Option value="all">全部区域</Option>
                <Option value="outpatient">门诊楼</Option>
                <Option value="emergency">急诊科</Option>
                <Option value="inpatient">住院部</Option>
                <Option value="pharmacy">药房</Option>
                <Option value="parking">停车场</Option>
              </Select>
            </div>
            
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {cameras.map(camera => {
                                 // 获取摄像头对应的缩略图
                 const getCameraThumbnail = (cameraId: string) => {
                   switch (cameraId) {
                     case '1': return { type: 'video', src: '/img/11.mp4' };
                     case '2': return { type: 'image', src: '/img/13.png' };
                     case '3': return { type: 'image', src: '/img/14.png' };
                     case '4': return { type: 'image', src: '/img/12.png' };
                     case '5': return { type: 'image', src: '/img/13.png' };
                     case '6': return { type: 'image', src: '/img/14.png' };
                     default: return { type: 'image', src: '/img/12.png' };
                   }
                 };
                
                return (
                  <div 
                    key={camera.id}
                    style={{
                      padding: '12px',
                      border: selectedCamera === camera.id ? '2px solid #1890ff' : '1px solid #d9d9d9',
                      borderRadius: '6px',
                      marginBottom: '8px',
                      cursor: 'pointer',
                      backgroundColor: selectedCamera === camera.id ? '#f0f8ff' : '#fff'
                    }}
                    onClick={() => setSelectedCamera(camera.id)}
                  >
                    <div style={{ display: 'flex', gap: '12px' }}>
                                             {/* 摄像头缩略图 */}
                       <div style={{
                         width: '80px',
                         height: '60px',
                         borderRadius: '4px',
                         overflow: 'hidden',
                         flexShrink: 0
                       }}>
                         {camera.status === '在线' ? (
                           (() => {
                             const thumbnail = getCameraThumbnail(camera.id);
                             return thumbnail.type === 'video' ? (
                               <video 
                                 src={thumbnail.src}
                                 style={{
                                   width: '100%',
                                   height: '100%',
                                   objectFit: 'cover'
                                 }}
                                 muted
                                 loop
                               />
                             ) : (
                               <img 
                                 src={thumbnail.src} 
                                 alt={camera.name}
                                 style={{
                                   width: '100%',
                                   height: '100%',
                                   objectFit: 'cover'
                                 }}
                               />
                             );
                           })()
                         ) : (
                           <div style={{
                             width: '100%',
                             height: '100%',
                             background: '#f0f0f0',
                             display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             color: '#999'
                           }}>
                             <VideoCameraOutlined />
                           </div>
                         )}
                       </div>
                      
                      {/* 摄像头信息 */}
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <div style={{ fontWeight: 'bold' }}>{camera.name}</div>
                            <div style={{ fontSize: '12px', color: '#666' }}>{camera.location}</div>
                          </div>
                          <Space>
                            <Tag color={camera.status === '在线' ? 'green' : 'red'}>
                              {camera.status}
                            </Tag>
                            <Badge status={camera.status === '在线' ? 'success' : 'error'} />
                          </Space>
                        </div>
                        <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                          {camera.type} | {camera.resolution}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </Col>

        {/* 右侧视频播放区域 */}
        <Col xs={24} lg={16}>
          <Card 
            title={
              <Space>
                <span>实时监控</span>
                <Tag color="blue">{cameras.find(c => c.id === selectedCamera)?.name}</Tag>
              </Space>
            }
            extra={
              <Space>
                <Button icon={<ReloadOutlined />} size="small">刷新</Button>
                <Button icon={<SettingOutlined />} size="small">设置</Button>
              </Space>
            }
          >
            {renderVideoPlayer()}
          </Card>
        </Col>
      </Row>

      {/* 录像回放 */}
      <Card title="录像回放" style={{ marginTop: '16px' }}>
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Button icon={<CalendarOutlined />} onClick={handleSearch}>
              录像搜索
            </Button>
            <Button icon={<ClockCircleOutlined />}>
              时间轴
            </Button>
            <Button icon={<DownloadOutlined />}>
              批量下载
            </Button>
          </Space>
        </div>
        
        <Table
          columns={recordingColumns}
          dataSource={recordings}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          size="small"
        />
      </Card>

      {/* 录像搜索模态框 */}
      <Modal
        title="录像搜索"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="camera" label="选择摄像头">
                <Select placeholder="请选择摄像头">
                  {cameras.map(camera => (
                    <Option key={camera.id} value={camera.id}>{camera.name}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="type" label="录像类型">
                <Select placeholder="请选择类型">
                  <Option value="all">全部类型</Option>
                  <Option value="scheduled">定时录像</Option>
                  <Option value="alarm">报警录像</Option>
                  <Option value="manual">手动录像</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="timeRange" label="时间范围">
                <RangePicker 
                  showTime 
                  style={{ width: '100%' }}
                  placeholder={['开始时间', '结束时间']}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default VideoManagement;
