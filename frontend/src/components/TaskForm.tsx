import React, { useState } from 'react';
import { Task } from '../types/Task';

interface Props {
  onAdd: (task: Task) => void;
}

const TaskForm: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState<Task>({
    title: '',
    description: '',
    dueDate: '',
    completed: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.title && form.dueDate) {
      onAdd(form);
      setForm({ title: '', description: '', dueDate: '', completed: false });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="dueDate" type="date" value={form.dueDate} onChange={handleChange} required />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
