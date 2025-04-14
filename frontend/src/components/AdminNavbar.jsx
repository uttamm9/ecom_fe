import React, { useState } from 'react';
import { Navbar, Nav, Button, Container, Offcanvas } from 'react-bootstrap';

const AdminNavbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSidebarToggle = () => setShowSidebar(!showSidebar);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container fluid>
          <Button variant="outline-light" onClick={handleSidebarToggle} className="me-2">
            ☰
          </Button>
          <Navbar.Brand href="#home">Ecommerce Admin</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#profile">Profile</Nav.Link>
              <Nav.Link href="#logout">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={showSidebar} onHide={handleSidebarToggle} placement="start" style={{ width: '250px'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Admin Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="#crm">CRM</Nav.Link>
            <Nav.Link href="#analytics">Analytics</Nav.Link>
            <Nav.Link href="#ecommerce">Ecommerce</Nav.Link>
            <Nav.Link href="#team">Team</Nav.Link>
            <Nav.Link href="#vendor">Vendor</Nav.Link>
            <Nav.Link href="#chatbot">AI Chatbot</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AdminNavbar;
