import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", inputs);
      
      // Save user details to localStorage so the app remembers you're logged in
      localStorage.setItem("user", JSON.stringify(res.data));
      
      alert("Login Successful!");
      
      // Redirect based on role (Student or Advisor)
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    } catch (err) {
      alert(err.response?.data || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>LOGIN</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input required name="email" type="email" placeholder="E-mail" onChange={handleChange} style={styles.input}/>
          <input required name="password" type="password" placeholder="Password" onChange={handleChange} style={styles.input}/>
          <button type="submit" style={styles.button}>SIGN IN</button>
          <p onClick={() => navigate("/register")} style={styles.link}>Don't have an account? Sign up here</p>
        </form>
      </div>
    </div>
  );
};

// Reusing your styles for a consistent look
const styles = {
  container: { backgroundColor: '#5dade2', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Arial' },
  card: { backgroundColor: '#ebf5fb', padding: '40px', borderRadius: '20px', width: '350px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' },
  title: { textAlign: 'center', color: '#2e86c1', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column' },
  input: { padding: '12px', margin: '10px 0', borderRadius: '5px', border: '1px solid #bdc3c7' },
  button: { padding: '12px', backgroundColor: '#2e86c1', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', marginTop: '10px' },
  link: { fontSize: '12px', textAlign: 'center', marginTop: '15px', cursor: 'pointer', color: '#2e86c1' }
};

export default Login;