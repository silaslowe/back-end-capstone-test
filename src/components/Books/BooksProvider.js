import React, { useState } from "react"
import { useHistory } from "react-router-dom"

export const BooksContext = React.createContext()

export const BooksProvider = (props) => {
  const [books, setBooks] = useState([])
  const [book, setBook] = useState({ topics: [], skills: [], questions: [], vocab: [], author: [] })
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
        history.push(`/guide/${res.id}`)
      })
  }

  const editBook = (bookObj) => {
    return fetch(`http://localhost:8000/books/${bookObj.id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookObj),
    })
  }

  const booksByCurrentUser = () => {
    return fetch("http://localhost:8000/books/books_by_current_profile", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
      },
    })
      .then((response) => response.json())
      .then(setBooks)
  }

  const getBooksBySkill = (search) => {
    return fetch(`http://localhost:8000/books/books_by_current_profile?skill=${search}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
      },
    })
      .then((response) => response.json())
      .then(setBooks)
  }

  const getBooksByTopic = (search) => {
    return fetch(`http://localhost:8000/books/books_by_current_profile?topic=${search}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
      },
    })
      .then((response) => response.json())
      .then(setBooks)
  }

  const getBooksByTitle = (search) => {
    return fetch(`http://localhost:8000/books/books_by_current_profile?title=${search}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
      },
    })
      .then((response) => response.json())
      .then(setBooks)
  }

  const getBooksBySkillSearch = (search) => {
    return fetch(`http://localhost:8000/books?skill=${search}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
      },
    })
      .then((response) => response.json())
      .then(setBooks)
  }

  const getBooksByTopicSearch = (search) => {
    return fetch(`http://localhost:8000/books?topic=${search}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
      },
    })
      .then((response) => response.json())
      .then(setBooks)
  }

  const getBooksByTitleSearch = (search) => {
    return fetch(`http://localhost:8000/books?title=${search}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
      },
    })
      .then((response) => response.json())
      .then(setBooks)
  }

  const bookProfileRel = (bookId) => {
    return fetch(`http://localhost:8000/books/${bookId}/book_profile_rel`, {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookId),
    })
  }

  console.log(books)
  return (
    <BooksContext.Provider
      value={{
        books,
        book,
        getBooks,
        setBooks,
        getSingleBook,
        createNewGuide,
        booksByCurrentUser,
        getBooksBySkill,
        getBooksByTopic,
        getBooksByTitle,
        getBooksBySkillSearch,
        getBooksByTitleSearch,
        getBooksByTopicSearch,
        bookProfileRel,
        editBook,
      }}
    >
      {props.children}
    </BooksContext.Provider>
  )
}
