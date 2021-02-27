import React from "react"
import { Link } from "react-router-dom"

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
    </ul>
  )
}
