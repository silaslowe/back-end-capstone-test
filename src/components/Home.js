import React from "react"
// import { NavBar } from "./Nav/Nav"
import { Navigation } from "./Nav/Nav"
import Button from "react-bootstrap/Button"

export const Home = (props) => {
  return (
    <>
      <Navigation {...props} />
      <h1>Home</h1>
      <Button variant="primary">Primary</Button>{" "}
    </>
  )
}
