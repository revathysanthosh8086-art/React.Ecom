// Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const role = localStorage.getItem('Role');

  const categories = [
    { name: "Men's Fashion", icon: "👔", color: "#3498db" },
    { name: "Women's Fashion", icon: "👗", color: "#e74c3c" },
    { name: "Kids' Wear", icon: "👶", color: "#27ae60" },
    { name: "Accessories", icon: "👜", color: "#f39c12" }
  ];

  const featuredProducts = [
    { name: "Classic Denim Jacket", price: "$89.99", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=300" },
    { name: "Casual Summer Dress", price: "$59.99", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300" },
    { name: "Sports Sneakers", price: "$79.99", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300" },
    { name: "Leather Handbag", price: "$129.99", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300" }
  ];

  const heroStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '80px 40px',
    textAlign: 'center',
    borderRadius: '12px',
    marginBottom: '40px'
  };

  const shopNowBtnStyle = {
    backgroundColor: 'white',
    color: '#764ba2',
    border: 'none',
    padding: '12px 30px',
    fontSize: '18px',
    borderRadius: '25px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '20px'
  };

  const sectionTitleStyle = {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px',
    fontSize: '32px'
  };

  const categoriesGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '50px'
  };

  const categoryCardStyle = {
    textAlign: 'center',
    padding: '30px',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform 0.3s'
  };

  const productsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '25px',
    marginBottom: '50px'
  };

  const productCardStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s'
  };

  const productImageStyle = {
    width: '100%',
    height: '250px',
    objectFit: 'cover'
  };

  const productInfoStyle = {
    padding: '15px',
    textAlign: 'center'
  };

  const ctaSectionStyle = {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '60px 40px',
    textAlign: 'center',
    borderRadius: '12px'
  };

  const ctaButtonStyle = {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px'
  };

  return (
    <div>
      {/* Hero Section */}
      <div style={heroStyle}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Welcome to StyleHub</h1>
        <p style={{ fontSize: '20px', marginBottom: '20px' }}>Discover the latest trends in fashion</p>
        <button 
          onClick={() => role ? navigate('/products') : navigate('/login')} 
          style={shopNowBtnStyle}
        >
          Shop Now
        </button>
      </div>

      {/* Categories */}
      <h2 style={sectionTitleStyle}>Shop by Category</h2>
      <div style={categoriesGridStyle}>
        {categories.map((category, index) => (
          <div 
            key={index} 
            style={{...categoryCardStyle, backgroundColor: category.color + '20'}}
            onClick={() => role ? navigate('/products') : navigate('/login')}
          >
            <div style={{ fontSize: '48px' }}>{category.icon}</div>
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>

      {/* Featured Products */}
      <h2 style={sectionTitleStyle}>Featured Products</h2>
      <div style={productsGridStyle}>
        {featuredProducts.map((product, index) => (
          <div key={index} style={productCardStyle}>
            <img src={product.image} alt={product.name} style={productImageStyle} />
            <div style={productInfoStyle}>
              <h3>{product.name}</h3>
              <p style={{ color: '#e74c3c', fontSize: '20px', fontWeight: 'bold' }}>{product.price}</p>
              <button 
                onClick={() => role ? navigate('/products') : navigate('/login')}
                style={{...shopNowBtnStyle, padding: '8px 20px', fontSize: '14px'}}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div style={ctaSectionStyle}>
        <h2 style={{ fontSize: '32px', marginBottom: '15px' }}>Ready to Upgrade Your Style?</h2>
        <p style={{ fontSize: '18px' }}>Get exclusive offers and latest trends delivered to your inbox</p>
        <button 
          onClick={() => role ? alert('You are already logged in!') : navigate('/registration')}
          style={ctaButtonStyle}
        >
          {role ? 'Start Shopping' : 'Join Now'}
        </button>
      </div>
    </div>
  );
}

export default Home;