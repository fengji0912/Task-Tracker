// src/components/TaskList.tsx
import React, { useEffect, useState } from 'react';
import { Task } from '../types/Task';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../api';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDueDate, setNewTaskDueDate] = useState('');
  const navigate = useNavigate();

  // 获取任务列表
  const fetchTasks = async () => {
  try {
    const res = await apiFetch('/api/tasks', { 
  credentials: 'include'});
    
    if (res.status === 401) {
      alert('登录失效，请重新登录');
      navigate('/login');
      return;
    }

    if (!res.ok) {
      throw new Error('获取任务失败');
    }

    const data = await res.json();
    if (!Array.isArray(data)) {
      throw new Error('任务数据格式错误');
    }

    setTasks(data);
  } catch (error) {
    alert('网络错误，请稍后再试');
    console.error(error);
  }
  };

  // 登录检查
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      alert('请先登录后再访问任务管理');
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [fetchTasks, navigate]); 

  

  // 删除任务
  const handleDelete = async (id: number) => {
    await apiFetch(`/api/tasks/${id}`, { method: 'DELETE', 
  credentials: 'include' });
    setTasks(tasks.filter(task => task.id !== id));
  };

  // 切换完成状态
  const handleToggle = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const updated = { ...task, completed: !task.completed };

    const res = await apiFetch(`/api/tasks/${id}`, {
      method: 'PUT',
  credentials: 'include',
      body: JSON.stringify(updated),
    });
    const updatedTask = await res.json();
    setTasks(tasks.map(t => (t.id === id ? updatedTask : t)));
  };

  // 新增任务
  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle) return alert('标题不能为空');

    const newTask = {
      title: newTaskTitle,
      description: newTaskDescription,
      dueDate: newTaskDueDate,
      completed: false,
    };

    const res = await apiFetch('/api/tasks', {
      method: 'POST',
  credentials: 'include',
      body: JSON.stringify(newTask),
    });

    const createdTask = await res.json();
    setTasks([...tasks, createdTask]);

    // 清空表单
    setNewTaskTitle('');
    setNewTaskDescription('');
    setNewTaskDueDate('');
  };

  return (
    <div>
      <h2>任务管理</h2>

      <form onSubmit={handleAddTask} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="标题"
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          required
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="描述"
          value={newTaskDescription}
          onChange={e => setNewTaskDescription(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="date"
          value={newTaskDueDate}
          onChange={e => setNewTaskDueDate(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <button type="submit">新增任务</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task.id} style={{ marginBottom: '1rem' }}>
            <strong>{task.title}</strong> - {task.description} - {task.dueDate}
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task.id!)}
              style={{ marginLeft: '1rem' }}
            />
            <button onClick={() => handleDelete(task.id!)} style={{ marginLeft: '0.5rem' }}>
              删除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
