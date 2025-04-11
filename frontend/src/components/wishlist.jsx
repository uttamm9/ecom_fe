import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BsTrash, BsCart } from "react-icons/bs"; // Bootstrap icons
import axios from 'axios'
import CustomNavbar from "./navbar";
const Wishlist = () => {
  // Sample wishlist products (Replace with API data if needed)
  const [wishlist, setWishlist] = useState([]);

  // Function to remove item from wishlist
  const removeFromWishlist = async(product_id) => {
    console.log(product_id)
    const token = localStorage.getItem('token')
    try {
      const response = await axios.delete(
      `http://localhost:3000/user/removewishlist/${product_id}`,
      {
        headers: {
        authorization: `Bearer ${token}`,
        },
      }
      );
      console.log(response.data);
      setWishlist(wishlist.filter((item) => item.productDetails._id !== _id));
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle add to cart
  const addtocart = async (product_id) => {
    const token = localStorage.getItem("token");
    console.log(product_id);
    try {
      const response = await axios.post(
        "http://localhost:3000/user/addtocart",
        { product_id },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const getwishlistdata = async()=>{
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get('http://localhost:3000/user/wishlistdata',
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      console.log(response.data)
      setWishlist(response.data)
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    getwishlistdata()
  },[])

  return (
    <Container className="mt-4">
    <CustomNavbar islogin={localStorage.getItem('token')} />
    <h2 className="text-center" style={{marginTop:"40px"}}>My Wishlist</h2>
    <Row className="g-4 justify-content-center" style={{ marginTop: "20px" }}> 
      {wishlist.length > 0 ? (
        wishlist.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={6} lg={10}> 
            <Card className="shadow-lg border-0 rounded-4 h-100 mx-auto" style={{ maxWidth: "400px" }}> 
              <div className="p-3 d-flex justify-content-center align-items-center" style={{ height: "250px", overflow: "hidden" }}>
                <Card.Img 
                  variant="top" 
                  src={product.productImages[0]} 
                  alt={product.productDetails.name} 
                  style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "cover" }} 
                />
              </div>
              <Card.Body className="text-center">
                <Card.Title className="fw-bold">{product.productDetails.name}</Card.Title>
                <Card.Text className="text-muted fs-5">${product.productDetails.price}</Card.Text>
                <Button variant="primary" className="w-100 rounded-pill mb-2" onClick={() => addtocart(product.productDetails._id)}>
                  <BsCart size={20} /> Add to Cart
                </Button>
                <Button variant="danger" className="w-100 rounded-pill" onClick={() => removeFromWishlist(product.productDetails._id)}>
                  <BsTrash size={20} /> Remove
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <h4 className="text-center mt-4">No items in wishlist.</h4>
      )}
    </Row>
  </Container>
  )  
}

export default Wishlist;
