import React, { useEffect, useState } from "react";
import CustomNavbar from "./navbar";
import { Modal, Button, Form, Card, Container, Row, Col } from "react-bootstrap";
import axios from 'axios';

const Address = ({ islogin }) => {
  const [model, setModel] = useState(false);
  const [address, setAddress] = useState({
    receiverName: "",
    receiverPhone: "",
    pinCode: "",
    city: "",
    apartmentName: "",
    landmark: "",
  });

  const [allAddress, setAllAddress] = useState([]);

  // Handle input change
  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // Close Modal
  const handleClose = () => setModel(false);

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post("http://localhost:3000/user/address", address, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`
        }
      });

      alert(response.data.message);
      getAddress();  // Refresh the address list
    } catch (error) {
      console.error("Error:", error);
    }
    handleClose();
  };

  // Fetch All Addresses
  const getAddress = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:3000/user/getaddress", {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      setAllAddress(response.data);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // Delete Address
  const handleDelete = async (id) => {
    console.log(id);
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/user/deleteaddress/${id}`, {
        headers: { authorization: `Bearer ${token}` }
      });
      alert("Address deleted successfully!");
      getAddress();  // Refresh the list
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <>
      <CustomNavbar islogin={true} />

      <Container className="mt-5">
        <h3 className="text-center mb-4">Saved Addresses</h3>

      <Row>
        <Col>
          <Card>
            <Card.Body>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Receiver Name</th>
              <th>Phone</th>
              <th>Pin Code</th>
              <th>City</th>
              <th>Apartment Name</th>
              <th>Landmark</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allAddress.map((addr) => (
              <tr key={addr._id}>
          <td>{addr.receiverName}</td>
          <td>{addr.receiverPhone}</td>
          <td>{addr.pinCode}</td>
          <td>{addr.city}</td>
          <td>{addr.apartmentName}</td>
          <td>{addr.landmark}</td>
          <td>
            <Button
              variant="danger"
              onClick={() => handleDelete(addr._id)}>
              Delete
            </Button>
          </td>
              </tr>
            ))}
          </tbody>
        </table>
            </Card.Body>
          </Card>
        </Col>
      </Row>



        {/* Add Address Button */}
        <div className="text-center">
          <Button variant="primary" onClick={() => setModel(true)}>
            Add Address +
          </Button>
        </div>
      </Container>

      {/* MODAL */}
      <Modal show={model} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Receiver Name</Form.Label>
              <Form.Control
                type="text"
                name="receiverName"
                placeholder="Enter receiver's name"
                value={address.receiverName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Receiver Phone</Form.Label>
              <Form.Control
                type="tel"
                name="receiverPhone"
                placeholder="Enter phone number"
                value={address.receiverPhone}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Pin Code</Form.Label>
              <Form.Control
                type="text"
                name="pinCode"
                placeholder="Enter pin code"
                value={address.pinCode}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="Enter city"
                value={address.city}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Apartment Name</Form.Label>
              <Form.Control
                type="text"
                name="apartmentName"
                placeholder="Enter apartment name"
                value={address.apartmentName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Landmark</Form.Label>
              <Form.Control
                type="text"
                name="landmark"
                placeholder="Enter nearby landmark"
                value={address.landmark}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="danger" className="me-2" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Update
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Address;
