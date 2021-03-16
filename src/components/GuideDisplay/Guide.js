import React, { useState, useContext, useEffect } from "react"
import { NavBar } from "../Nav/Nav"
import { BooksContext } from "../Books/BooksProvider"
import { BookDisplay } from "./BookDisplay"

export const Guide = (props) => {
  const { book, getSingleBook } = useContext(BooksContext)
  const bookId = parseInt(props.match.params.bookId)
  useEffect(() => {
    getSingleBook(bookId)
  }, [])

  console.log(book)
  return (
    <>
      <NavBar />
      <BookDisplay {...props} book={book} />
    </>
  )
}
