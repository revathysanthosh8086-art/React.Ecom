// App.jsx (Updated with all routes)
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registration from './pages/Registration';
import Admin from './pages/Admin';
import UserIndex from './pages/UserIndex';
import AdminNavbar from './pages/AdminNavbar';
import UserNavbar from './pages/UserNavbar';
import Users from './pages/Users';
import AdminProduct from './pages/AdminProduct';
import UserProduct from './pages/UserProduct';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Protect from './pages/Protect';

function App() {
  const role = localStorage.getItem('Role');

  // Global styles for the app
  const appStyle = {
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  };

  const mainContentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px'
  };

  return (
    <Router>
      <div style={appStyle}>
        {role === 'Admin' && <AdminNavbar />}
        {role === 'User' && <UserNavbar />}
        <div style={mainContentStyle}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <Protect role="Admin">
                <Admin />
              </Protect>
            } />
            <Route path="/users" element={
              <Protect role="Admin">
                <Users />
              </Protect>
            } />
            <Route path="/product" element={
              <Protect role="Admin">
                <AdminProduct />
              </Protect>
            } />
            <Route path="/orders" element={
              <Protect role="Admin">
                <Orders />
              </Protect>
            } />
            
            {/* User Routes */}
            <Route path="/user" element={
              <Protect role="User">
                <UserIndex />
              </Protect>
            } />
            <Route path="/products" element={
              <Protect role="User">
                <UserProduct />
              </Protect>
            } />
            <Route path="/cart" element={
              <Protect role="User">
                <Cart />
              </Protect>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;