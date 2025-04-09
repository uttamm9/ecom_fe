import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CustomNavbar from "./navbar";
import "./singleProductPage.css";
import { useNavigate } from 'react-router-dom';


const SingleProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const getSingleProduct = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `http://localhost:3000/user/showSingleProdut/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
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

  if (!product) return <h2>Loading...</h2>;
  console.log(product.product_id);
  return (
    <>
      <CustomNavbar islogin={true} />
      <div className="container mt-5">
        <div className="product-details">
          {/* Product Images */}
          <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              {product.imageUrl?.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : undefined}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {product.imageUrl?.map((img, index) => (
                <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                  <img src={img} className="d-block w-100" alt={`Product ${index}`} />
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>

          {/* Product Details */}
          <div className="mt-4">
            <h3>Brand: {product.product_id.brand}</h3>
            <p className="price">Price: ₹{product.product_id.price}</p>
            <p className="description">{product.product_id.description}</p>
            <p
              className={`availability ${
                product.product_id.isAvailable ? "text-success" : "text-danger"
              }`}
            >
              {product.product_id.isAvailable ? "In Stock" : "Out of Stock"}
            </p>

            <button className="btn btn-success me-2">Buy Now</button>
            <button
              className="btn btn-warning"
              onClick={(e) => addtocart(product.product_id)}
            >
              Add to Cart
            </button>
          </div>

          {/* Supplier Details */}
          <div className="mt-4">
            <h4>Supplier Information</h4>
            <p>Seller: {product.product_id.supplier_id?.businessName}</p>
            <p>Contact info: {product.product_id.supplier_id?.businessEmail}</p>
            <p>Address: {product.product_id.supplier_id?.businessAddress}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductPage;
