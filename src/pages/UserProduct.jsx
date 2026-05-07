// UserProduct.jsx (Product Listing Page for Users)
import React, { useState, useEffect } from 'react';

function UserProduct() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    // Sample products if none exist
    if (storedProducts.length === 0) {
      const sampleProducts = [
        { name: "Classic Denim Jacket", price: 89.99, category: "Men", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=300" },
        { name: "Casual Summer Dress", price: 59.99, category: "Women", image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300" },
        { name: "Sports Sneakers", price: 79.99, category: "Men", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300" },
        { name: "Leather Handbag", price: 129.99, category: "Women", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300" },
        { name: "Kids T-Shirt Set", price: 34.99, category: "Kids", image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=300" },
        { name: "Woolen Scarf", price: 24.99, category: "Accessories", image: "https://images.unsplash.com/photo-1602410757752-7f771177ff41?w=300" }
      ];
      localStorage.setItem('products', JSON.stringify(sampleProducts));
      setProducts(sampleProducts);
      setFilteredProducts(sampleProducts);
    } else {
      setProducts(storedProducts);
      setFilteredProducts(storedProducts);
    }
  }, []);

  useEffect(() => {
    let filtered = [...products];
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (priceRange !== 'all') {
      if (priceRange === 'under50') {
        filtered = filtered.filter(product => product.price < 50);
      } else if (priceRange === '50to100') {
        filtered = filtered.filter(product => product.price >= 50 && product.price <= 100);
      } else if (priceRange === 'above100') {
        filtered = filtered.filter(product => product.price > 100);
      }
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, priceRange, products]);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
    
    // Dispatch custom event for navbar update
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const categories = [
    { id: 'all', name: 'All Products', icon: '👕' },
    { id: 'Men', name: "Men's Wear", icon: '👔' },
    { id: 'Women', name: "Women's Wear", icon: '👗' },
    { id: 'Kids', name: "Kids' Wear", icon: '👶' },
    { id: 'Accessories', name: 'Accessories', icon: '👜' }
  ];

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '30px'
  };

  const titleStyle = {
    color: '#2c3e50',
    fontSize: '32px',
    marginBottom: '10px'
  };

  const subtitleStyle = {
    color: '#7f8c8d',
    fontSize: '16px'
  };

  const filtersStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px'
  };

  const searchInputStyle = {
    padding: '10px 15px',
    border: '1px solid #ddd',
    borderRadius: '25px',
    width: '250px',
    fontSize: '14px'
  };

  const selectStyle = {
    padding: '10px 15px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px',
    cursor: 'pointer'
  };

  const categoriesStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginBottom: '30px'
  };

  const categoryBtnStyle = (isActive) => ({
    padding: '10px 20px',
    backgroundColor: isActive ? '#e74c3c' : '#f8f9fa',
    color: isActive ? 'white' : '#2c3e50',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s'
  });

  const productsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '25px'
  };

  const productCardStyle = {
    backgroundColor: '#fff',
    border: '1px solid #eee',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer'
  };

  const productImageStyle = {
    width: '100%',
    height: '250px',
    objectFit: 'cover'
  };

  const productInfoStyle = {
    padding: '15px'
  };

  const productNameStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 5px 0',
    color: '#2c3e50'
  };

  const productCategoryStyle = {
    color: '#7f8c8d',
    fontSize: '14px',
    margin: '5px 0'
  };

  const productPriceStyle = {
    color: '#e74c3c',
    fontSize: '22px',
    fontWeight: 'bold',
    margin: '10px 0'
  };

  const addToCartBtnStyle = {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
    width: '100%',
    fontSize: '16px',
    transition: 'background 0.3s'
  };

  const noProductsStyle = {
    textAlign: 'center',
    padding: '50px',
    color: '#7f8c8d'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Shop Our Collection</h1>
        <p style={subtitleStyle}>Discover the latest trends in fashion</p>
      </div>

      <div style={filtersStyle}>
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
        
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          style={selectStyle}
        >
          <option value="all">All Prices</option>
          <option value="under50">Under $50</option>
          <option value="50to100">$50 - $100</option>
          <option value="above100">Above $100</option>
        </select>
      </div>

      <div style={categoriesStyle}>
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            style={categoryBtnStyle(selectedCategory === category.id)}
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div style={noProductsStyle}>
          <p>No products found matching your criteria.</p>
          <p>Try adjusting your filters!</p>
        </div>
      ) : (
        <div style={productsGridStyle}>
          {filteredProducts.map((product, index) => (
            <div key={index} style={productCardStyle}>
              <img 
                src={product.image} 
                alt={product.name}
                style={productImageStyle}
                onError={(e) => e.target.src = 'https://via.placeholder.com/280x250?text=' + product.name}
              />
              <div style={productInfoStyle}>
                <h3 style={productNameStyle}>{product.name}</h3>
                <p style={productCategoryStyle}>{product.category || 'Fashion'}</p>
                <p style={productPriceStyle}>${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}</p>
                <button 
                  onClick={() => addToCart(product)} 
                  style={addToCartBtnStyle}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2980b9'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#3498db'}
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserProduct;