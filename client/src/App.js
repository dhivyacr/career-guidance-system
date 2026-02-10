import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import StudentProfile from './pages/StudentProfile';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<StudentProfile />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;