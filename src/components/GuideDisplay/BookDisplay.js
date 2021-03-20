import React, { useState, useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { BooksContext } from "../Books/BooksProvider"

export const BookDisplay = (props) => {
  const { setBooks, books, getSingleBook, book } = useContext(BooksContext)
  // Gets id of selected book from props
  const bookId = parseInt(useParams().bookId)

  const history = useHistory()
  // Gets currently selected book
  useEffect(() => {
    getSingleBook(bookId)
  }, [])

  return (
    <>
      <button
        onClick={() => {
          // Clears book state
          setBooks([])
          // Navigate to edit form for selected book
          history.push({ pathname: `/guide-edit/${book.id}`, state: { book } })
        }}
      >
        Edit Guide
      </button>
      <h2>Book Details:</h2>
      <img src={book.cover_url} />
      <h3>Title: {book.title}</h3>
      <h3>Author: {book.author}</h3>
      <h3>Synopsis: {book.synopsis}</h3>
      <h3>Notes: {book.notes}</h3>
      <h3>Published: {book.publish_year}</h3>
      <h3>Location of Book: {book.Location}</h3>
      <h3>Rating: {book.rating}</h3>
      <h2>Topics:</h2>
      {book.topics.map((topic) => (
        <p key={topic.id}>{topic.topic}</p>
      ))}
      <h2>Skills:</h2>
      {book.skills.map((skill) => (
        <p key={skill.id}>{skill.skill}</p>
      ))}
      <h2>Questions:</h2>
      {book.questions.map((question) => (
        <p key={question.id}>{question.question}</p>
      ))}
      <h2>Vocabulary Words:</h2>
      {book.vocab.map((vocab) => (
        <div key={vocab.id}>
          <p>Word: {vocab.word}</p>
          <p>Definiton: {vocab.definition}</p>
        </div>
      ))}
    </>
  )
}
