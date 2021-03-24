import React, { useState, useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { BooksContext } from "../Books/BooksProvider"
import { QuestionsContext } from "../Questions/QuestionProvider"
import { SearchBookDisplay } from "../Search/SearchBookDisplay"
import { Navigation } from "../Nav/Nav"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

export const Search = (props) => {
  const {
    getBooksBySkillSearch,
    getBooksByTopicSearch,
    getBooksByTitleSearch,
    books,
    setBooks,
  } = useContext(BooksContext)
  const { setQuestions } = useContext(QuestionsContext)
  const { register, handleSubmit } = useForm()
  const [search, setSearch] = useState({})

  useEffect(() => {
    setBooks([])
  }, [])

  useEffect(() => {
    setQuestions([])
  }, [])
  const topicSearch = (search) => {
    if (!isEmpty(search)) {
      const searchTopic = search.topic.toLowerCase()
      getBooksByTopicSearch(searchTopic)
    } else {
      alert("Please Fill Out Search")
    }
  }

  const skillSearch = (search) => {
    if (!isEmpty(search)) {
      const searchSkill = search.skill.toLowerCase()
      getBooksBySkillSearch(searchSkill)
    } else {
      alert("Please Fill Out Search")
    }
  }

  const titleSearch = (search) => {
    if (!isEmpty(search)) {
      const searchTitle = search.title.toLowerCase()
      getBooksByTitleSearch(searchTitle)
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
  console.log("SEARCH", search)
  console.log("SEARCHBOOKS", books)
  return (
    <>
      <Navigation {...props} />
      <h3 style={{ textAlign: "center" }}>Search Profiles for Guides</h3>
      <Container>
        <Container>
          <Form onChange={handleControlledInputChange} style={{ margin: "3rem 0 0 0" }}>
            <Form.Group controlId="skill">
              <Form.Label>Book By Skill</Form.Label>
              <Form.Control ref={register} type="skill" placeholder="Enter Skill" name="skill" />
              <Form.Text className="text-muted">
                Please enter an academic skill("Letter Identification", "SEL", etc.){" "}
              </Form.Text>
            </Form.Group>
            <Button
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

          <Form onChange={handleControlledInputChange}>
            <Form.Group controlId="topic">
              <Form.Label>Book By Topic</Form.Label>
              <Form.Control ref={register} type="skill" placeholder="Enter Topic" name="topic" />
              <Form.Text className="text-muted">
                Please enter an academic skill("Animals", "Construction", etc.){" "}
              </Form.Text>
            </Form.Group>
            <Button
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

          <Form onChange={handleControlledInputChange} style={{ margin: " 0 0 3rem 0" }}>
            <Form.Group controlId="title">
              <Form.Label>Book By Title</Form.Label>
              <Form.Control ref={register} type="skill" placeholder="Enter Title" name="title" />
              <Form.Text className="text-muted">
                Please enter a book title(The Three Little Pigs", etc.){" "}
              </Form.Text>
            </Form.Group>
            <Button
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

        <Container fluid>
          <Row className="align-self-center">
            {books.map((book) => (
              <SearchBookDisplay key={book.id} {...props} book={book} />
            ))}
          </Row>
        </Container>
      </Container>
    </>
  )
}
