import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomNavbar from "./navbar";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";

const Checkout = () => {
  const [allAddress, setAllAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMode, setPaymentMode] = useState(""); // For payment selection
  const token = localStorage.getItem("token");

  // Fetch addresses from API
  const getAddress = async () => {
    try {
      const response = await axios.get("http://localhost:3000/user/getaddress", {
        headers: { authorization: `Bearer ${token}` },
      });
      setAllAddress(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  useEffect(() => {
    getAddress();
  }, []);

  const handleSelectAddress = (addr) => {
    setSelectedAddress(addr._id);
   
  };

  const handleSelectPayment = (e) => {
    setPaymentMode(e.target.value);
  };

  const handleProceed = async() => {
    if (!selectedAddress || !paymentMode) {
      alert("Please select an address and a payment mode.");
      return;
    }
    try {
      await axios.post('http://localhost:3000/user/placeorder',{selectedAddress,paymentMode})
      alert(`Order placed`);
    } catch (error) {
      console.error("Error>>", error);
    }
   
  };

  return (
    <>
      <CustomNavbar islogin={token} />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <h2 className="text-center mb-4">Checkout</h2>

            {/* Address Selection */}
            <Card className="shadow-sm border-0 rounded-4">
              <Card.Body>
                <h4 className="mb-3">Select Delivery Address</h4>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>S.N</th>
                      <th>Receiver Name</th>
                      <th>Phone</th>
                      <th>Pin Code</th>
                      <th>City</th>
                      <th>Apartment Name</th>
                      <th>Landmark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allAddress.length > 0 ? (
                      allAddress.map((addr, index) => (
                        <tr key={addr._id}>
                          <td>
                            <Form.Check
                              type="radio"
                              name="selectedAddress"
                              checked={selectedAddress?._id === addr._id}
                              onChange={() => handleSelectAddress(addr)}
                            />
                          </td>
                          <td>{index + 1}</td>
                          <td>{addr.receiverName}</td>
                          <td>{addr.receiverPhone}</td>
                          <td>{addr.pinCode}</td>
                          <td>{addr.city}</td>
                          <td>{addr.apartmentName}</td>
                          <td>{addr.landmark}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center text-muted">
                          No saved addresses. Please add an address.
                        </td>
                      </tr>
                      
                    )}
                  </tbody>
                  <button className="btn btn-primary" style={{width:'100%'}} onClick={() => window.location.href = "/address"}>Add Address</button>
                </table>
              </Card.Body>
            </Card>

            {/* Payment Selection */}
            <Card className="shadow-sm border-0 rounded-4 mt-4">
              <Card.Body>
                <h4 className="mb-3">Select Payment Mode</h4>
                <Form>
                  <Form.Check
                    type="radio"
                    label="Cash on Delivery (COD)"
                    name="paymentMode"
                    value="COD"
                    checked={paymentMode === "COD"}
                    onChange={handleSelectPayment}
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    label="Online Payment"
                    name="paymentMode"
                    value="Online"
                    checked={paymentMode === "Online"}
                    onChange={handleSelectPayment}
                  />
                </Form>
              </Card.Body>
            </Card>

            {/* Proceed Button */}
            <div className="text-center mt-4">
              <Button variant="success" size="lg" onClick={handleProceed}>
                Place order
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Checkout;
