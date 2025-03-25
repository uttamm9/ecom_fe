import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./navbar"
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

  if (!product) return <h2>Loading...</h2>;
  console.log(product.product_id);
  return (
    <div className="container">
      <Navbar islogin={true} />
      {/* Product Images */}
      <div className="image-gallery">
        {product.imageUrl?.map((img, index) => (
          <img key={index} src={img} alt={`Product ${index}`} className="product-image" />
        ))}
      </div>

      {/* Product Details */}
      <div className="product-details">
        <h1>{product.product_id.name}</h1>
        <h3>Brand: {product.product_id.brand}</h3>
        <p className="price">Price: ₹{product.product_id.price}</p>
        <p className="description">{product.product_id.description}</p>
        <p className={`availability ${product.product_id.isAvailable ? "in-stock" : "out-of-stock"}`}>
          {product.product_id.isAvailable ? "In Stock" : "Out of Stock"}
        </p>

        <button className="buy-now">Buy Now</button>
        <button className="add-to-cart"  >Add to Cart</button>
      </div>

      {/* Supplier Details */}
      <div className="supplier-details">
        <h2>Supplier Information</h2>
        <p>Seller: {product.product_id.supplier_id?.businessName}</p>
        <p>Contact info: {product.product_id.supplier_id?.businessEmail}</p>
        <p>Address: {product.product_id.supplier_id?.businessAddress}</p>
      </div>
    </div>
  );
};

export default SingleProductPage;
