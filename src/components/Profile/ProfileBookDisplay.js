import React from "react"
import { useHistory } from "react-router-dom"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"

export const ProfileBookDisplay = (props) => {
  const history = useHistory()
  const book = props.book

  console.log("FROM DISPLAY", book)

  return (
    <>
      <Col md="auto" className="align-self-center">
        <Card
          style={{
            width: "250px",
            height: "490px",
            margin: ".5rem",
            background: book.is_current_user ? "lightgray" : "white",
          }}
        >
          <Card.Img
            // variant="top"
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
              history.push(`/guide/${book.id}`)
            }}
          >
            View Guide
          </Button>
        </Card>
      </Col>
    </>
  )
}
