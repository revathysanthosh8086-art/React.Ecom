// Users.jsx (Admin User Management Page)
import React, { useState, useEffect } from 'react';

function Users() {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        setData(users);
        setFilteredUsers(users);
    }, []);

    useEffect(() => {
        const filtered = data.filter(user => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
    }, [searchTerm, data]);

    const deleteUser = (index) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            const updatedUsers = data.filter((_, i) => i !== index);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            setData(updatedUsers);
            alert('User deleted successfully!');
        }
    };

    const containerStyle = {
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '15px'
    };

    const titleStyle = {
        color: '#2c3e50',
        borderBottom: '3px solid #e74c3c',
        paddingBottom: '10px',
        margin: 0
    };

    const searchInputStyle = {
        padding: '10px 15px',
        border: '1px solid #ddd',
        borderRadius: '25px',
        width: '250px',
        fontSize: '14px'
    };

    const statsStyle = {
        backgroundColor: '#f8f9fa',
        padding: '15px',
        borderRadius: '10px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '10px'
    };

    const statBadgeStyle = {
        backgroundColor: '#e74c3c',
        color: 'white',
        padding: '5px 15px',
        borderRadius: '20px',
        fontSize: '14px'
    };

    const tableContainerStyle = {
        overflowX: 'auto'
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
        minWidth: '600px'
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

    const deleteBtnStyle = {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '5px 12px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '12px'
    };

    const noDataStyle = {
        textAlign: 'center',
        padding: '50px',
        color: '#7f8c8d'
    };

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h2 style={titleStyle}>User Management</h2>
                <input
                    type="text"
                    placeholder="🔍 Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={searchInputStyle}
                />
            </div>

            <div style={statsStyle}>
                <span>Total Users: <strong>{data.length}</strong></span>
                <span style={statBadgeStyle}>
                    Showing: {filteredUsers.length} users
                </span>
            </div>

            <div style={tableContainerStyle}>
                {filteredUsers.length === 0 ? (
                    <div style={noDataStyle}>
                        <p>No users found</p>
                    </div>
                ) : (
                    <table style={tableStyle}>
                        <thead>
                            <tr>
                                <th style={thStyle}>#</th>
                                <th style={thStyle}>Name</th>
                                <th style={thStyle}>Email</th>
                                <th style={thStyle}>Password</th>
                                <th style={thStyle}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((item, index) => (
                                <tr key={index}>
                                    <td style={tdStyle}>{index + 1}</td>
                                    <td style={tdStyle}>{item.name}</td>
                                    <td style={tdStyle}>{item.email}</td>
                                    <td style={tdStyle}>••••••</td>
                                    <td style={tdStyle}>
                                        <button 
                                            onClick={() => deleteUser(data.findIndex(u => u.email === item.email))}
                                            style={deleteBtnStyle}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Users;