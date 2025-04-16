import React, { useState } from "react";
import { Navbar, Container, Nav, Button, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BsList } from "react-icons/bs"; // Bootstrap icons
import "./navbar.css"; // Keep your CSS for additional styling
import brandlogo from "../assets/ecomlogo.png"; // Import your brand logo (adjust path if needed)

const SupplierNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {/* Bootstrap Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3" style={{ zIndex: "1", position: "fixed", width: "100%" }}>
        <Container fluid>
          {/* Sidebar Toggle Button */}
          <Button variant="outline-light" onClick={() => setShowSidebar(true)} className="me-2">
            <BsList size={24} />
          </Button>

          {/* Brand Logo */}
          <Navbar.Brand href="#">
            <img src={brandlogo} alt="Brand Logo" style={{ height: "40px", cursor: 'pointer' }} onClick={() => navigate('/supplierdashboard')} />
            <span className="ms-2">hii.. {localStorage.getItem('name')}</span>
          </Navbar.Brand>

          {/* Empty space to push logout to the right on larger screens */}
          <Nav className="ms-auto">
            <Button variant="danger" onClick={handleLogout}>
              🚪 Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Sidebar Offcanvas */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} backdrop="static" style={{ width: '250px' }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>📋 Supplier Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="#" className="py-2" onClick={() => navigate('/supplierdashboard')}>
              📊 Dashboard
            </Nav.Link>
            <Nav.Link href="#" className="py-2" onClick={() => navigate('/addproduct')}>
              ➕ Add Product
            </Nav.Link>
            <Nav.Link href="#" className="py-2" onClick={() => navigate('/supplierproducts')}>
              📦 My Products
            </Nav.Link>
            <Nav.Link href="#" className="py-2" onClick={() => navigate('/supplierorder')}>
              🛒 Orders
            </Nav.Link>
            <Nav.Link href="#" className="py-2" onClick={() => navigate('/inventory')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-seam me-2" viewBox="0 0 16 16">
                <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5 8 5.686l6.154-2.186L8.186 1.113zM15 4.686v3.814a1.5 1.5 0 0 1-1.5 1.5H1.5A1.5 1.5 0 0 1 0 8.5v-3.814l6.276 2.234L15 4.686zM8 9.586l-6.276-2.234A.5.5 0 0 0 1 7.5v3.814a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5V7.5a.5.5 0 0 0-.276-.414L8 9.586z"/>
              </svg>
              Inventory
            </Nav.Link>
            <Nav.Link href="#" className="py-2" onClick={() => navigate('/supplierprofile')}>
              👤 Profile
            </Nav.Link>
            <Nav.Link href="#" className="py-2" onClick={() => navigate('/settings')}>
              ⚙️ Settings
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SupplierNavbar;