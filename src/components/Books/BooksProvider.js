import React, { useState } from "react"

export const BooksContext = React.createContext()

export const BooksProvider = (props) => {
  const [books, setBooks] = useState([])
  const [book, setBook] = useState({})

  const getBooks = () => {
    return fetch("http://localhost:8000/books", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
      },
    })
      .then((response) => response.json())
      .then(setBooks)
  }

  const getSingleBook = (id) => {
    return fetch(`http://localhost:8000/books/${id}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
      },
    })
      .then((response) => response.json())
      .then(setBook)
  }

  return (
    <BooksContext.Provider value={{ books, book, getBooks, getSingleBook }}>
      {props.children}
    </BooksContext.Provider>
  )
}
