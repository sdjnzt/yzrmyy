import React, { createContext, useContext, useState, ReactNode } from 'react';
import { message } from 'antd';

interface User {
  id: string;
  username: string;
  name: string;
  role: string;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // 从localStorage恢复用户状态
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    message.success(`欢迎回来，${userData.name}！`);
  };

  const logout = () => {
    // 清除用户状态
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // 如果有token的话
    
    message.success('已成功退出登录');
    
    // 跳转到登录页面 - 使用window.location而不是navigate
    setTimeout(() => {
      window.location.hash = '#/login';
    }, 1000);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const value: UserContextType = {
    user,
    isLoggedIn: !!user,
    login,
    logout,
    updateUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
