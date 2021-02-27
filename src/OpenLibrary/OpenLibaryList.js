import React, { useState, useEffect, useContext } from "react"
import { useForm } from "react-hook-form"
import { OpenLibraryContext } from "./OpenLibraryProvider"

export const OpenLibraryList = () => {
  const { register, handleSubmit } = useForm()
  const { getBooksByTitle, books } = useContext(OpenLibraryContext)
  const [search, setSearch] = useState({})

  const onSubmit = (search) => {
    const replaced = search.searchByTitle.replace(/" "/g, "%20")
    console.log("Replaced", replaced)
    getBooksByTitle(replaced)
  }

  const handleControlledInputChange = (event) => {
    const newSearch = Object.assign({}, register) // Create copy
    newSearch[event.target.name] = event.target.value // Modify copy
    setSearch(newSearch) // Set copy as new state
  }
  console.log("books", books)
  return (
    <>
      <h1>Open Library Search</h1>
      <form onSubmit={handleSubmit(onSubmit)} onChange={handleControlledInputChange}>
        <label>Search: </label>
        <input name="searchByTitle" ref={register} />
        <input type="submit" />
      </form>

      <div>
        {books.docs
          .filter((book) => book.cover_edition_key)
          .slice(0, 7)
          .map((book) => (
            <div key={book.edition_key[0]}>
              <p>Title: {book.title}</p>
              <img src={`http://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg`} />
            </div>
          ))}
      </div>
    </>
  )
}

// Add an option for how many books to display as a select or number
