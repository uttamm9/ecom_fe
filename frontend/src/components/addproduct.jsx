import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import SupplierNavbar from './SupplierNavbar';

const AddProduct = () => {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(product).forEach(key => {
      formData.append(key, product[key]);
    });
    images.forEach((image) => {
      formData.append('images', image);
    });

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
      navigate('/supplierdashboard');
    } catch (error) {
      console.log(error);
      alert('Internal server error');
    }
  };

  return (
    <Container>
      <SupplierNavbar/>
      <Row className="justify-content-center">
        <Col md={10}>
          <h2 className="mt-5 mb-4">Add New Product</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price:</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Quantity:</Form.Label>
              <Form.Control
                type="text"
                name="quantity"
                value={product.quantity}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category:</Form.Label>
              <Form.Select
                name="category"
                value={product.category}
                onChange={handleChange}
                required
              >
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
                <option value="watch">Watch</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Brand:</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image(s):</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImageChange}
                required
                multiple
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Add Product
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProduct;