import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomNavbar from "./navbar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./AddToCart.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // Function to increase quantity
  const increaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Function to decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems(cartItems.map(item => 
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    ));
  };

  // Function to remove an item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.productDetails.price * item.quantity, 0);

  const getCartItemsCount = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3000/user/getCartItems", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setCartItems(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartItemsCount();
  }, []);

  return (
    <Container className="mt-4">
      <CustomNavbar islogin={localStorage.getItem("token")}/>
      <h2 className="text-center">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <h3 className="text-center text-muted">Your cart is empty!</h3>
      ) : (
        <>
          <Row className="g-4">
            {cartItems.map((item) => (
              <Col key={item.id} xs={12} md={6} lg={4}>
                <Card className="shadow-sm border-0 rounded-4 h-100">
                  <Card.Img
                    variant="top"
                    src={item.productImages[0]}
                    alt={item.productDetails.name}
                    className="p-3"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body className="text-center">
                    <Card.Title className="fw-bold text-truncate">{item.productDetails.name}</Card.Title>
                    <Card.Text className="text-muted">Price: ₹{item.productDetails.price}</Card.Text>
                    <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                      <Button variant="outline-primary" size="sm" onClick={() => decreaseQuantity(item.id)}>-</Button>
                      <span className="fw-bold">{item.quantity}</span>
                      <Button variant="outline-primary" size="sm" onClick={() => increaseQuantity(item.id)}>+</Button>
                    </div>
                    <Card.Text className="fw-bold">Total: ₹{item.productDetails.price * item.quantity}</Card.Text>
                    <Button variant="danger" size="sm" onClick={() => removeItem(item.id)}>Delete</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Total Price Section */}
          <div className="text-center mt-4">
            <h3>Total Price: ₹{totalPrice.toLocaleString()}</h3>
            <Button variant="success" size="lg" className="mt-2">Proceed to Checkout</Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default CartPage;
