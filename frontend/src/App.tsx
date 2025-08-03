import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import TaskList from './components/TaskList';
import PensionSimulator from './components/PensionSimulator';
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/pension" element={<PensionSimulator />} />
        </Routes>
      </div>
    </Router>
  );
}
