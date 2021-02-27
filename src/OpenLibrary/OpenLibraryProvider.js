import React, { useState, useContext } from "react"

export const OpenLibraryContext = React.createContext()

export const OpenLibraryProvider = (props) => {
  const [books, setBooks] = useState({ docs: [] })
  const [cover, setCover] = useState([])

  const getBooksByTitle = (title) => {
    return fetch(`http://openlibrary.org/search.json?title=${title}`)
      .then((res) => res.json())
      .then(setBooks)
  }

  return (
    <OpenLibraryContext.Provider value={{ books, getBooksByTitle }}>
      {props.children}
    </OpenLibraryContext.Provider>
  )
}
