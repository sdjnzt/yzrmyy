import React, { useState } from 'react';
import { Card, Row, Col, Select, DatePicker, Button, Space, Statistic, Tabs } from 'antd';
import { DownloadOutlined, ReloadOutlined, BarChartOutlined, LineChartOutlined, PieChartOutlined } from '@ant-design/icons';
import ReactECharts from 'echarts-for-react';
import type { Dayjs } from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;
const { Option } = Select;

const ReportAnalysis: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);
  const [reportType, setReportType] = useState<string>('security');

  // 处理日期范围变化
  const handleDateRangeChange: RangePickerProps['onChange'] = (dates) => {
    if (dates && dates[0] && dates[1]) {
      setDateRange([dates[0], dates[1]]);
    } else {
      setDateRange(null);
    }
  };

  // 安防事件统计柱状图配置
  const securityEventOptions = {
    title: {
      text: '安防事件月度统计',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['盗窃事件', '暴力事件', '火灾事件', '其他事件'],
      top: 30
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value',
      name: '事件数量'
    },
    series: [
      {
        name: '盗窃事件',
        type: 'bar',
        data: [12, 8, 15, 10, 18, 22, 16, 14, 20, 17, 13, 11],
        itemStyle: { color: '#ff7875' }
      },
      {
        name: '暴力事件',
        type: 'bar',
        data: [5, 3, 8, 6, 12, 15, 10, 8, 14, 11, 7, 5],
        itemStyle: { color: '#ff4d4f' }
      },
      {
        name: '火灾事件',
        type: 'bar',
        data: [2, 1, 3, 2, 4, 5, 3, 2, 4, 3, 2, 1],
        itemStyle: { color: '#fa8c16' }
      },
      {
        name: '其他事件',
        type: 'bar',
        data: [8, 6, 10, 7, 13, 16, 12, 9, 15, 12, 8, 6],
        itemStyle: { color: '#52c41a' }
      }
    ]
  };

  // 视频监控使用率折线图配置
  const videoUsageOptions = {
    title: {
      text: '视频监控使用率趋势',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['在线率', '存储使用率', '带宽使用率'],
      top: 30
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
    },
    yAxis: {
      type: 'value',
      name: '使用率(%)',
      max: 100
    },
    series: [
      {
        name: '在线率',
        type: 'line',
        data: [95, 92, 98, 99, 97, 96, 95],
        smooth: true,
        itemStyle: { color: '#1890ff' },
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
      },
      {
        name: '存储使用率',
        type: 'line',
        data: [65, 66, 68, 70, 72, 71, 69],
        smooth: true,
        itemStyle: { color: '#52c41a' }
      },
      {
        name: '带宽使用率',
        type: 'line',
        data: [45, 42, 55, 78, 82, 75, 48],
        smooth: true,
        itemStyle: { color: '#fa8c16' }
      }
    ]
  };

  // 安防人员分布饼图配置
  const securityStaffOptions = {
    title: {
      text: '安防人员岗位分布',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle'
    },
    series: [
      {
        name: '岗位分布',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['60%', '50%'],
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
          { value: 35, name: '门岗保安', itemStyle: { color: '#1890ff' } },
          { value: 25, name: '巡逻保安', itemStyle: { color: '#52c41a' } },
          { value: 20, name: '监控室值班', itemStyle: { color: '#fa8c16' } },
          { value: 15, name: '应急响应', itemStyle: { color: '#f5222d' } },
          { value: 5, name: '管理人员', itemStyle: { color: '#722ed1' } }
        ]
      }
    ]
  };

  // 系统性能雷达图配置
  const systemPerformanceOptions = {
    title: {
      text: '系统性能评估',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {},
    legend: {
      data: ['当前性能', '目标性能'],
      top: 30
    },
    radar: {
      indicator: [
        { name: '响应速度', max: 100 },
        { name: '稳定性', max: 100 },
        { name: '安全性', max: 100 },
        { name: '可扩展性', max: 100 },
        { name: '易用性', max: 100 },
        { name: '维护性', max: 100 }
      ]
    },
    series: [
      {
        name: '性能指标',
        type: 'radar',
        data: [
          {
            value: [85, 90, 95, 80, 88, 82],
            name: '当前性能',
            itemStyle: { color: '#1890ff' },
            areaStyle: {
              color: 'rgba(24, 144, 255, 0.2)'
            }
          },
          {
            value: [95, 95, 98, 90, 95, 90],
            name: '目标性能',
            itemStyle: { color: '#52c41a' },
            areaStyle: {
              color: 'rgba(82, 196, 26, 0.2)'
            }
          }
        ]
      }
    ]
  };

  // 报警处理效率堆叠柱状图配置
  const alarmEfficiencyOptions = {
    title: {
      text: '报警处理效率分析',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['响应时间<5分钟', '响应时间5-15分钟', '响应时间>15分钟'],
      top: 30
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['盗窃报警', '火灾报警', '暴力报警', '医疗报警', '其他报警']
    },
    yAxis: {
      type: 'value',
      name: '报警数量'
    },
    series: [
      {
        name: '响应时间<5分钟',
        type: 'bar',
        stack: 'total',
        data: [120, 85, 95, 150, 60],
        itemStyle: { color: '#52c41a' }
      },
      {
        name: '响应时间5-15分钟',
        type: 'bar',
        stack: 'total',
        data: [30, 15, 25, 20, 15],
        itemStyle: { color: '#fa8c16' }
      },
      {
        name: '响应时间>15分钟',
        type: 'bar',
        stack: 'total',
        data: [10, 5, 8, 5, 8],
        itemStyle: { color: '#ff4d4f' }
      }
    ]
  };

  // 设备状态分布环形图配置
  const deviceStatusOptions = {
    title: {
      text: '设备状态分布',
      left: 'center',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      top: 'middle'
    },
    series: [
      {
        name: '设备状态',
        type: 'pie',
        radius: ['30%', '70%'],
        center: ['60%', '50%'],
        roseType: 'radius',
        data: [
          { value: 85, name: '正常运行', itemStyle: { color: '#52c41a' } },
          { value: 10, name: '维护中', itemStyle: { color: '#fa8c16' } },
          { value: 3, name: '故障', itemStyle: { color: '#ff4d4f' } },
          { value: 2, name: '离线', itemStyle: { color: '#8c8c8c' } }
        ]
      }
    ]
  };

  const handleExport = () => {
    // 导出报表逻辑
    console.log('导出报表');
  };

  const handleRefresh = () => {
    // 刷新数据逻辑
    console.log('刷新数据');
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card title="报表分析" extra={
        <Space>
          <Select
            value={reportType}
            onChange={setReportType}
            style={{ width: 150 }}
            placeholder="选择报表类型"
          >
            <Option value="security">安防事件报表</Option>
            <Option value="video">视频监控报表</Option>
            <Option value="personnel">人员管理报表</Option>
            <Option value="system">系统性能报表</Option>
          </Select>
          <RangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
            placeholder={['开始日期', '结束日期']}
          />
          <Button icon={<ReloadOutlined />} onClick={handleRefresh}>
            刷新
          </Button>
          <Button type="primary" icon={<DownloadOutlined />} onClick={handleExport}>
            导出报表
          </Button>
        </Space>
      }>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card>
              <Statistic
                title="总报警数"
                value={1128}
                suffix="次"
                valueStyle={{ color: '#cf1322' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="平均响应时间"
                value={4.2}
                suffix="分钟"
                valueStyle={{ color: '#3f8600' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="设备在线率"
                value={95.8}
                suffix="%"
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="安全评分"
                value={92.5}
                suffix="分"
                valueStyle={{ color: '#722ed1' }}
              />
            </Card>
          </Col>
        </Row>

        <Tabs
          defaultActiveKey="1"
          items={[
            {
              key: '1',
              label: (
                <span>
                  <BarChartOutlined />
                  安防事件统计
                </span>
              ),
              children: (
                <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                  <Col span={12}>
                    <Card>
                      <ReactECharts option={securityEventOptions} style={{ height: '400px' }} />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card>
                      <ReactECharts option={alarmEfficiencyOptions} style={{ height: '400px' }} />
                    </Card>
                  </Col>
                </Row>
              )
            },
            {
              key: '2',
              label: (
                <span>
                  <LineChartOutlined />
                  监控系统分析
                </span>
              ),
              children: (
                <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                  <Col span={12}>
                    <Card>
                      <ReactECharts option={videoUsageOptions} style={{ height: '400px' }} />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card>
                      <ReactECharts option={deviceStatusOptions} style={{ height: '400px' }} />
                    </Card>
                  </Col>
                </Row>
              )
            },
            {
              key: '3',
              label: (
                <span>
                  <PieChartOutlined />
                  人员与系统分析
                </span>
              ),
              children: (
                <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                  <Col span={12}>
                    <Card>
                      <ReactECharts option={securityStaffOptions} style={{ height: '400px' }} />
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card>
                      <ReactECharts option={systemPerformanceOptions} style={{ height: '400px' }} />
                    </Card>
                  </Col>
                </Row>
              )
            }
          ]}
        />
      </Card>
    </div>
  );
};

export default ReportAnalysis;
