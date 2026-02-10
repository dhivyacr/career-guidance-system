import React, { useState } from 'react';
import axios from 'axios';

const StudentProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState({
    regNo: "",
    department: "",
    branch: "",
    skills: "",
    interests: ""
  });
  const [recommendations, setRecommendations] = useState([]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const data = {
        userId: user.userId,
        academicDetails: { 
          regNo: profile.regNo, 
          department: profile.department, 
          branch: profile.branch 
        },
        // Converts comma string into clean lowercase array for better matching
        skills: profile.skills.split(",").map(s => s.trim()),
        interests: profile.interests.split(",").map(i => i.trim())
      };

      const res = await axios.post("http://localhost:5000/api/profile", data);
      setRecommendations(res.data.recommendations);
      alert("Profile and Academic Details Updated!");
    } catch (err) {
      alert("Error saving profile");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>ACADEMIC & TECH PROFILE</h2>
        <form onSubmit={handleSave} style={styles.form}>
          
          <label style={styles.label}>Register Number</label>
          <input name="regNo" placeholder="e.g. 7376211AL123" onChange={handleChange} style={styles.input} required />
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Department</label>
              <input name="department" placeholder="e.g. AI & DS" onChange={handleChange} style={styles.input} required />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Branch</label>
              <input name="branch" placeholder="e.g. B.Tech" onChange={handleChange} style={styles.input} required />
            </div>
          </div>

          <label style={styles.label}>Technical Skills (comma separated)</label>
          <input name="skills" placeholder="React, Python, SQL" onChange={handleChange} style={styles.input} required />
          
          <label style={styles.label}>Career Interests</label>
          <input name="interests" placeholder="Data Science, Web Dev" onChange={handleChange} style={styles.input} required />

          <button type="submit" style={styles.button}>UPDATE PROFILE & GET ROLES</button>
        </form>

        {recommendations.length > 0 && (
          <div style={styles.results}>
            <h3 style={styles.title}>Career Match Analysis</h3>
            {recommendations.map((rec, index) => (
              <div key={index} style={styles.recBox}>
                <div style={styles.recHeader}>
                  <strong>{rec.jobRole}</strong>
                  <span style={styles.scoreTag}>{Math.round(rec.matchPercentage)}% Match</span>
                </div>
                
                {/* Visual Progress Bar */}
                <div style={styles.progressBg}>
                  <div style={{...styles.progressFill, width: `${rec.matchPercentage}%`}}></div>
                </div>

                {/* Skill Gap Cloud */}
                <div style={styles.skillCloud}>
                  <p style={styles.smallLabel}>Target these skills to reach 100%:</p>
                  <div style={styles.tagContainer}>
                    {rec.missingSkills.length > 0 ? (
                      rec.missingSkills.map((skill, i) => (
                        <span key={i} style={styles.missingSkillTag}>+ {skill}</span>
                      ))
                    ) : (
                      <span style={styles.readyTag}>✓ All skills matched! Ready for Placement.</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#5dade2', minHeight: '100vh', padding: '40px 20px', display: 'flex', justifyContent: 'center', fontFamily: 'Arial' },
  card: { backgroundColor: '#ebf5fb', padding: '30px', borderRadius: '15px', width: '550px', height: 'fit-content', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' },
  title: { color: '#2e86c1', textAlign: 'center', marginBottom: '20px' },
  form: { display: 'flex', flexDirection: 'column' },
  label: { marginTop: '15px', color: '#34495e', fontWeight: 'bold', fontSize: '14px' },
  input: { padding: '12px', margin: '5px 0', borderRadius: '5px', border: '1px solid #bdc3c7' },
  button: { padding: '14px', backgroundColor: '#2e86c1', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', marginTop: '25px', fontWeight: 'bold' },
  results: { marginTop: '30px', borderTop: '2px solid #2e86c1', paddingTop: '20px' },
  recBox: { backgroundColor: 'white', padding: '15px', margin: '15px 0', borderRadius: '8px', borderLeft: '5px solid #2e86c1', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' },
  recHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', alignItems: 'center' },
  scoreTag: { backgroundColor: '#2e86c1', color: 'white', padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' },
  progressBg: { backgroundColor: '#d5dbdb', height: '10px', borderRadius: '5px', overflow: 'hidden', marginBottom: '15px' },
  progressFill: { backgroundColor: '#27ae60', height: '100%', transition: 'width 0.8s ease-in-out' },
  skillCloud: { marginTop: '10px' },
  smallLabel: { fontSize: '12px', color: '#7f8c8d', marginBottom: '8px' },
  tagContainer: { display: 'flex', flexWrap: 'wrap', gap: '5px' },
  missingSkillTag: { backgroundColor: '#fdf2e9', color: '#e67e22', fontSize: '11px', padding: '4px 8px', borderRadius: '5px', border: '1px solid #fab1a0' },
  readyTag: { color: '#27ae60', fontSize: '12px', fontWeight: 'bold' }
};

export default StudentProfile;