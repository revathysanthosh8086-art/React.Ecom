// Registration.jsx (CORRECTED)
import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';

function Registration() {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handlechange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user.name || !user.email || !user.password) {
      alert('All fields are required');
      return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const exist = users.find((i) => i.email === user.email);

    if (exist) {
      alert('Email already registered');
      return;
    }

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration complete! Please login.');
    navigate('/Login');

    setUser({ name: '', email: '', password: '' });
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
        <h2 style={titleStyle}>Create Account</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handlechange}
            style={inputStyle}
          />
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
          <button type="submit" style={buttonStyle}>Register</button>
        </form>
        <div style={linkStyle}>
          <p>Already have an account? <Link to="/login" style={{ color: '#e74c3c' }}>Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Registration;