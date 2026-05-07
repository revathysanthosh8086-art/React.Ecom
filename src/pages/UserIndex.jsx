// UserIndex.jsx (User Dashboard)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserIndex() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('loggeduser'));
    setUserData(loggedUser);
    
    const products = JSON.parse(localStorage.getItem('products')) || [];
    setRecentProducts(products.slice(0, 4));
  }, []);

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const welcomeStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '40px',
    borderRadius: '12px',
    marginBottom: '30px',
    textAlign: 'center'
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
    cursor: 'pointer',
    transition: 'transform 0.3s',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  const sectionTitleStyle = {
    color: '#2c3e50',
    marginBottom: '20px',
    borderBottom: '2px solid #e74c3c',
    paddingBottom: '10px'
  };

  const productsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  };

  const productCardStyle = {
    backgroundColor: '#fff',
    border: '1px solid #eee',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s'
  };

  const productImageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  };

  const productInfoStyle = {
    padding: '15px'
  };

  const productNameStyle = {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0 0 5px 0'
  };

  const productPriceStyle = {
    color: '#e74c3c',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '5px 0'
  };

  const shopBtnStyle = {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '10px'
  };

  return (
    <div style={containerStyle}>
      <div style={welcomeStyle}>
        <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>
          Welcome back, {userData?.name || 'Shopper'}! 👋
        </h1>
        <p style={{ fontSize: '18px' }}>Ready to discover the latest fashion trends?</p>
      </div>

      <div style={statsContainerStyle}>
        <div style={statCardStyle} onClick={() => navigate('/products')}>
          <div style={{ fontSize: '40px' }}>🛍️</div>
          <h3>Shop Now</h3>
          <p>Explore our collection</p>
        </div>
        <div style={statCardStyle} onClick={() => navigate('/cart')}>
          <div style={{ fontSize: '40px' }}>🛒</div>
          <h3>My Cart</h3>
          <p>View your items</p>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: '40px' }}>❤️</div>
          <h3>Wishlist</h3>
          <p>Saved items</p>
        </div>
        <div style={statCardStyle}>
          <div style={{ fontSize: '40px' }}>📦</div>
          <h3>My Orders</h3>
          <p>Track your orders</p>
        </div>
      </div>

      <h2 style={sectionTitleStyle}>Trending Products</h2>
      <div style={productsGridStyle}>
        {recentProducts.map((product, index) => (
          <div key={index} style={productCardStyle}>
            <img 
              src={product.image || 'https://via.placeholder.com/200'} 
              alt={product.name}
              style={productImageStyle}
              onError={(e) => e.target.src = 'https://via.placeholder.com/200'}
            />
            <div style={productInfoStyle}>
              <h4 style={productNameStyle}>{product.name}</h4>
              <p style={productPriceStyle}>${product.price}</p>
              <button 
                onClick={() => navigate('/products')} 
                style={shopBtnStyle}
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserIndex;