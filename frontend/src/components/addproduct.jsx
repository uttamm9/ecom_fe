import React from 'react';
import { useState } from 'react';
import axios from 'axios'
const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
    description: '',
    brand: '',
    images: ['', '', '', '', '']
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleImageChange = (e, index) => {
    const files = e.target.files;
    const newImages = [...product.images];
    newImages[index] = files[0];
    setProduct({
      ...product,
      images: newImages
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(product);
    try {
      const response = await axios.post('http://localhost:3000/supplier/addproduct',product)
    } catch (error) {
      console.log(error)
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
      {[...Array(5)].map((_, index) => (
        <div key={index}>
          <label>Image {index + 1}:</label>
          <input type="file" onChange={(e) => handleImageChange(e, index)} required />
        </div>
      ))}
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;