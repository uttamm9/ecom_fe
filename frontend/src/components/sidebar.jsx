import React, { useState } from "react";
import { Offcanvas, Button, ListGroup } from "react-bootstrap";
import { BsList } from "react-icons/bs"; // Menu icon

const Sidebar = () => {
  const [show, setShow] = useState(false);
  
  return (
    <>
      {/* Toggle Sidebar Button */}
      <Button variant="primary" className="m-3" onClick={() => setShow(true)}>
        <BsList size={24} /> Menu
      </Button>

      {/* Sidebar Offcanvas */}
      <Offcanvas show={show} onHide={() => setShow(false)} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Dashboard</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup variant="flush">
            <ListGroup.Item action href="#">🏠 Home</ListGroup.Item>
            <ListGroup.Item action href="#">📦 Products</ListGroup.Item>
            <ListGroup.Item action href="#">🛒 Orders</ListGroup.Item>
            <ListGroup.Item action href="#">⚙️ Settings</ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
