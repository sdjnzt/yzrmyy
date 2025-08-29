# 济宁市兖州区人民医院综合安防管理平台

## 项目简介

这是一个基于React + TypeScript + Ant Design构建的医院安防管理平台前端项目。该平台整合了医院安防资源，规范管理流程，提升医院安防响应效率与精准度。

## 功能特性

### 🏥 系统概览
- 实时监控数据展示
- 关键指标统计
- 系统运行状态监控
- 最新报警记录
- 系统公告

### ⚙️ 系统管理
- 设备管理（门禁、监控、报警等设备）
- 用户管理（角色权限、部门管理）
- 系统配置（参数设置、版本信息）
- 系统维护（备份、重启、日志清理）

### 📹 视频管理
- 实时监控画面
- 摄像头设备管理
- 录像回放功能
- 视频搜索和下载
- 多画面布局支持

### 🚨 报警管理
- 实时报警监控
- 报警级别分类
- 报警处理流程
- 报警统计分析
- 报警记录查询

### 🛡️ 安保管理
- 安保人员管理
- 巡逻任务管理
- 门禁记录管理
- 安全事件监控
- 安保资源调度

### 👥 用户安全管理
- 用户权限管理
- 安全策略设置
- 登录日志记录
- 安全等级评估
- 访问控制管理

### 🔧 运行管理
- 系统性能监控
- 日志管理分析
- 备份恢复管理
- 性能分析报告
- 系统告警管理

## 技术栈

- **前端框架**: React 18
- **开发语言**: TypeScript
- **UI组件库**: Ant Design 5.x
- **路由管理**: React Router 6
- **状态管理**: React Hooks
- **构建工具**: Create React App
- **样式处理**: CSS3 + Ant Design样式系统

## 项目结构

```
src/
├── components/          # 公共组件
│   └── Layout/         # 布局组件
├── pages/              # 页面组件
│   ├── Dashboard.tsx           # 系统概览
│   ├── SystemManagement.tsx    # 系统管理
│   ├── VideoManagement.tsx     # 视频管理
│   ├── AlarmManagement.tsx     # 报警管理
│   ├── SecurityManagement.tsx  # 安保管理
│   ├── UserSecurityManagement.tsx # 用户安全管理
│   └── OperationManagement.tsx # 运行管理
├── App.tsx             # 主应用组件
├── index.tsx           # 应用入口
└── index.css           # 全局样式
```

## 安装和运行

### 环境要求
- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm start
```

### 构建生产版本
```bash
npm run build
```

### 运行测试
```bash
npm test
```

## 主要特性

### 🎨 现代化UI设计
- 采用Ant Design设计语言
- 响应式布局设计
- 专业的医疗安防主题配色
- 直观的数据可视化展示

### 📱 响应式设计
- 支持桌面端、平板、手机等设备
- 自适应布局调整
- 触摸友好的交互设计

### 🔒 安全特性
- 用户权限分级管理
- 安全策略配置
- 操作日志记录
- 访问控制管理

### 📊 数据可视化
- 实时数据监控
- 图表化数据展示
- 进度条和状态指示器
- 时间轴和事件流展示

### ⚡ 性能优化
- 组件懒加载
- 数据分页处理
- 搜索和筛选优化
- 内存使用优化

## 数据说明

本项目使用模拟数据进行演示，包括：

- 设备信息数据
- 用户管理数据
- 报警记录数据
- 安保人员数据
- 系统性能数据
- 日志记录数据

在实际部署时，需要连接后端API接口获取真实数据。

## 浏览器支持

- Chrome >= 80
- Firefox >= 75
- Safari >= 13
- Edge >= 80

## 开发说明

### 代码规范
- 使用TypeScript进行类型检查
- 遵循ESLint代码规范
- 使用Prettier进行代码格式化
- 组件采用函数式组件和Hooks

### 组件开发
- 组件采用单一职责原则
- 使用Props进行组件通信
- 合理使用React Hooks管理状态
- 组件样式采用CSS模块化

### 状态管理
- 使用React Hooks管理本地状态
- 复杂状态考虑使用Context API
- 避免过度使用全局状态

## 部署说明

### 开发环境
```bash
npm start
```

### 生产环境
```bash
npm run build
npm install -g serve
serve -s build
```

### Docker部署
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

- 项目维护者: 医院信息科
- 邮箱: info@hospital.com
- 项目地址: [GitHub Repository](https://github.com/hospital/security-platform)

## 更新日志

### v1.0.0 (2025-08-30)
- 初始版本发布
- 实现基础功能模块
- 完成UI界面设计
- 添加模拟数据支持

---

**注意**: 这是一个演示项目，所有数据均为模拟数据，仅用于展示系统功能和界面设计。在实际使用中需要连接真实的后端服务和数据库。
