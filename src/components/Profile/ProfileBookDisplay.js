import React from "react"
import { useHistory } from "react-router-dom"

export const ProfileBookDisplay = (props) => {
  const history = useHistory()
  const book = props.book
  console.log("FROM DISPLAY", book)
  return (
    <>
      <div key={book.id} className="ol-book">
        <img src={book.cover_url} alt={`${book.title} cover`} />
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
