import React, { useState } from 'react';
import axios from 'axios';

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    academicDetails: { cgpa: '', department: '', year: '' },
    skills: '',
    interests: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId"); // Assuming you saved this on login
    const data = {
      ...profile,
      userId,
      skills: profile.skills.split(','), // Convert string to array
      interests: profile.interests.split(',')
    };
    await axios.post("http://localhost:5000/api/profile", data);
    alert("Profile Updated!");
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="CGPA" onChange={(e) => setProfile({...profile, academicDetails: {...profile.academicDetails, cgpa: e.target.value}})} />
        <input placeholder="Skills (comma separated)" onChange={(e) => setProfile({...profile, skills: e.target.value})} />
        <input placeholder="Interests (comma separated)" onChange={(e) => setProfile({...profile, interests: e.target.value})} />
        <button type="submit">Save Profile</button>
      </form>
    </div>
  );
};

export default StudentProfile;