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

  const handleAction = async (orderId,value) => {
    console.log(orderId,value)
    try {
      try {
        const response = await axios.patch("http://localhost:3000/supplier/orderAction", { _id: orderId, status: value }, {
          headers: { authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          console.log("Order updated successfully:", response.data);
        } else {
          console.error("Unexpected response:", response);
        }
        console.log(response.data);
        getMyOrders(); // Refresh orders after cancellation
      } catch (error) {
        console.error("Error updating order:", error.response ? error.response.data : error.message);
      }
     
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  }

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
                <p>Status: {order.status}</p>
                <select name="" id="" onChange={(e)=>handleAction(order._id,e.target.value)} style={{padding:"10px", borderRadius:"5px", border:"1px solid #ddd"}}>
                    <option value="">Action</option>
                   {order.status === "innciet" ? (
                     <>
                       <option value="cancel">Cancel</option>
                       <option value="packege">packege</option>
                     </>
                   ) : null}
                   {order.status === 'cancel'?(
                    <option>Order cancled</option>
                   ):null}
                   {order.status === 'packege'?(
                    <option value="deliver">deliver</option>
                   ):null}
                   {order.status === 'deliver'?(
                    <option value="delivered">delivered</option>
                   ):null}
{/*                    
                   
                    <option value="delivered">Delivered</option>
                    <option value="returned">Returned</option> */}
                </select>
            </div>
        ))}
        {/* Example order structure ends */}
       <button style={{backgroundColor:"#007bff", color:"#fff", padding:"10px 20px", border:"none", borderRadius:"5px"}}>Load More Orders</button> 
    </div>
    <div style={{height:"100px"}}></div>
    {/* Footer or other components can go here */}
    <footer style={{textAlign:"center", padding:"20px", backgroundColor:"#f8f9fa", position:"fixed", bottom:"0", width:"100%"}}>
        <p>&copy; 2025 E-com. All rights reserved.</p> 
    </footer>
    
    </>
  )
}

export default supplierOrders