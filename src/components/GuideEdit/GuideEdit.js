import React, { useState, useEffect, useContext } from "react"
import { BooksContext } from "../Books/BooksProvider"
import { useHistory, useParams } from "react-router-dom"
import { NavBar } from "../Nav/Nav"
// import { BookEdit } from "./BookEdit"
import { QuestionEditDisplay } from "./QuestionEditDisplay"
import { SkillsEdit } from "./SkillsEdit"
import { TopicsEdit } from "./TopicsEdit"
import { VocabEditDisplay } from "./VocabEditDisplay"

export const GuideEdit = (props) => {
  const history = useHistory()
  const bookId = useParams().bookId
  const { book, getSingleBook, editBook } = useContext(BooksContext)
  const [editedBook, setEditedBook] = useState({
    id: book.id,
    title: "",
    author: "",
    notes: "",
    rating: 0,
    location: "",
    synopsis: "",
  })

  useEffect(() => {
    getSingleBook(parseInt(props.match.params.bookId))
    setEditedBook({
      title: book.title,
      author: book.author,
      notes: book.notes,
      rating: book.rating,
      location: book.location,
      synopsis: book.synopsis,
    })
  }, [])

  const changeBookState = (domEvent) => {
    const newBookState = Object.assign({}, editedBook)
    newBookState[domEvent.target.name] = domEvent.target.value
    setEditedBook(newBookState)
  }
  return (
    <>
      <NavBar />
      {/* <BookEdit {...props} /> */}

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
