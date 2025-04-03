import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Offcanvas, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsList, BsCart } from "react-icons/bs"; // Bootstrap icons
import "./navbar.css"; // Keep your CSS for additional styling

const CustomNavbar = ({ islogin }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const token = localStorage.getItem('token')

  return (
    <>
      {/* Bootstrap Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3" style={{zIndex:'1'}}>
        <Container fluid>
          {/* Sidebar Toggle Button */}
          <Button variant="outline-light" onClick={() => setShowSidebar(true)} className="me-2">
            <BsList size={24} />
          </Button>

          {/* Brand Logo */}
          <Navbar.Brand href="#">
            <img src="/path/to/brandlogo.png" alt="Brand Logo" style={{ height: "40px" }} />
          </Navbar.Brand>

          {/* Search Bar */}
          <Form className="d-flex mx-auto">
            <Form.Control type="search" placeholder="Search..." className="me-2" />
          </Form>

          {/* Cart & Login/Logout Buttons */}
          <Nav>
            {token?(<Button variant="outline-light" className="me-2" onClick={() => navigate("/cart")}>
              <BsCart size={20} />  Cart
            </Button>):(
              <Button variant="outline-light" className="me-2" onClick={() => navigate("/")}>
              <BsCart size={20} />  Cart
            </Button>
            )}
            
            {islogin ? (
              <Button variant="danger" onClick={handleLogout}>🚪 Logout</Button>
            ) : (
              <Button variant="success" onClick={()=>navigate('/')}>🔑 Login</Button>
            )}
          </Nav>
        </Container>
      </Navbar>

      {/* Sidebar Offcanvas */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>📋 Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="#" className="py-2" onClick={()=>navigate('/userview')}>🏠 Home</Nav.Link>
            <Nav.Link href="#" className="py-2">📦 Products</Nav.Link>
            <Nav.Link href="#" className="py-2" onClick={(()=>navigate('/userorders'))}>🛒 Orders</Nav.Link>
            {token ? (<Nav.Link href="#" className="py-2" onClick={()=>navigate('/cart')}>🛒 Cart</Nav.Link>):(<Nav.Link href="#" className="py-2" onClick={()=>navigate('/')}>🛒 Cart</Nav.Link>)}
            
            <Nav.Link href="#" className="py-2" onClick={()=>navigate('/wishlist')}>💖 WishList</Nav.Link>
            <Nav.Link href="#" className="py-2" onClick={()=>navigate('/updatepassword')}>🔑 Update Password</Nav.Link>
            <Nav.Link href="#" className="py-2" onClick={()=>navigate('/address')}> 🛣️Addresses</Nav.Link>
            <Nav.Link href="#" className="py-2">⚙️ Settings</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CustomNavbar;
