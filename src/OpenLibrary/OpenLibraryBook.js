import React from "react"

export const OpenLibraryBook = ({ props, book }) => {
  return (
    <>
      <div key={book.edition_key[0]} className="ol-book">
        <img src={`http://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg` || {}} />
        <p>Title: {book.title}</p>
        <p>Author: {book.author_name}</p>
        <button>Save Book</button>
      </div>
    </>
  )
}
