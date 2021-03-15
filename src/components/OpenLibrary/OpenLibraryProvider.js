import React, { useState, useContext } from "react"

export const OpenLibraryContext = React.createContext()

export const OpenLibraryProvider = (props) => {
  const [oLBooks, setOLBooks] = useState({ docs: [] })
  const [cover, setCover] = useState([])

  const getOLBooksByTitle = (title, limit) => {
    return fetch(`http://openlibrary.org/search.json?title=${title}&limit=${limit}`)
      .then((res) => res.json())
      .then(setOLBooks)
  }

  const getOLBooksByAuthor = (author, limit) => {
    return fetch(`http://openlibrary.org/search.json?author=${author}&limit=${limit}`)
      .then((res) => res.json())
      .then(setOLBooks)
  }

  return (
    <OpenLibraryContext.Provider value={{ oLBooks, getOLBooksByTitle, getOLBooksByAuthor }}>
      {props.children}
    </OpenLibraryContext.Provider>
  )
}
