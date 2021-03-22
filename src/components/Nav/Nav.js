import React from "react"
import { Link, useHistory } from "react-router-dom"
import Navbar from "react-bootstrap/NavBar"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"

export const Navigation = (props) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="">ReadAloud</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Menu" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Item href="/searchol">New Guide</NavDropdown.Item>
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

// ;<ul className="navbar">
//   <li className="navbar__item">
//     <Link className="navbar__link" to="/">
//       Home
//     </Link>
//   </li>
//   <li className="navbar__item">
//     <Link className="navbar__link" to="/searchol">
//       New Book
//     </Link>
//   </li>
//   <li className="navbar__item">
//     <Link className="navbar__link" to="/profile">
//       Profile
//     </Link>
//   </li>
//   <li className="nav-item">
//     <button
//       className="nav-link fakeLink"
//       onClick={() => {
//         localStorage.removeItem("active_user")
//         props.history.push({ pathname: "/" })
//       }}
//     >
//       Logout
//     </button>
//   </li>
// </ul>
