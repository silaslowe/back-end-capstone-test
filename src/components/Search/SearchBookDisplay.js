import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { BooksContext } from "../Books/BooksProvider"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"

export const SearchBookDisplay = (props) => {
  const history = useHistory()
  const { BookProfileRel } = useContext(BooksContext)
  const book = props.book

  console.log("FROM DISPLAY", book)

  return (
    <>
      <Col md="auto" className="align-self-center">
        <Card style={{ width: "250px", height: "490px", margin: ".5rem" }}>
          <Card.Img
            // variant="top"
            style={{ verticalAlign: "middle" }}
            className="text-center"
            src={book.cover_url}
            alt={`${book.title} cover`}
          />
          <Card.Body className="align-bottom">
            <Card.Title>Title: {book.title}</Card.Title>
            <Card.Text>Author: {book.author}</Card.Text>
          </Card.Body>
          <Button
            onClick={() => {
              history.push(`/search-guide/${book.id}`)
            }}
          >
            View Guide
          </Button>
        </Card>
      </Col>
    </>
  )
}
