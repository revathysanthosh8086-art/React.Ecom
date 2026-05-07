// Protect.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function Protect({ children, role }) {
  const userRole = localStorage.getItem('Role');
  
  if (!userRole) {
    return <Navigate to='/login' />;
  }
  
  if (role && userRole !== role) {
    return <Navigate to='/' />;
  }
  
  return children;
}

export default Protect;