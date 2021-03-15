import React, { useState, useContext, useEffect } from "react"
import { NavBar } from "../Nav/Nav"
import { BooksContext } from "../Books/BooksProvider"
import { BookDisplay } from "./BookDsiplay"

export const Guide = (props) => {
  console.log(props)
  return (
    <>
      <NavBar />
      <BookDisplay {...props} />
    </>
  )
}
