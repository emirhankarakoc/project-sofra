import React from "react";
import { Navbar, Nav, NavDropdown, Container, Col, Row } from "react-bootstrap";

function NavigationBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Row className="align-items-center justify-content-between">
          <Col className="text-left">
            <Navbar.Brand href="/">
              <img
                src="https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp"
                alt="logo"
                loading="lazy"
              />
              Sofra App
            </Navbar.Brand>
          </Col>
          <Col className="text-right">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link href="/">Home</Nav.Link>

                {localStorage.getItem("userToken") && (
                  <Nav.Link href="/profile">Profile</Nav.Link>
                )}
                {localStorage.getItem("userRole") === "ROLE_SELLER" && (
                  <div>
                    <Nav.Link href="/seller">Sell</Nav.Link>
                  </div>
                )}
                {!localStorage.getItem("userToken") && (
                  <>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
