import React from "react"

export const OpenLibraryBook = ({ props, book }) => {
  return (
    <>
      <div key={book.edition_key[0]} className="open-library-book">
        <p>Title: {book.title}</p>
        <p>Author: {book.author_name}</p>
        <img src={`http://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg` || {}} />
      </div>
    </>
  )
}
