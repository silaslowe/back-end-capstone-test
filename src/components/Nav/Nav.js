import React from "react"
import { Link, useHistory } from "react-router-dom"

export const NavBar = (props) => {
  return (
    <ul className="navbar">
      <li className="navbar__item">
        <Link className="navbar__link" to="/">
          Home
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/searchol">
          New Book
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/profile">
          Profile
        </Link>
      </li>
      <li className="nav-item">
        <button
          className="nav-link fakeLink"
          onClick={() => {
            localStorage.removeItem("active_user")
            props.history.push({ pathname: "/" })
          }}
        >
          Logout
        </button>
      </li>
    </ul>
  )
}
