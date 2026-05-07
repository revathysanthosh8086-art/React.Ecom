// Admin.jsx
import React, { useEffect, useState } from 'react';

function Admin() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("users")) || [];
    const productData = JSON.parse(localStorage.getItem("products")) || [];
    const orderData = JSON.parse(localStorage.getItem("orders")) || [];
    setUsers(userData);
    setStats({
      totalUsers: userData.length,
      totalProducts: productData.length,
      totalOrders: orderData.length
    });
  }, []);

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const headerStyle = {
    color: '#2c3e50',
    borderBottom: '3px solid #e74c3c',
    paddingBottom: '10px',
    marginBottom: '30px'
  };

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '40px'
  };

  const statCardStyle = {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  const statValueStyle = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#e74c3c',
    margin: '10px 0'
  };

  const statLabelStyle = {
    color: '#7f8c8d',
    fontSize: '14px'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  };

  const thStyle = {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
    border: '1px solid #ddd'
  };

  const tdStyle = {
    padding: '10px',
    border: '1px solid #ddd'
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Admin Dashboard</h2>
      
      <div style={statsContainerStyle}>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.totalUsers}</div>
          <div style={statLabelStyle}>Total Users</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.totalProducts}</div>
          <div style={statLabelStyle}>Total Products</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{stats.totalOrders}</div>
          <div style={statLabelStyle}>Total Orders</div>
        </div>
      </div>

      <h3 style={{ color: '#2c3e50', marginBottom: '15px' }}>Recent Users</h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.slice(0, 5).map((user, index) => (
            <tr key={index}>
              <td style={tdStyle}>{user.name}</td>
              <td style={tdStyle}>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;