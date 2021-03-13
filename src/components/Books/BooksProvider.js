import React, { useState } from "react"

export const BookContext = React.createContext()

export const GameProvider = (props) => {
  const [books, setBooks] = useState([])
  const [book, setbook] = useState({})

  const getBooks = () => {
    return fetch("http://localhost:8000/book", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("lu_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setBooks)
  }

  const getSingleBook = (id) => {
    const getbooks = () => {
      return fetch(`http://localhost:8000/book/${id}`, {
        headers: {
          "Authorization": `Token ${localStorage.getItem("lu_token")}`,
        },
      })
        .then((response) => response.json())
        .then(setBook)
    }
  }
  return (
    <BookContext.Provider value={{ books, book, getBooks, getSingleBook }}>
      {props.children}
    </BookContext.Provider>
  )
}
