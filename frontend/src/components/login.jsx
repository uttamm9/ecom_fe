import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CustomNavbar from './navbar';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('role',role)
    try {
      const res = await axios.post('http://localhost:3000/user/login', {
      email: email,
      password: password,
      role:role
      });
      console.log(res.data);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('name', res.data.username);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      if(res.data.role === 'user'){
        navigate('/userview');
      } else if(res.data.role === 'supplier'){ 
        console.log('Supplier',res.data);
        navigate('/supplierdashboard');
      }
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
     
  };

  return (
    <>
    <div><CustomNavbar /></div>
    <div
      style={{
        background: "white",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        width: "320px",
        textAlign: "center",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
        marginTop: "5.5rem",
      }}
    >
      <h2 style={{ color: "#333", marginBottom: "1rem" }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem", textAlign: "left" }}>
          <label htmlFor="email" style={{ fontWeight: "bold", color: "#555" }}>
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "1rem",
              transition: "0.3s",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem", textAlign: "left" }}>
          <label htmlFor="password" style={{ fontWeight: "bold", color: "#555" }}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "1rem",
              transition: "0.3s",
            }}
          />
        </div>
        <div style={{ marginBottom: "1rem", textAlign: "left" }}>
          <label htmlFor="role" style={{ fontWeight: "bold", color: "#555" }}>
            Role:
          </label>
          <div>
            <input
              type="radio"
              id="user"
              name="role"
              value="user"
              checked={role === 'user'}
              onChange={(e) => setRole(e.target.value)}
              style={{ marginRight: "0.5rem" }}
            />
            <label htmlFor="user" style={{ marginRight: "1rem" ,color:'black'}}>User</label>
            <input
              type="radio"
              id="supplier"
              name="role"
              value="supplier"
              checked={role === 'supplier'}
              onChange={(e) => setRole(e.target.value)}
              style={{ marginRight: "0.5rem" }}
            />
            <label htmlFor="supplier" style={{color:'black'}}>Supplier</label>
          </div>
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: "pointer",
            background: "#667eea",
            color: "white",
            marginTop: "1rem",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#5563c1")}
          onMouseOut={(e) => (e.target.style.background = "#667eea")}
        >
          Login
        </button>
      </form>
      <button
        onClick={() => navigate('/forgetpassword')}
        style={{
          background: "transparent",
          color: "#667eea",
          textDecoration: "underline",
          marginTop: "1rem",
          border: "none",
          fontSize: "1rem",
          cursor: "pointer",
        }}
        onMouseOver={(e) => (e.target.style.color = "#5548a0")}
        onMouseOut={(e) => (e.target.style.color = "#667eea")}
      >
        Forgot Password
      </button>
      <button onClick={() => navigate('/usersignup')}>Signup</button>
    </div>
    </>
  );
};

export default Login;