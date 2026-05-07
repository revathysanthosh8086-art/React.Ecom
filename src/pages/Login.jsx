// Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handlechange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      alert("All fields are required");
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const exist = users.find(
      (i) => i.email === user.email && i.password === user.password
    );

    const adminmail = 'admin@gmail.com';
    const adminpass = 'admin';
    
    if (user.email === adminmail && user.password === adminpass) {
      localStorage.setItem('Role', 'Admin');
      localStorage.setItem('loggeduser', JSON.stringify({ email: adminmail, name: 'Admin' }));
      alert('Admin Login Successful');
      navigate('/admin');
      window.location.reload();
      return;
    }

    if (exist) {
      localStorage.setItem('loggeduser', JSON.stringify(user));
      localStorage.setItem('Role', 'User');
      alert("Login Successful");
      navigate('/user');
      window.location.reload();
    } else {
      alert("Invalid Email or Password");
    }

    setUser({ email: '', password: '' });
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '70vh'
  };

  const formContainerStyle = {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px'
  };

  const titleStyle = {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px'
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px'
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '12px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  };

  const linkStyle = {
    textAlign: 'center',
    marginTop: '20px',
    color: '#7f8c8d'
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <h2 style={titleStyle}>Login to StyleHub</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handlechange}
            style={inputStyle}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handlechange}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>Login</button>
        </form>
        <div style={linkStyle}>
          <p>Don't have an account? <Link to="/registration" style={{ color: '#e74c3c' }}>Register</Link></p>
          <p style={{ fontSize: '12px', marginTop: '10px' }}>Demo Admin: admin@gmail.com / admin</p>
        </div>
      </div>
    </div>
  );
}

export default Login;