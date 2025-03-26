import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Button } from "react-bootstrap"; // Import missing Bootstrap components
import { BsHeart, BsHeartFill } from "react-icons/bs";
import CustomNavbar from "./Navbar";

const UserView = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState(false);

  const getAllProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:3000/user/getAllproduts", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

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

  return (
    <>
      <CustomNavbar islogin={true} />
      <div className="text-center my-3">
        <Button variant="secondary" onClick={() => navigate("/updatepassword")}>
          Update Password
        </Button>
      </div>

      <Container fluid className="mt-4">
        <Row className="g-4">
          {products.map((product, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <Card className="shadow-sm border-0 rounded-4 h-100">
                <div className="p-3 d-flex justify-content-center align-items-center" style={{ height: "220px", overflow: "hidden" }}>
                  <Link to={`/showSingleProdut/${product._id}`}>
                  <Card.Img
                    variant="top"
                    src={product.imageUrl[0]}
                    alt={product.product_id.name}
                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "cover" }}
                  />
                  </Link>
                </div>
                <Card.Body className="text-center">
                  <Card.Title className="fw-bold text-truncate">{product.product_id.name}</Card.Title>
                  <Card.Text className="text-muted">${product.product_id.price}</Card.Text>
                  <Button variant="primary" className="w-100 rounded-pill" onClick={() => addtocart(product.product_id._id)}>
                    Add to Cart
                  </Button>
                  <div className="position-absolute top-0 end-0 m-2"
                  style={{ cursor: "pointer", fontSize: "1.5rem", color: "red" }}
                   onClick={() => setWishlist(!wishlist)}
        >
          {wishlist ? <BsHeartFill /> : <BsHeart />}
        </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default UserView;
