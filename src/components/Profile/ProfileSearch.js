import React, { useState, useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { BooksContext } from "../Books/BooksProvider"
import { QuestionsContext } from "../Questions/QuestionProvider"
import { ProfileBookDisplay } from "./ProfileBookDisplay"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"

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
        <Form onChange={handleControlledInputChange}>
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

        <Form onChange={handleControlledInputChange}>
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

      <div className="profile-books">
        {books.map((book) => (
          <ProfileBookDisplay key={book.id} {...props} book={book} />
        ))}
      </div>
    </>
  )
}
