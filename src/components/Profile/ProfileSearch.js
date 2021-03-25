import React, { useState, useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { BooksContext } from "../Books/BooksProvider"
import { QuestionsContext } from "../Questions/QuestionProvider"
import { ProfileBookDisplay } from "./ProfileBookDisplay"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import CardGroup from "react-bootstrap/CardGroup"
import Row from "react-bootstrap/Row"

export const ProfileSearch = (props) => {
  const { getBooksBySkill, getBooksByTopic, getBooksByTitle, books, setBooks } = useContext(
    BooksContext
  )
  const { setQuestions } = useContext(QuestionsContext)
  const { register, handleSubmit } = useForm()
  const [search, setSearch] = useState({})

  useEffect(() => {
    setBooks([])
  }, [])

  useEffect(() => {
    setQuestions([])
  }, [])

  //   const onSubmitSkill = (search) => {
  //     getBooksBySkill(search)
  //   }
  console.log(books)
  const topicSearch = (search) => {
    if (!isEmpty(search)) {
      const searchTopic = search.topic.toLowerCase()
      getBooksByTopic(searchTopic)
    } else {
      alert("Please Fill Out Search")
    }
  }

  const skillSearch = (search) => {
    if (!isEmpty(search)) {
      const searchSkill = search.skill.toLowerCase()
      getBooksBySkill(searchSkill)
    } else {
      alert("Please Fill Out Search")
    }
  }

  const titleSearch = (search) => {
    if (!isEmpty(search)) {
      const searchTitle = search.title.toLowerCase()
      getBooksByTitle(searchTitle)
    } else {
      alert("Please Fill Out Search")
    }
  }

  const isEmpty = (search) => {
    return Object.keys(search).length === 0
  }

  const handleControlledInputChange = (event) => {
    const newSearch = Object.assign({}, register) // Create copy
    newSearch[event.target.name] = event.target.value // Modify copy
    setSearch(newSearch) // Set copy as new state
  }
  console.log("search", search)
  console.log("BOOKS", books)

  return (
    <>
      <Container>
        <Container>
          <Form onChange={handleControlledInputChange} style={{ margin: "2rem 0 0 0" }}>
            <Form.Group controlId="skill">
              <Form.Label>Book By Skill</Form.Label>
              <Form.Control ref={register} type="skill" placeholder="Enter Skill" name="skill" />
              <Form.Text className="text-muted">
                Please enter an academic skill("Letter Identification", "SEL", etc.){" "}
              </Form.Text>
            </Form.Group>
            <Button
              className="submit-btn"
              variant="secondary"
              type="reset"
              onClick={() => {
                setBooks([])
                skillSearch(search)
              }}
            >
              Submit
            </Button>
          </Form>
          <br />
          <Form onChange={handleControlledInputChange}>
            <Form.Group controlId="topic">
              <Form.Label>Book By Topic</Form.Label>
              <Form.Control ref={register} type="skill" placeholder="Enter Topic" name="topic" />
              <Form.Text className="text-muted">
                Please enter an academic skill("Animals", "Construction", etc.){" "}
              </Form.Text>
            </Form.Group>
            <Button
              className="submit-btn"
              variant="secondary"
              type="reset"
              onClick={() => {
                setBooks([])
                topicSearch(search)
              }}
            >
              Submit
            </Button>
          </Form>
          <br />
          <Form onChange={handleControlledInputChange} style={{ margin: " 0 0 3rem 0" }}>
            <Form.Group controlId="title">
              <Form.Label>Book By Title</Form.Label>
              <Form.Control ref={register} type="skill" placeholder="Enter Title" name="title" />
              <Form.Text className="text-muted">
                Please enter a book title(The Three Little Pigs", etc.){" "}
              </Form.Text>
            </Form.Group>
            <Button
              className="submit-btn"
              variant="secondary"
              type="reset"
              onClick={() => {
                setBooks([])
                titleSearch(search)
              }}
            >
              Submit
            </Button>
          </Form>
        </Container>
        <h5 style={{ margin: "1rem 0 0 0" }}>Editable books by user have grey background:</h5>

        <Container fluid>
          <Row className="align-self-center">
            {books.map((book) => (
              <ProfileBookDisplay key={book.id} {...props} book={book} />
            ))}
          </Row>
        </Container>
      </Container>
    </>
  )
}
