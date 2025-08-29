import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Checkbox, 
  message, 
  Card, 
  Divider,
  Space,
  Typography,
  Alert
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoginOutlined
} from '@ant-design/icons';
import { useUser } from '../contexts/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

const { Title, Text } = Typography;

interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
  captcha: string;
}

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [captchaText, setCaptchaText] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const { login } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // 实时更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 生成验证码
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // 处理登录
  const handleLogin = async (values: LoginFormData) => {
    if (showCaptcha && values.captcha.toUpperCase() !== captchaText) {
      message.error('验证码错误，请重新输入');
      generateCaptcha();
      form.setFieldsValue({ captcha: '' });
      return;
    }

    setLoading(true);
    
    try {
      // 模拟登录API调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 模拟登录验证
      if (values.username === 'admin' && values.password === 'admin123') {
        // 创建用户对象
        const userData = {
          id: '1',
          username: values.username,
          name: '系统管理员',
          role: 'admin',
          avatar: undefined
        };
        
        // 使用UserContext的login函数
        login(userData);
        
        // 登录成功后自动跳转
        const from = (location.state as any)?.from?.pathname || '/dashboard';
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 1000);
      } else {
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        if (newAttempts >= 3) {
          setShowCaptcha(true);
          message.warning('登录失败次数过多，请输入验证码');
        } else {
          message.error(`用户名或密码错误，还剩${3 - newAttempts}次机会`);
        }
      }
    } catch (error) {
      message.error('登录失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  // 刷新验证码
  const refreshCaptcha = () => {
    generateCaptcha();
    form.setFieldsValue({ captcha: '' });
  };

  return (
    <div className="login-container">
      {/* 背景装饰 */}
      <div className="login-background">
        <div className="background-pattern"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      {/* 系统信息 */}
      <div className="system-info">
        <div className="system-logo">
          <SafetyCertificateOutlined className="logo-icon" />
          <div className="logo-text">
            <h1>济宁市兖州区人民医院</h1>
            <h2>综合安防管理平台</h2>
          </div>
        </div>
        <div className="system-time">
          {currentTime.toLocaleString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          })}
        </div>
      </div>

      {/* 登录表单 */}
      <div className="login-form-container">
        <Card className="login-card" bordered={false}>
          <div className="login-header">
            <Title level={2} className="login-title">
              <LoginOutlined /> 系统登录
            </Title>
            <Text type="secondary" className="login-subtitle">
              请输入您的账号和密码进行身份验证
            </Text>
          </div>

          <Form
            form={form}
            name="login"
            onFinish={handleLogin}
            autoComplete="off"
            size="large"
            className="login-form"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '请输入用户名' },
                { min: 3, message: '用户名至少3个字符' }
              ]}
            >
              <Input
                prefix={<UserOutlined className="input-icon" />}
                placeholder="请输入用户名"
                className="login-input"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { min: 6, message: '密码至少6个字符' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="input-icon" />}
                placeholder="请输入密码"
                className="login-input"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>

            {showCaptcha && (
              <Form.Item
                name="captcha"
                rules={[
                  { required: true, message: '请输入验证码' },
                  { len: 4, message: '验证码为4位字符' }
                ]}
              >
                <div className="captcha-container">
                  <Input
                    placeholder="请输入验证码"
                    className="captcha-input"
                    maxLength={4}
                  />
                  <div className="captcha-display" onClick={refreshCaptcha}>
                    <span className="captcha-text">{captchaText}</span>
                    <Text type="secondary" className="captcha-hint">点击刷新</Text>
                  </div>
                </div>
              </Form.Item>
            )}

            <Form.Item>
              <div className="login-options">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住密码</Checkbox>
                </Form.Item>
                <a href="#forgot" className="forgot-link">忘记密码？</a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="login-button"
                block
              >
                {loading ? '登录中...' : '登录'}
              </Button>
            </Form.Item>
          </Form>

          {/* <Divider className="login-divider">
            <Text type="secondary">系统信息</Text>
          </Divider>

          <div className="system-status">
            <Space direction="vertical" size="small" className="status-list">
              <div className="status-item">
                <span className="status-label">系统版本：</span>
                <span className="status-value">v2.1.0</span>
              </div>
              <div className="status-item">
                <span className="status-label">最后更新：</span>
                <span className="status-value">2025-01-15</span>
              </div>
              <div className="status-item">
                <span className="status-label">技术支持：</span>
                <span className="status-value">信息科</span>
              </div>
            </Space>
          </div> */}

          {/* 安全提示 */}
          {/* <Alert
            message="安全提示"
            description="请勿在公共场所登录系统，使用完毕后请及时退出登录。如遇问题请联系系统管理员。"
            type="info"
            showIcon
            className="security-alert"
          /> */}
        </Card>
      </div>

      {/* 页脚信息 */}
      <div className="login-footer">
        <Text type="secondary">
          © 2025 济宁市兖州区人民医院. 保留所有权利.
        </Text>
      </div>
    </div>
  );
};

export default Login;
