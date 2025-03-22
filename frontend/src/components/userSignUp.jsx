import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const UserSignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    try {
      const response = await axios.post('http://localhost:3000/user/userSignup', formData);
      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
   

  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Phone Number:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
        />
      </div>
      <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Sign Up</button>
      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        <Link to='/suppliersignup' style={{ color: '#007bff', textDecoration: 'none' }}>Sign up as a supplier</Link>
      </div>
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        Already have an account? <Link to='/' style={{ color: '#007bff', textDecoration: 'none' }}>Login</Link>
      </div>
    </form>
  );
};

export default UserSignUp;