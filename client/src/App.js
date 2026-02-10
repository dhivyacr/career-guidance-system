import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Register from './pages/Register';
import Login from './pages/Login';
import StudentProfile from './pages/StudentProfile';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Import the guard component

function App() {
  return (
    <BrowserRouter>
      {/* Navbar provides the Logout functionality across all pages */}
      <Navbar /> 
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> 
        
        {/* Protected Student Route */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute allowedRole="student">
              <StudentProfile />
            </ProtectedRoute>
          } 
        />
        
        {/* Protected Admin (Placement Advisor) Route */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch-all for non-existent pages */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;