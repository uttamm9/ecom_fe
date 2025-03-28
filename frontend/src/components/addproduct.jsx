import React from 'react';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {
  const navigate =useNavigate()
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
    description: '',
    brand: '',
  });

  const [images, setImages] = useState([]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(product).forEach(key => {
      formData.append(key, product[key]);
    });
    images.forEach((image) => {
      formData.append('images', image);
    }
    );

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/supplier/addproduct', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'authorization': `Bearer ${token}`
        }
      });
      console.log(response.data);
      alert(response.data.message);
      navigate('/supplierdashboard')
    } catch (error) {
      console.log(error);
      alert('Internal server error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input type="text" name="name" value={product.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Price:</label>
        <input type="text" name="price" value={product.price} onChange={handleChange} required />
      </div>
      <div>
        <label>Quantity:</label>
        <input type="text" name="quantity" value={product.quantity} onChange={handleChange} required />
      </div>
      <div>
        <label>Category:</label>
        <select name="category" value={product.category} onChange={handleChange} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '5px' }}>
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home & Kitchen">Home & Kitchen</option>
          <option value="Books & Stationery">Books & Stationery</option>
          <option value="Beauty & Personal Care">Beauty & Personal Care</option>
          <option value="Toys & Games">Toys & Games</option>
          <option value="Sports & Outdoors">Sports & Outdoors</option>
          <option value="Grocery & Gourmet Foods">Grocery & Gourmet Foods</option>
          <option value="Health & Wellness">Health & Wellness</option>
        </select>
      </div>
      <div>
        <label>Description:</label>
        <textarea name="description" value={product.description} onChange={handleChange} required></textarea>
      </div>
      <div>
        <label>Brand:</label>
        <input type="text" name="brand" value={product.brand} onChange={handleChange} required />
      </div>
      
        <div>
          <label>Image :</label>
          <input type="file" onChange={(e) => handleImageChange(e)} required multiple/>
        </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;