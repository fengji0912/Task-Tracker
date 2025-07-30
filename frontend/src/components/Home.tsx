import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>欢迎来到智能管理系统</h1>
      <p>请选择一个功能模块：</p>
      <ul>
        <li><Link to="/tasks">📝 任务管理系统</Link></li>
        <li><Link to="/pension">💰 养老金模拟系统</Link></li>
      </ul>
    </div>
  );
}
