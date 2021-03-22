import React, { useState, useEffect, useContext } from "react"
import { useHistory, useParams } from "react-router-dom"
import { BooksContext } from "../Books/BooksProvider"
import { Navigation } from "../Nav/Nav"
import { QuestionEditDisplay } from "./QuestionEditDisplay"
import { SkillsEdit } from "./SkillsEdit"
import { TopicsEdit } from "./TopicsEdit"
import { VocabEditDisplay } from "./VocabEditDisplay"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"

export const GuideEdit = (props) => {
  const history = useHistory()
  // Gets id of selected book from props
  const bookId = parseInt(useParams().bookId)
  const { book, getSingleBook, editBook } = useContext(BooksContext)

  // Variable to store edited book properties

  const [editedBook, setEditedBook] = useState({})

  // Sets copy of book for use in the form on page render

  useEffect(() => {
    getSingleBook(parseInt(props.match.params.bookId)).then(() =>
      setEditedBook({
        title: book.title,
        author: book.author,
        notes: book.notes,
        rating: book.rating,
        location: book.location,
        synopsis: book.synopsis,
      })
    )
  }, [])

  // useEffect(() => {
  //   getSingleBook(parseInt(props.match.params.bookId)).then(() =>
  //     setEditedBook({
  //       title: book.title,
  //       author: book.author,
  //       notes: book.notes,
  //       rating: book.rating,
  //       location: book.location,
  //       synopsis: book.synopsis,
  //     })
  //   )
  // }, [skills])

  // changes the state for the edited book when the form changes by using the new book variable. newBookState uses the targeted form element and captures its value and then sets the property in edited book to that value.

  const changeBookState = (domEvent) => {
    const newBookState = Object.assign({}, editedBook)
    newBookState[domEvent.target.name] = domEvent.target.value
    setEditedBook(newBookState)
  }

  return (
    <>
      <Navigation />
      <Container>
        <Container style={{ diplay: "flex", flexDirection: "row" }}>
          <Image
            src={book.cover_url}
            alt={`${book.title} cover art`}
            style={{ width: "95%" }}
            thumbnail
          />
          <Form className="book-form">
            <Form.Label className="book-form__title">Edit Book</Form.Label>
            <label htmlFor="title">Title: </label>
            <Form.Control
              type="text"
              name="title"
              required
              className="form-control"
              value={editedBook.title}
              onChange={changeBookState}
            />

            <Form.Label htmlFor="author">Author: </Form.Label>
            <Form.Control
              type="text"
              name="author"
              required
              className="form-control"
              value={editedBook.author}
              onChange={changeBookState}
            />

            <Form.Label htmlFor="notes">Notes: </Form.Label>
            <Form.Control
              type="textarea"
              name="notes"
              required
              className="form-control"
              value={editedBook.notes}
              onChange={changeBookState}
            />

            <Form.Label htmlFor="location">Location: </Form.Label>
            <Form.Control
              type="text"
              name="location"
              required
              className="form-control"
              value={editedBook.location}
              onChange={changeBookState}
            />

            <Form.Label htmlFor="synopsis">Synopsis: </Form.Label>
            <Form.Control
              type="text"
              name="synopsis"
              required
              className="form-control"
              value={editedBook.synopsis}
              onChange={changeBookState}
            />

            <fieldset>
              <div className="form-group">
                <label htmlFor="rating">Rating: </label>
                <select
                  type="text"
                  name="rating"
                  required
                  className="form-control"
                  value={editedBook.rating}
                  onChange={changeBookState}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </fieldset>
          </Form>
        </Container>

        <TopicsEdit {...props} />
        <SkillsEdit {...props} />
        <VocabEditDisplay {...props} />
        <QuestionEditDisplay {...props} />
        <Button
          className="form-btn-below"
          onClick={(evt) => {
            evt.preventDefault()

            editBook({
              id: book.id,
              title: editedBook.title,
              author: editedBook.author,
              notes: editedBook.notes,
              rating: editedBook.rating,
              location: editedBook.location,
              synopsis: editedBook.synopsis,
            }).then(() => history.push(`/guide/${bookId}`))
          }}
        >
          Save
        </Button>
      </Container>
    </>
  )
}
