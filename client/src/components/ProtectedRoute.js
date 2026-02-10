import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // 1. If not logged in, send to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // 2. If logged in but wrong role (e.g., student trying to see admin), send to profile
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/profile" />;
  }

  // 3. Otherwise, allow access to the page
  return children;
};

export default ProtectedRoute;