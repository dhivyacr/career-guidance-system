import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile/admin/all");
        setStudents(res.data);
      } catch (err) {
        console.log("Error fetching data", err);
      }
    };
    fetchStudents();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Placement Advisor Dashboard</h2>
      <p>Monitoring {students.length} students</p>
      
      <table style={styles.table}>
        <thead>
          <tr style={styles.thRow}>
            <th>Student Name</th>
            <th>Email</th>
            <th>CGPA</th>
            <th>Skills</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id} style={styles.tr}>
              <td>{student.user?.username}</td>
              <td>{student.user?.email}</td>
              <td>{student.academicDetails?.cgpa}</td>
              <td>{student.skills?.join(", ")}</td>
              <td>
                <span style={student.placementReady ? styles.ready : styles.notReady}>
                  {student.placementReady ? "Ready" : "In Progress"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: { padding: '40px', backgroundColor: '#f4f7f6', minHeight: '100vh' },
  header: { color: '#2e86c1', borderBottom: '2px solid #2e86c1', paddingBottom: '10px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px', backgroundColor: 'white' },
  thRow: { backgroundColor: '#2e86c1', color: 'white', textAlign: 'left' },
  tr: { borderBottom: '1px solid #ddd', padding: '10px' },
  ready: { color: 'green', fontWeight: 'bold' },
  notReady: { color: 'orange', fontWeight: 'bold' }
};

export default AdminDashboard;