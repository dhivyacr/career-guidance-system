import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Retrieve the logged-in user details from local storage
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear the session
    alert("Logged out successfully!");
    navigate("/login");
  };

  // HIDE NAVBAR LOGIC:
  // 1. If no user is logged in, do not show the navbar.
  // 2. If the user is on the /login or /register page, do not show the navbar.
  const hideOnPages = ["/login", "/register"];
  if (!user || hideOnPages.includes(location.pathname)) {
    return null; 
  }

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>CareerPath 2026</div>
      <div style={styles.links}>
        <span style={styles.userText}>Welcome, {user.username}</span>
        <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
      </div>
    </nav>
  );
};

const styles = {
  nav: { 
    backgroundColor: '#2e86c1', 
    padding: '15px 30px', 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    color: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  logo: { fontSize: '20px', fontWeight: 'bold' },
  links: { display: 'flex', alignItems: 'center', gap: '20px' },
  userText: { fontSize: '14px', fontStyle: 'italic' },
  logoutBtn: { 
    backgroundColor: '#e74c3c', 
    color: 'white', 
    border: 'none', 
    padding: '8px 15px', 
    borderRadius: '5px', 
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default Navbar;