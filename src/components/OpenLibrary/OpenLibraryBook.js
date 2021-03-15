import React, { useContext } from "react"
import { BooksContext } from "../Books/BooksProvider"

export const OpenLibraryBook = ({ props, book }) => {
  const { createNewGuide } = useContext(BooksContext)
  const authors = book.author_name.join(", ")
  return (
    <>
      <div key={book.edition_key[0]} className="ol-book">
        <img src={`http://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg` || {}} />
        <p>Title: {book.title}</p>
        <p>Author: {authors}</p>
        <button
          onClick={() => {
            createNewGuide({
              author: authors,
              coverUrl:
                `http://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg` || {},
              title: book.title,
              publishYear: book.first_publish_year,
            })
          }}
        >
          Save Book
        </button>
      </div>
    </>
  )
}
