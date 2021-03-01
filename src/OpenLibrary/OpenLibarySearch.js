import React, { useState, useEffect, useContext } from "react"
import { useForm } from "react-hook-form"
import { OpenLibraryContext } from "./OpenLibraryProvider"
import { OpenLibraryBook } from "./OpenLibraryBook"

export const OpenLibrarySearch = (props) => {
  const { register, handleSubmit } = useForm()
  const { getBooksByTitle, getBooksByAuthor, books } = useContext(OpenLibraryContext)
  const [search, setSearch] = useState({})
  //   const [numOfBooks, setNumOfBooks] = useState("")

  const onSubmitTitle = (search) => {
    const replaced = search.searchByTitle.replace(/" "/g, "%20")
    const numOfBooks = parseInt(search.numberOfBooksByTitle) + 15
    getBooksByTitle(replaced, numOfBooks)
  }

  const onSubmitAuthor = (search) => {
    const replaced = search.searchByAuthor.replace(/" "/g, "%20")
    const numOfBooks = parseInt(search.numberOfBooksByTitle)
    getBooksByAuthor(replaced, numOfBooks)
  }

  const handleControlledInputChange = (event) => {
    const newSearch = Object.assign({}, register) // Create copy
    newSearch[event.target.name] = event.target.value // Modify copy
    setSearch(newSearch) // Set copy as new state
    // setNumOfBooks(newSearch.numberOfBooksByTitle))
    // console.log(numOfBooks)
  }
  console.log("books", books)
  //   console.log("SEARCH", search)
  return (
    <>
      <h1>Open Library Search</h1>
      <form onSubmit={handleSubmit(onSubmitTitle)} onChange={handleControlledInputChange}>
        <label>Number of Responses:</label>
        <input
          type="number"
          name="numberOfBooksByTitle"
          min="5"
          max="50"
          step="5"
          defaultValue="5"
          ref={register}
        />
        <label>Search By Title: </label>
        <input name="searchByTitle" ref={register} />
        <input type="submit" />
      </form>

      <form onSubmit={handleSubmit(onSubmitAuthor)} onChange={handleControlledInputChange}>
        <label>Search By Author: </label>
        <input name="searchByAuthor" ref={register} />
        <input type="submit" />
      </form>

      <div className="ol-books__container">
        {books.docs
          .filter((book) => book.cover_edition_key)
          //   .slice(0, numOfBooks)
          .map((book) => (
            <OpenLibraryBook key={book.edition_key[0]} props={props} book={book} />
          ))}
      </div>
    </>
  )
}

// Add an option for how many books to display as a select or number
// Pagination
// Make array of all covers
