import React, { useState, useEffect, useContext } from "react"
import { useHistory, useParams } from "react-router-dom"
import { BooksContext } from "../Books/BooksProvider"
import { NavBar } from "../Nav/Nav"
import { QuestionEditDisplay } from "./QuestionEditDisplay"
import { SkillsEdit } from "./SkillsEdit"
import { TopicsEdit } from "./TopicsEdit"
import { VocabEditDisplay } from "./VocabEditDisplay"

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

  console.log("BOOK EDIT", editedBook)

  return (
    <>
      <NavBar />
      <>
        <form className="book-form">
          <img src={book.cover_url} alt={`${book.title} cover art`} />
          <h2 className="book-form__title">Edit Book</h2>
          <fieldset>
            <div className="form-group">
              <label htmlFor="title">Title: </label>
              <input
                type="text"
                name="title"
                required
                className="form-control"
                value={editedBook.title}
                onChange={changeBookState}
              />
            </div>
          </fieldset>

          <fieldset>
            <div className="form-group">
              <label htmlFor="author">Author: </label>
              <input
                type="text"
                name="author"
                required
                className="form-control"
                value={editedBook.author}
                onChange={changeBookState}
              />
            </div>
          </fieldset>

          <fieldset>
            <div className="form-group">
              <label htmlFor="notes">Notes: </label>
              <input
                type="textarea"
                name="notes"
                required
                className="form-control"
                value={editedBook.notes}
                onChange={changeBookState}
              />
            </div>
          </fieldset>

          <fieldset>
            <div className="form-group">
              <label htmlFor="location">Location: </label>
              <input
                type="text"
                name="location"
                required
                className="form-control"
                value={editedBook.location}
                onChange={changeBookState}
              />
            </div>
          </fieldset>

          <fieldset>
            <div className="form-group">
              <label htmlFor="synopsis">Synopsis: </label>
              <input
                type="text"
                name="synopsis"
                required
                className="form-control"
                value={editedBook.synopsis}
                onChange={changeBookState}
              />
            </div>
          </fieldset>

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
        </form>
      </>
      <TopicsEdit {...props} />
      <SkillsEdit {...props} />
      <VocabEditDisplay {...props} />
      <QuestionEditDisplay {...props} />
      <button
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
      </button>
    </>
  )
}
