import React, { useEffect, useState } from 'react';
import CustomNavbar from './navbar';
import axios from 'axios';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  // Fetch user orders
  const getMyOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/myorders", {
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

  const handleOrderAction = async (orderId, action) => {
    console.log(`Order ${orderId} selected action: ${action}`);

    // Example API request to update order status (uncomment when backend is ready)
    try {
      await axios.put(`http://localhost:3000/user/order/${orderId}/update`, { action }, {
        headers: { authorization: `Bearer ${token}` },
      });
      getMyOrders(); // Refresh orders after action
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <>
      <CustomNavbar islogin={token} />
      <div style={{ maxWidth: "900px", margin: "80px auto 20px", padding: "20px" }}>
        <h2>Your Orders</h2>

        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <div key={order._id} style={{ border: "1px solid #ddd", borderRadius: "10px", padding: "15px", marginBottom: "15px", display: "flex", gap: "15px", alignItems: "center" }}>
              
              {/* Product Image */}
              <div style={{ width: "120px", height: "120px", overflow: "hidden", borderRadius: "5px" }}>
                <img 
                  src={order.productImages[0][0] || "https://via.placeholder.com/120"} 
                  alt={order.productDetails.name} 
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                />
              </div>

              {/* Order Details */}
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 5px" }}>{order.productDetails.name}</h3>
                <p style={{ margin: "0 0 5px", color: "#555" }}>Category: {order.productDetails.category}</p>
                <p style={{ margin: "0 0 5px" }}>Price: ₹{order.productDetails.price}</p>
                <p style={{ margin: "0 0 5px" }}>Quantity: {order.quantity}</p>
                <p style={{ margin: "0 0 5px", fontWeight: "bold" }}>Status: {order.status}</p>
                <p style={{ margin: "0 0 5px" }}>Payment Mode: {order.paymentMode}</p>
                <p style={{ margin: "0 0 5px", color: "#777" }}>Delivery to: {order.addressDetails.city}</p>
              </div>
              <div>
                <select 
                  onChange={(e) => handleOrderAction(order._id, e.target.value)}
                  defaultValue=""
                  style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", cursor: "pointer" }}
                >
                  <option value="" disabled>Select Action</option>
                  <option value="cancel">Cancel</option>
                  <option value="return">Return</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default UserOrders;
