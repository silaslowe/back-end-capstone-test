import React, { useContext } from "react"
import { BooksContext } from "../Books/BooksProvider"
import { useHistory } from "react-router-dom"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"

export const OpenLibraryBook = ({ props, book }) => {
  const { createNewGuide } = useContext(BooksContext)
  const authors = book.author_name.join(", ")
  const history = useHistory()
  return (
    <>
      <Col md="auto" className="align-self-center">
        <Card style={{ width: "250px", height: "490px", margin: ".5rem" }}>
          <Card.Img
            // variant="top"
            style={{ verticalAlign: "middle" }}
            className="text-center"
            src={`http://covers.openlibrary.org/b/olid/${book.cover_edition_key}-L.jpg` || {}}
            alt={`${book.title} cover`}
          />
          <Card.Body className="align-bottom">
            <Card.Title>Title: {book.title}</Card.Title>
            <Card.Text>Author: {authors}</Card.Text>
          </Card.Body>
          <Button
            variant="secondary"
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
          </Button>
        </Card>
      </Col>
    </>
  )
}

{
  /* <div key={book.edition_key[0]} className="ol-book">
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
</div> */
}
