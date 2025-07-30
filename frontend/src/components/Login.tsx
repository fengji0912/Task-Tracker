import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await apiFetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include', 
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/');
      } else {
        const errData = await res.json();
        setError(`登录失败：${errData.error || '未知错误'}`);
      }
    } catch (err) {
      setError('登录请求失败');
    }
  };

  return (
    <div>
      <h2>登录</h2>
      <div>
        <input placeholder="用户名" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <input type="password" placeholder="密码" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>登录</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
