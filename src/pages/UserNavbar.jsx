// UserNavbar.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function UserNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cart.length);
    };
    
    updateCartCount();
    
    // Listen for storage changes
    window.addEventListener('storage', updateCartCount);
    
    // Custom event for cart updates
    window.addEventListener('cartUpdated', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

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
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#e74c3c',
    textDecoration: 'none',
    cursor: 'pointer'
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '25px',
    alignItems: 'center'
  };

  const linkStyle = (path) => ({
    color: location.pathname === path ? '#e74c3c' : 'white',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '8px 12px',
    borderRadius: '5px',
    transition: 'all 0.3s',
    cursor: 'pointer'
  });

  const cartIconStyle = {
    position: 'relative',
    cursor: 'pointer',
    padding: '8px 12px'
  };

  const cartBadgeStyle = {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    backgroundColor: '#e74c3c',
    color: 'white',
    borderRadius: '50%',
    padding: '2px 6px',
    fontSize: '12px',
    fontWeight: 'bold'
  };

  const logoutBtnStyle = {
    backgroundColor: 'transparent',
    color: '#e74c3c',
    border: '1px solid #e74c3c',
    padding: '8px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s'
  };

  return (
    <div style={navStyle}>
      <div style={logoStyle} onClick={() => navigate('/user')}>
        👕 StyleHub
      </div>
      <div style={navLinksStyle}>
        <div style={linkStyle('/user')} onClick={() => navigate('/user')}>
          Home
        </div>
        <div style={linkStyle('/products')} onClick={() => navigate('/products')}>
          Shop
        </div>
        <div style={cartIconStyle} onClick={() => navigate('/cart')}>
          🛒 Cart
          {cartCount > 0 && (
            <span style={cartBadgeStyle}>{cartCount}</span>
          )}
        </div>
        <button onClick={handleLogout} style={logoutBtnStyle}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default UserNavbar;