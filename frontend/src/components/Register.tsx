// src/components/Register.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleRegister = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    });

    const result = await res.json();

    if (res.ok) {
      alert(result.message || '注册成功');
      navigate('/login');
    } else {
      setError(`注册失败：${result.error || result.message || '未知错误'}`);
    }
  } catch (err) {
    setError('注册请求失败');
  }
};


  return (
    <div>
      <h2>注册</h2>
      <div>
        <input placeholder="用户名" value={username} onChange={e => setUsername(e.target.value)} />
      </div>
      <div>
        <input type="password" placeholder="密码" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button onClick={handleRegister}>注册</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Register;
