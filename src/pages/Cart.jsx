// Cart.jsx
import React, { useState, useEffect } from 'react';

function Cart() {
  const [cartItem, setCartItem] = useState([]);

  useEffect(() => {
    const storedcart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItem(storedcart);
  }, []);

  const removeFromCart = (index) => {
    const updatedCart = cartItem.filter((_, i) => i !== index);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItem(updatedCart);
    alert('Item removed from cart');
  };

  const getTotalPrice = () => {
    return cartItem.reduce((total, item) => total + (item.price || 0), 0);
  };

  const handleCheckout = () => {
    if (cartItem.length === 0) {
      alert('Your cart is empty');
      return;
    }
    
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = {
      id: Date.now(),
      items: cartItem,
      total: getTotalPrice(),
      date: new Date().toLocaleString(),
      status: 'Pending'
    };
    
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cart');
    setCartItem([]);
    alert('Order placed successfully!');
  };

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    maxWidth: '800px',
    margin: '0 auto'
  };

  const cartItemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    borderBottom: '1px solid #eee',
    marginBottom: '10px'
  };

  const productInfoStyle = {
    flex: 1
  };

  const productNameStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0 0 5px 0'
  };

  const productPriceStyle = {
    color: '#e74c3c',
    fontSize: '16px',
    margin: '0'
  };

  const removeBtnStyle = {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  const totalStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    marginTop: '20px'
  };

  const totalAmountStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#e74c3c'
  };

  const checkoutBtnStyle = {
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #e74c3c', paddingBottom: '10px' }}>
        Shopping Cart
      </h2>
      
      {cartItem.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p style={{ fontSize: '18px', color: '#7f8c8d' }}>Your cart is empty</p>
          <a href="/products" style={{ color: '#e74c3c', textDecoration: 'none' }}>Continue Shopping</a>
        </div>
      ) : (
        <>
          {cartItem.map((item, index) => (
            <div key={index} style={cartItemStyle}>
              <div style={productInfoStyle}>
                <h3 style={productNameStyle}>{item.name}</h3>
                <p style={productPriceStyle}>${item.price}</p>
              </div>
              <button onClick={() => removeFromCart(index)} style={removeBtnStyle}>
                Remove
              </button>
            </div>
          ))}
          
          <div style={totalStyle}>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>Total Amount:</span>
            <span style={totalAmountStyle}>${getTotalPrice().toFixed(2)}</span>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={handleCheckout} style={checkoutBtnStyle}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;