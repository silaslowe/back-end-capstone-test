import React, { useContext, useState, useEffect } from "react"
import { BooksContext } from "../Books/BooksProvider"
import { useHistory } from "react-router-dom"

export const ProfileBookDisplay = (props) => {
  const [authors, setAuthors] = useState("")
  const history = useHistory()
  const book = props.book

  return (
    <>
      <div key={book.id} className="ol-book">
        <img src={book.cover_url} />
        <p>Title: {book.title}</p>
        <p>Author: {book.author}</p>
        <button
          onClick={() => {
            history.push(`/guide/${book.id}`)
          }}
        >
          View Guide
        </button>
      </div>
    </>
  )
}
