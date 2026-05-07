// AdminProduct.jsx
import React, { useState, useEffect } from 'react';

function AdminProduct() {
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('products')) || [];
    setItems(data);
  }, []);

  const handleAdd = () => {
    if (!product || !price || !category) {
      alert("Please fill all fields");
      return;
    }

    const newItem = { 
      name: product, 
      price: parseFloat(price), 
      category,
      image: image || 'https://via.placeholder.com/200'
    };

    let updatedData;
    if (editingIndex !== null) {
      updatedData = [...items];
      updatedData[editingIndex] = newItem;
      setEditingIndex(null);
    } else {
      const oldData = JSON.parse(localStorage.getItem('products')) || [];
      updatedData = [...oldData, newItem];
    }

    localStorage.setItem('products', JSON.stringify(updatedData));
    setItems(updatedData);

    setProduct("");
    setPrice("");
    setCategory("");
    setImage("");
  };

  const handleDelete = (index) => {
    const updatedData = items.filter((_, i) => i !== index);
    localStorage.setItem('products', JSON.stringify(updatedData));
    setItems(updatedData);
  };

  const handleEdit = (index) => {
    const item = items[index];
    setProduct(item.name);
    setPrice(item.price);
    setCategory(item.category);
    setImage(item.image);
    setEditingIndex(index);
  };

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const formStyle = {
    backgroundColor: '#f8f9fa',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '30px'
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '14px'
  };

  const buttonStyle = {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const productGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  };

  const productCardStyle = {
    backgroundColor: '#fff',
    border: '1px solid #eee',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
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
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 5px 0'
  };

  const productPriceStyle = {
    color: '#e74c3c',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '5px 0'
  };

  const productCategoryStyle = {
    color: '#7f8c8d',
    fontSize: '14px',
    margin: '5px 0'
  };

  const actionButtonStyle = {
    padding: '5px 10px',
    margin: '5px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #e74c3c', paddingBottom: '10px' }}>
        Product Management
      </h2>

      <div style={formStyle}>
        <h3>{editingIndex !== null ? 'Edit Product' : 'Add New Product'}</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          style={inputStyle}
        />
        <input
          type="number"
          placeholder="Price ($)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={inputStyle}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Category</option>
          <option value="Men">Men's Clothing</option>
          <option value="Women">Women's Clothing</option>
          <option value="Kids">Kids' Clothing</option>
          <option value="Accessories">Accessories</option>
        </select>
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleAdd} style={buttonStyle}>
          {editingIndex !== null ? 'Update Product' : 'Add Product'}
        </button>
      </div>

      <h3>Product List ({items.length} items)</h3>
      <div style={productGridStyle}>
        {items.map((item, index) => (
          <div key={index} style={productCardStyle}>
            <img 
              src={item.image} 
              alt={item.name} 
              style={productImageStyle}
              onError={(e) => e.target.src = 'https://via.placeholder.com/200'}
            />
            <div style={productInfoStyle}>
              <h4 style={productNameStyle}>{item.name}</h4>
              <p style={productCategoryStyle}>{item.category}</p>
              <p style={productPriceStyle}>${item.price}</p>
              <div>
                <button 
                  onClick={() => handleEdit(index)} 
                  style={{...actionButtonStyle, backgroundColor: '#3498db', color: 'white' }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(index)} 
                  style={{...actionButtonStyle, backgroundColor: '#e74c3c', color: 'white' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProduct;