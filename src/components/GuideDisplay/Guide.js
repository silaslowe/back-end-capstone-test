import React, { useState, useContext, useEffect } from "react"
import { Navigation } from "../Nav/Nav"
import { BooksContext } from "../Books/BooksProvider"
import { BookDisplay } from "./BookDisplay"
import { Footer } from "../Nav/Footer"

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
      <Navigation />
      <BookDisplay {...props} book={book} />
    </>
  )
}
