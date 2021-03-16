import React from "react"
import { NavBar } from "../Nav/Nav"
import { BookEdit } from "./BookEdit"

export const GuideEdit = (props) => {
  return (
    <>
      <NavBar />
      <BookEdit {...props} />
    </>
  )
}
