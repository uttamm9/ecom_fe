import React, { useState, useContext } from "react";
import { Navbar, Container, Nav, Button, Offcanvas, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsList, BsCart } from "react-icons/bs"; // Bootstrap icons
import "./navbar.css"; // Keep your CSS for additional styling
import brandlogo from "../assets/ecomlogo.png"; // Import your brand logo
import { CartContext } from "../context/cartcontext"; // Import your CartContext
const CustomNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const { cartCount } = useContext(CartContext); // Use CartContext to get cart count

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const token = localStorage.getItem('token')

  return (
    <>
      {/* Bootstrap Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" style={{zIndex:'1',top:'0',position:'sticky'}}>
        <Container fluid>
          {/* Sidebar Toggle Button */}
          <Button variant="outline-light" onClick={() => setShowSidebar(true)} className="me-2">
            <BsList size={24} />
          </Button>

          {/* Brand Logo */}
          <Navbar.Brand href="#">
            <img src={brandlogo} alt="Brand Logo" style={{ height: "40px" }} onClick={()=>navigate('/')} />
            <h4>hii.. {localStorage.getItem('name')}</h4>
          </Navbar.Brand>

          {/* Search Bar */}
          <Form className="d-flex mx-auto">
            <Form.Control type="search" placeholder="Search..." className="me-2" />
          </Form>

                <Nav id="navbutton">
                {token ? (
                  <Button variant="outline-light" className="me-2" onClick={() => navigate("/cart")}>
                  <BsCart size={20} /> Cart <span className="badge bg-danger">{cartCount || 0}</span>
                  </Button>
                ) : (
                  <Button variant="outline-light" className="me-2" onClick={() => navigate("/")}>
                  <BsCart size={20} /> Cart
                  </Button>
                )}
                
                {token ? (
                  <Button variant="danger" onClick={handleLogout}>🚪 Logout</Button>
                ) : (
                  <Button variant="success" onClick={() => navigate('/login')}>🔑 Login</Button>
                )}
                </Nav>
              </Container>
              </Navbar>

              {/* Sidebar Offcanvas */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} backdrop="static" style={{width:'250px'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>📋 Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="#" className="py-2" onClick={()=>navigate('/')}>🏠 Home</Nav.Link>
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
