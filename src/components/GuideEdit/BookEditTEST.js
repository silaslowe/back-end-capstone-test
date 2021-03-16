import React, { useState, useEffect, useContext } from "react"
import { useForm } from "react-hook-form"
import { BooksContext } from "../Books/BooksProvider"

export const BookEdit = (props) => {
  console.log(props)
  const { register, handleSubmit } = useForm()
  const { book, getSingleBook, editBook } = useContext(BooksContext)
  const [editedBook, setEditedBook] = useState({})

  useEffect(() => {
    getSingleBook(parseInt(props.match.params.bookId))
    setEditedBook(book)
  }, [])

  const handleControlledInputChange = (event) => {
    const newBook = Object.assign({}, register) // Create copy
    newBook[event.target.name] = event.target.value // Modify copy
    setEditedBook(newBook) // Set copy as new state
  }

  console.log("In EDIT", editedBook)
  console.log(book)
  return (
    <>
      <img src={book.cover_url} alt={`"${book.title}" cover art`} />
      <form
        onSubmit={handleSubmit(
          editBook({
            id: book.id,
            title: editedBook.title,
            author: editedBook.author,
            notes: editedBook.notes,
            rating: editedBook.rating,
            location: editedBook.location,
            synopsis: editedBook.synopsis,
          })
        )}
        onChange={handleControlledInputChange}
      >
        <label>Title: </label>
        <input
          type="text"
          name="title"
          required
          autoFocus
          className="form-control"
          value={editedBook.title}
          onChange={handleControlledInputChange}
        />
        <label>Author: </label>
        <input defaultValue={book.author} ref={register} />
        <label>Notes: </label>
        <input defaultValue={book.notes} ref={register} />
        <label>Loaction: </label>
        <input defaultValue={book.location} ref={register} />
        <label>Synopsis: </label>
        <input defaultValue={book.synopsis} ref={register} />
        <label>Rating: </label>
        <input defaultValue={book.rating} ref={register} />
        <label>Notes: </label>
        <input defaultValue={book.notes} ref={register} />
        <input type="submit" />
      </form>

      {/* <form onSubmit={handleSubmit(onSubmitAuthor)} onChange={handleControlledInputChange}>
        <label>Search By Author: </label>
        <input name="searchByAuthor" ref={register} />
        <input type="submit" />
      </form> */}
    </>
  )
}
