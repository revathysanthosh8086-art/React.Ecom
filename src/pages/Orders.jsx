// Orders.jsx (New file for admin orders)
import React, { useState, useEffect } from 'react';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  const updateOrderStatus = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index].status = newStatus;
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  const containerStyle = {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  };

  const thStyle = {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
    border: '1px solid #ddd'
  };

  const tdStyle = {
    padding: '10px',
    border: '1px solid #ddd'
  };

  const statusSelectStyle = {
    padding: '5px',
    borderRadius: '3px',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #e74c3c', paddingBottom: '10px' }}>
        Orders Management
      </h2>
      
      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '50px', color: '#7f8c8d' }}>No orders yet</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Order ID</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Items</th>
              <th style={thStyle}>Total</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td style={tdStyle}>#{order.id}</td>
                <td style={tdStyle}>{order.date}</td>
                <td style={tdStyle}>{order.items.length} items</td>
                <td style={tdStyle}>${order.total.toFixed(2)}</td>
                <td style={tdStyle}>
                  <select 
                    value={order.status} 
                    onChange={(e) => updateOrderStatus(index, e.target.value)}
                    style={statusSelectStyle}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Orders;