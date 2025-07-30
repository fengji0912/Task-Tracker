import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from '../api';

function PensionSimulator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [currentSavings, setCurrentSavings] = useState(20000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [interestRate, setInterestRate] = useState(0.05);
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      alert('请先登录后再访问养老金模拟页面');
      navigate('/login');
    }
  }, [navigate]);

  const simulate = async () => {
  setError('');
  setResult(null);

  // 简单输入校验
  if (currentAge >= retirementAge) {
    setError('退休年龄必须大于当前年龄');
    return;
  }
  if (interestRate < 0 || interestRate > 1) {
    setError('年利率请输入0到1之间的小数');
    return;
  }

  try {
    const res = await apiFetch('/api/pension/simulate', {
      method: "POST",
  credentials: 'include',
      body: JSON.stringify({
        currentAge,
        retirementAge,
        currentSavings,
        monthlyContribution,
        interestRate
      }),
    });

    if (res.status === 401) {
      alert('登录失效，请重新登录');
      navigate('/login');
      return;
    }

    if (!res.ok) {
      const errData = await res.json();
      setError(errData.error || '请求失败，请稍后再试');
      return;
    }

    const data = await res.json();
    setResult(data.projectedAmount);
  } catch (e) {
    console.error(e);
    setError('网络异常，请稍后重试');
  }
};

  return (
    <div>
      <h2>养老金模拟</h2>

      <input
        type="number"
        value={currentAge}
        onChange={e => setCurrentAge(+e.target.value)}
        placeholder="当前年龄"
      />
      <input
        type="number"
        value={retirementAge}
        onChange={e => setRetirementAge(+e.target.value)}
        placeholder="退休年龄"
      />
      <input
        type="number"
        value={currentSavings}
        onChange={e => setCurrentSavings(+e.target.value)}
        placeholder="当前存款"
      />
      <input
        type="number"
        value={monthlyContribution}
        onChange={e => setMonthlyContribution(+e.target.value)}
        placeholder="月缴存金额"
      />
      <input
        type="number"
        step="0.01"
        value={interestRate}
        onChange={e => setInterestRate(+e.target.value)}
        placeholder="年利率 (例如 0.05)"
      />

      <button onClick={simulate}>计算</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {result !== null && <p>预计养老金余额: {result.toFixed(2)}</p>}
    </div>
  );
}

export default PensionSimulator;
