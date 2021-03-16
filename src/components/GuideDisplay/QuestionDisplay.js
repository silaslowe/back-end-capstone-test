import React, { useState, useContext, useEffect } from "react"
import { QuestionContext } from "../Books/BooksProvider"

export const BookDisplay = (props) => {
  const { questions, getQuestion } = useContext(QuestionsContext)
  const bookId = parseInt(props.match.params.bookId)
  useEffect(() => {
    getSingleBook(bookId)
  }, [])
  console.log(book)
  return (
    <>
      <h2>Book Details:</h2>
      <img src={book.cover_url} />
      <h3>Title: {book.title}</h3>
      <h3>Author: {book.author}</h3>
      <h3>Synopsis: {book.synopsis}</h3>
      <h3>Notes: {book.notes}</h3>
      <h3>Published: {book.publish_year}</h3>
      <h3>Location of Book: {book.Location}</h3>
      <h3>Rating: {book.rating}</h3>
    </>
  )
}
