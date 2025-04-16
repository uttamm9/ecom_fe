import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomNavbar from "./navbar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./AddToCart.css";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate()

  // Function to increase quantity
  const increaseQuantity = async(id) => {
    console.log(id)
    const token = localStorage.getItem('token')
    try {
      const response = await axios.patch('http://localhost:3000/user/increseitem',{id},{
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': `Bearer ${token}`
        }
      })
      console.log(response.data.message)
      if(response.data.message != "Quantity increased by 1"){
        alert(response.data.message)
      }
      getCartItemsCount();
    } catch (error) {
      alert(error.response.data.message)
    }
  };

  // Function to decrease quantity
  const decreaseQuantity = async(id,quantity) => {
    console.log(id)
    console.log("minimum>>",quantity)
    if(quantity>1){

    
    const token = localStorage.getItem('token')
    try {
      const response = await axios.patch('http://localhost:3000/user/decreseitem',{id},{
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': `Bearer ${token}`
        }
      })
      getCartItemsCount();
    } catch (error) {
      alert(error.response.data.message)
    }
  }
  };

  // Function to remove an item from cart
  const removeItem = async(id) => {
    console.log(id)
    const token = localStorage.getItem('token')
    try {
      const response = await axios.delete(`http://localhost:3000/user/deletecartitem/${id}`,{
        headers:{
          authorization:`Bearer ${token}`
        }
      })
      console.log(response.data.message)
      getCartItemsCount();
    } catch (error) {
      
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + parseInt(item.productDetails.price) * item.quantity, 0);
  // console.log(`>>>>>totalPrice`,totalPrice);
  

  const getCartItemsCount = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3000/user/getCartItems", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      // console.log(`>>>>>>`,response.data[0].productDetails);
      setCartItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartItemsCount();
  }, []);

  const totalValue = cartItems.map((item) => (
    parseInt(item.productDetails.price) * (2)
  ))
  // console.log(`>>>>totalValue`,totalValue);
  


  return (
    <Container fluid style={{width:"100%",padding:'0px',margin:'0px'}} className="bg-light">
      <CustomNavbar islogin={localStorage.getItem("token")}/>
      <h2 className="text-center mt-1">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <h3 className="text-center text-muted" style={{marginTop:'120px'}}>Your cart is empty!</h3>
      ) : (
        <>
          <Row className="g-4" style={{width:"100%"}}>
            {cartItems.map((item) => (
              <Col key={item._id} xs={12} md={6} lg={3}>
                <Card className="shadow-sm border-0 rounded-4 h-100">
                  <Card.Img
                    variant="top"
                    src={item.productImages[0]}
                    alt={item.productDetails.name}
                    className="p-3"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title className="fw-bold text-truncate">{item.productDetails.name.slice(0,20)}...</Card.Title>
                    <Card.Text className="text-muted">Price: ₹{item.productDetails.price}</Card.Text>
                    <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                      <Button variant="outline-primary" size="sm" onClick={() => {decreaseQuantity(item._id,item.quantity)}}>-</Button>
                      <span className="fw-bold">{item.quantity}</span>
                      <Button variant="outline-primary" size="sm" onClick={() => {increaseQuantity(item._id)}}>+</Button>
                    </div>
                    <Card.Text className="fw-bold">Total: ₹{parseInt(item.productDetails.price) * item.quantity}</Card.Text>
                    <Button variant="danger" size="sm" onClick={() => removeItem(item._id)}>Delete</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Total Price Section */}
          <div className="text-center mt-4">
            <h3>Total Price: ₹{totalPrice.toLocaleString()}</h3>
            <Button variant="success" size="lg" className="mt-2" onClick={()=>navigate('/checkout')}>Proceed to Checkout</Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default CartPage;
