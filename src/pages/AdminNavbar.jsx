// AdminNavbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('Role');
    localStorage.removeItem('loggeduser');
    navigate('/login');
    window.location.reload();
  };

  const navStyle = {
    backgroundColor: '#2c3e50',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#e74c3c',
    textDecoration: 'none'
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '25px',
    alignItems: 'center'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '8px 12px',
    borderRadius: '5px',
    transition: 'all 0.3s'
  };

  const logoutBtnStyle = {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s'
  };

  return (
    <div style={navStyle}>
      <a href="/admin" style={logoStyle}>👕 StyleHub Admin</a>
      <div style={navLinksStyle}>
        <a href="/admin" style={linkStyle}>Dashboard</a>
        <a href="/users" style={linkStyle}>Users</a>
        <a href="/orders" style={linkStyle}>Orders</a>
        <a href="/product" style={linkStyle}>Products</a>
        <button onClick={handleLogout} style={logoutBtnStyle}>Logout</button>
      </div>
    </div>
  );
}

export default AdminNavbar;