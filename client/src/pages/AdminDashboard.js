import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [profiles, setProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Track search input

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile/admin/all");
        setProfiles(res.data);
      } catch (err) {
        console.error("Error fetching student data", err);
      }
    };
    fetchProfiles();
  }, []);

  // Filter profiles based on Search Term (checks RegNo, Name, and Dept)
  const filteredProfiles = profiles.filter(p => {
    const name = p.user?.username?.toLowerCase() || "";
    const regNo = p.academicDetails?.regNo?.toLowerCase() || "";
    const dept = p.academicDetails?.department?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();

    return name.includes(term) || regNo.includes(term) || dept.includes(term);
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Placement Advisor Dashboard</h2>
      
      <div style={styles.searchWrapper}>
        <input 
          type="text" 
          placeholder="Search by Register Number, Name, or Dept..." 
          style={styles.searchInput}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Student Name</th>
              <th style={styles.th}>Reg. Number</th>
              <th style={styles.th}>Department</th>
              <th style={styles.th}>Top Role Match</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredProfiles.length > 0 ? (
              filteredProfiles.map((p, index) => (
                <tr key={index} style={styles.tr}>
                  <td style={styles.td}>{p.user?.username || "N/A"}</td>
                  <td style={styles.td}>{p.academicDetails?.regNo || "Not Set"}</td>
                  <td style={styles.td}>{p.academicDetails?.department || "N/A"}</td>
                  <td style={styles.td}>
                    {p.recommendations[0]?.jobRole} ({Math.round(p.recommendations[0]?.matchPercentage)}%)
                  </td>
                  <td style={styles.td}>
                    <span style={p.placementReady ? styles.ready : styles.notReady}>
                      {p.placementReady ? "Ready" : "Needs Training"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" style={styles.noData}>No students found matching "{searchTerm}"</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: { backgroundColor: '#5dade2', minHeight: '100vh', padding: '40px', fontFamily: 'Arial' },
  title: { color: 'white', textAlign: 'center', marginBottom: '20px' },
  searchWrapper: { display: 'flex', justifyContent: 'center', marginBottom: '30px' },
  searchInput: { 
    width: '60%', 
    padding: '12px 20px', 
    borderRadius: '25px', 
    border: 'none', 
    fontSize: '16px', 
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)' 
  },
  card: { backgroundColor: 'white', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' },
  table: { width: '100%', borderCollapse: 'collapse' },
  th: { textAlign: 'left', padding: '12px', borderBottom: '2px solid #5dade2', color: '#2e86c1' },
  td: { padding: '12px', borderBottom: '1px solid #eee', fontSize: '14px' },
  ready: { backgroundColor: '#27ae60', color: 'white', padding: '5px 10px', borderRadius: '15px', fontSize: '12px' },
  notReady: { backgroundColor: '#e67e22', color: 'white', padding: '5px 10px', borderRadius: '15px', fontSize: '12px' },
  noData: { textAlign: 'center', padding: '20px', color: '#7f8c8d' }
};

export default AdminDashboard;