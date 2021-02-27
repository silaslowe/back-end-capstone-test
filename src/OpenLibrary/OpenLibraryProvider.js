import React, { useState, useContext } from "react"

export const OpenLibraryContext = React.createContext()

export const OpenLibraryProvider = (props) => {
  const [books, setBooks] = useState({ docs: [] })
  const [cover, setCover] = useState([])

  const getBooksByTitle = (title, limit) => {
    return fetch(`http://openlibrary.org/search.json?title=${title}&limit=${limit}`)
      .then((res) => res.json())
      .then(setBooks)
  }

  const getBooksByAuthor = (author) => {
    return fetch(`http://openlibrary.org/search.json?author=${author}`)
      .then((res) => res.json())
      .then(setBooks)
  }

  return (
    <OpenLibraryContext.Provider value={{ books, getBooksByTitle, getBooksByAuthor }}>
      {props.children}
    </OpenLibraryContext.Provider>
  )
}
