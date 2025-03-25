import React from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = ({islogin}) => {
  console.log(islogin);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
   
  };
  return (
    <>
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="/path/to/brandlogo.png" alt="Brand Logo" className="brand-logo" />
      </div>
      <div className="navbar-search">
        <input type="text" placeholder="Search..." className="search-box" />
      </div>
      <div className="navbar-actions">
        {islogin ? (
          <button className="login-logout-btn" onClick={handleLogout}>logout</button>
        ) : (
          <button className="login-logout-btn">login</button>
        )}
        
        <button className="cart-btn" >Cart</button>
      </div>
    </nav>
    </>
  );
};

export default Navbar;