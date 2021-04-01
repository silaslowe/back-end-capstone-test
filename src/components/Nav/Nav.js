import React from "react"
import Navbar from "react-bootstrap/NavBar"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"

export const Navigation = (props) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Read Aloud</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Menu" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/search">Find Guides</NavDropdown.Item>
            <NavDropdown.Item href="/searchol">New Book Guide</NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => {
                localStorage.removeItem("active_user")
              }}
              href="/"
            >
              Log Out{" "}
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
