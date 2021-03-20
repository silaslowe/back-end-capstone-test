import React, { useState, useContext, useEffect } from "react"
import { NavBar } from "../Nav/Nav"
import { BooksContext } from "../Books/BooksProvider"
import { BookDisplay } from "./BookDisplay"

export const Guide = (props) => {
  const { book, getSingleBook } = useContext(BooksContext)
  // Gets id of selected book from props
  const bookId = parseInt(props.match.params.bookId)

  // Gets book from params bookId
  useEffect(() => {
    getSingleBook(bookId)
  }, [])

  return (
    <>
      <NavBar />
      <BookDisplay {...props} book={book} />
    </>
  )
}
