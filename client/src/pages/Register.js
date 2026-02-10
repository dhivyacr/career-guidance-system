import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [inputs, setInputs] = useState({ username: "", email: "", password: "", role: "student" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    // This looks at the "name" attribute of the input to update the state
    setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sends data to your Backend Route
      await axios.post("http://localhost:5000/api/auth/register", inputs);
      alert("Registration Successful! Please Login.");
      navigate("/login");
    } catch (err) {
      // Fixed: Now shows the actual error message from the server (e.g., "Email already registered")
      const errorMsg = err.response?.data || "Something went wrong!";
      alert(errorMsg); 
      console.log("Error details:", err.response?.data);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>SIGN UP</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input 
            required 
            name="username" // Matches the key in state
            placeholder="Username" 
            onChange={handleChange} 
            style={styles.input}
          />
          <input 
            required 
            name="email" // Matches the key in state
            type="email" 
            placeholder="E-mail" 
            onChange={handleChange} 
            style={styles.input}
          />
          <input 
            required 
            name="password" // Matches the key in state
            type="password" 
            placeholder="Password" 
            onChange={handleChange} 
            style={styles.input}
          />
          
          <select name="role" onChange={handleChange} style={styles.input}>
            <option value="student">I am a Student</option>
            <option value="admin">I am a Placement Advisor</option>
          </select>

          <button type="submit" style={styles.button}>CREATE ACCOUNT</button>
          <p onClick={() => navigate("/login")} style={styles.link}>Already have an account? Login here</p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#5dade2', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Arial' },
  card: { backgroundColor: '#ebf5fb', padding: '40px', borderRadius: '20px', width: '350px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' },
  title: { textAlign: 'center', color: '#2e86c1', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column' },
  input: { padding: '12px', margin: '10px 0', borderRadius: '5px', border: '1px solid #bdc3c7' },
  button: { padding: '12px', backgroundColor: '#2e86c1', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', marginTop: '10px' },
  link: { fontSize: '12px', textAlign: 'center', marginTop: '15px', cursor: 'pointer', color: '#2e86c1' }
};

export default Register;