import React from 'react'
import CustomNavbar from './navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
const supplierOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');
  const getMyOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/supplier/getorders", {
        headers: { authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  useEffect(() => {
    getMyOrders();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/"; // Redirect to login page
  };

  return (
    <>
    <div style={{ 
  position: 'fixed', top: '0', width: '100%', background: '#007bff ', 
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '10px 20px', 
  display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
  zIndex: '1000' 
}}>
  {/* Left Section */}
  <div style={{ color: 'white', fontSize: '16px' }}>
    <span>Welcome, </span>
    <h3 style={{ display: 'inline', fontWeight: 'bold' }}>
      {localStorage.getItem('name')}
    </h3>
  </div>

  {/* Center Section */}
  <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
    Amazon
  </div>

  {/* Right Section */}
  <button 
    onClick={handleLogout} 
    style={{ 
      backgroundColor: 'red', color: 'white', border: 'none', padding: '8px 15px', 
      borderRadius: '5px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold',
      transition: 'background 0.3s'
    }}
    onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
    onMouseOut={(e) => e.target.style.backgroundColor = 'red'}
  >
    Logout
  </button>
</div>

    <div style={{maxWidth:"900px", margin:"80px auto 20px", padding:"20px"}}>
        <h2>Your Orders</h2>
       <hr />
      {orders.map(order => (
            <div key={order._id} style={{border:"1px solid #ddd", borderRadius:"10px", padding:"15px", marginBottom:"15px"}}>
                <h3>Order ID: {order._id}</h3>
                <p>Product Name: {order.productId.name}</p>
                <p>Quantity: {order.quantity}</p>
                <p>Total Price: ₹{order.productId.price*order.quantity}</p>
                <button style={{backgroundColor:"#28a745", color:"#fff", padding:"10px 20px", border:"none", borderRadius:"5px"}}>Mark as Shipped</button>
            </div>
        ))}
        {/* Example order structure ends */}
       <button style={{backgroundColor:"#007bff", color:"#fff", padding:"10px 20px", border:"none", borderRadius:"5px"}}>Load More Orders</button> 
    </div>
    <div style={{height:"100px"}}></div>
    {/* Footer or other components can go here */}
    <footer style={{textAlign:"center", padding:"20px", backgroundColor:"#f8f9fa", position:"fixed", bottom:"0", width:"100%"}}>
        <p>&copy; 2023 Your Company. All rights reserved.</p> 
    </footer>
    
    </>
  )
}

export default supplierOrders