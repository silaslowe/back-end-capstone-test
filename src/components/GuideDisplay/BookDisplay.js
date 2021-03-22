import React, { useState, useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { BooksContext } from "../Books/BooksProvider"
import Image from "react-bootstrap/Image"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

export const BookDisplay = (props) => {
  const { setBooks, books, getSingleBook, book } = useContext(BooksContext)
  // Gets id of selected book from props
  const bookId = parseInt(useParams().bookId)

  const history = useHistory()
  // Gets currently selected book
  useEffect(() => {
    getSingleBook(bookId)
  }, [])
  console.log(book)
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Book Details:</h2>
      <Container style={{ display: "flex", flexDirection: "Row" }}>
        <Row>
          <Col sm="auto">
            <Image src={book.cover_url} style={{ width: "95%" }} thumbnail />
          </Col>
          <Col sm="auto">
            <Card>
              <Card.Body>
                <Card.Text>Title: {book.title}</Card.Text>
                <Card.Text>Author: {book.author}</Card.Text>
                <Card.Text>Synopsis: {book.synopsis}</Card.Text>
                <Card.Text>Published: {book.publish_year}</Card.Text>
                <Card.Text>Location of Book: {book.location}</Card.Text>
                <Card.Text>Rating: {book.rating}</Card.Text>
                <Button
                  onClick={() => {
                    // Clears book state
                    setBooks([])
                    // Navigate to edit form for selected book
                    history.push({ pathname: `/guide-edit/${book.id}`, state: { book } })
                  }}
                >
                  Edit Guide
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        <Card.Title>Lesson Notes</Card.Title>
        <Card.Text>{book.notes}</Card.Text>
      </Container>
      <Container>
        <h2>Questions:</h2>
        <Container>
          <Row>
            {book.questions
              .sort((a, b) => parseInt(a.page) - parseInt(b.page))
              .map((question) => (
                <Card style={{ width: "27rem", margin: "1rem" }}>
                  <Card.Body>
                    <div>
                      <Card.Title>{question.question}</Card.Title>
                      <Card.Text>Page: {question.page}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              ))}
          </Row>
        </Container>
        <h2>Vocabulary Words:</h2>
        <Container>
          <Row>
            {book.vocab
              .sort((a, b) => parseInt(a.page) - parseInt(b.page))
              .map((vocab) => (
                <Card style={{ width: "27rem", margin: "1rem" }}>
                  <Card.Body
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between ",
                    }}
                  >
                    <div>
                      <Card.Title>{vocab.word}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        Def: {vocab.definition}
                      </Card.Subtitle>
                      <Card.Text>Page: {vocab.page}</Card.Text>
                      <Card.Text>TeachingNotes: {vocab.notes}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              ))}
          </Row>
        </Container>
        <Container>
          <h3>Topics:</h3>
          <Row>
            {book.topics.map((topic) => (
              <div
                className="topic"
                key={topic.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: ".5rem",
                  backgroundColor: "lightgray",
                  padding: ".25rem",
                  borderRadius: "5px",
                }}
              >
                <p
                  style={{
                    margin: "0",
                    padding: ".25rem",
                    textTransform: "capitalize",
                    fontSize: "1.5rem",
                  }}
                >
                  {topic.topic}
                </p>
              </div>
            ))}
          </Row>
        </Container>
        <Container>
          <h3>Skills:</h3>
          <Row>
            {book.skills.map((skill) => (
              <div
                className="topic"
                key={skill.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: ".5rem",
                  backgroundColor: "lightgray",
                  padding: ".25rem",
                  borderRadius: "5px",
                }}
              >
                <p
                  style={{
                    margin: "0",
                    padding: ".25rem",
                    textTransform: "capitalize",
                    fontSize: "1.5rem",
                  }}
                >
                  {skill.skill}
                </p>
              </div>
            ))}
          </Row>
        </Container>
      </Container>
    </>
  )
}
