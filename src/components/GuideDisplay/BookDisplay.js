import React, { useState, useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { BooksContext } from "../Books/BooksProvider"
import Image from "react-bootstrap/Image"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import { Footer } from "../Nav/Footer"

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
      <h3 style={{ textAlign: "center", margin: "1.5rem 0 1.5rem 0" }}>Book Details:</h3>
      <Container
        style={{
          display: "flex",
          flexDirection: "Row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row>
          <Col style={{ width: "40%" }}>
            <Image src={book.cover_url} style={{ width: "100%" }} thumbnail />
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
                {book.is_current_user ? (
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
                ) : (
                  <></>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container>
        <h3>Lesson Notes: </h3>
        <Card.Text>{book.notes}</Card.Text>
      </Container>
      <Container>
        <h2>Questions:</h2>
        <Container>
          <Row>
            {book.questions
              .sort((a, b) => parseInt(a.page) - parseInt(b.page))
              .map((question) => (
                <Card key={question.id} style={{ width: "27rem", margin: "1rem" }}>
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
                <Card key={vocab.id} style={{ width: "27rem", margin: "1rem" }}>
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
          <Row>
            <Col md={6}>
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
                          fontSize: "1rem",
                        }}
                      >
                        {topic.topic}
                      </p>
                    </div>
                  ))}
                </Row>
              </Container>
            </Col>
            <Col>
              <Container>
                <h3>Skills:</h3>
                <Row>
                  {book.skills.map((skill) => (
                    <div
                      className="skill"
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
                          fontSize: "1rem",
                        }}
                      >
                        {skill.skill}
                      </p>
                    </div>
                  ))}
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}
