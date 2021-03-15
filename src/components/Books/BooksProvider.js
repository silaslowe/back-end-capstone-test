import React, { useState } from "react"
import { useHistory } from "react-router-dom"

export const BooksContext = React.createContext()

export const BooksProvider = (props) => {
  const [books, setBooks] = useState([])
  const [book, setBook] = useState({})
  const history = useHistory()

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

  const createNewGuide = (bookObj) => {
    return fetch("http://localhost:8000/books", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookObj),
    })
      .then((res) => res.json())
      .then((res) => {
        getBooks()
        history.push(`/guide/${res.id}`)
      })
  }

  return (
    <BooksContext.Provider value={{ books, book, getBooks, getSingleBook, createNewGuide }}>
      {props.children}
    </BooksContext.Provider>
  )
}
