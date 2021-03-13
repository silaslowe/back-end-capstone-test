import React from "react"
import { NavBar } from "./components/Nav/Nav"

export const Home = (props) => {
  return (
    <>
      <NavBar {...props} />
      <h1>Home</h1>
    </>
  )
}
