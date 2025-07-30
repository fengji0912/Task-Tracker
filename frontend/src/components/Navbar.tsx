import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ marginBottom: '20px' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>主页</Link>
      {user ? (
        <>
          <Link to="/tasks" style={{ marginRight: '1rem' }}>任务管理</Link>
          <Link to="/pension" style={{ marginRight: '1rem' }}>养老金模拟</Link>
          <span style={{ marginRight: '1rem' }}>👤 {user}</span>
          <button onClick={handleLogout}>退出登录</button>
        </>
      ) : (
        <>
          <Link to="/register" style={{ marginRight: '1rem' }}>注册</Link>
          <Link to="/login" style={{ marginRight: '1rem' }}>登录</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
