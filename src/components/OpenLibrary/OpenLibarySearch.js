import React, { useState, useContext } from "react"
import { useForm } from "react-hook-form"
import { OpenLibraryContext } from "./OpenLibraryProvider"
import { OpenLibraryBook } from "./OpenLibraryBook"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

export const OpenLibrarySearch = (props) => {
  const { register, handleSubmit, reset } = useForm()
  const { getOLBooksByTitle, getOLBooksByAuthor, oLBooks } = useContext(OpenLibraryContext)
  const [oLSearch, setOLSearch] = useState({})

  //   const [numOfBooks, setNumOfBooks] = useState("")

  const onSubmitTitle = (search) => {
    const replaced = search.searchByTitle
    const numOfBooks = parseInt(search.numberOfBooksByTitle) + 15
    getOLBooksByTitle(replaced, numOfBooks)
    reset({ searchByTitle: "" })
  }

  const onSubmitAuthor = (search) => {
    const replaced = search.searchByAuthor
    const numOfBooks = parseInt(search.numberOfBooksByTitle) + 15
    getOLBooksByAuthor(replaced, numOfBooks)
    reset({ searchByAuthor: "" })
  }

  const handleControlledInputChange = (event) => {
    const newSearch = Object.assign({}, register) // Create copy
    newSearch[event.target.name] = event.target.value // Modify copy
    setOLSearch(newSearch) // Set copy as new state
  }
  return (
    <>
      <Container>
        <h3 style={{ margin: "1.5rem 0 " }}>Open Library Search</h3>
        <h5 style={{ margin: "0 0 1.5rem 0 " }}>Please search for a book using the fields below</h5>
        <Form onSubmit={handleSubmit(onSubmitTitle)} onChange={handleControlledInputChange}>
          <Form.Label>Number of Responses:</Form.Label>
          <Form.Control
            type="number"
            name="numberOfBooksByTitle"
            min="5"
            max="50"
            step="5"
            defaultValue="5"
            ref={register}
          />
          <Form.Label>Search By Title: </Form.Label>
          <Form.Control name="searchByTitle" ref={register} />
          <Button className="form-btn-below" variant="secondary" type="submit">
            Search
          </Button>
        </Form>

        <Form onSubmit={handleSubmit(onSubmitAuthor)} onChange={handleControlledInputChange}>
          <Form.Label>Search By Author: </Form.Label>
          <Form.Control name="searchByAuthor" ref={register} />
          <Button className="form-btn-below" variant="secondary" type="submit">
            Search
          </Button>
        </Form>

        <Container fluid>
          <Row className="align-self-center">
            {oLBooks.docs
              .filter((book) => book.cover_edition_key)
              .filter((book) => book.author_name)
              //   .slice(0, numOfBooks)
              .map((book) => (
                <OpenLibraryBook key={book.edition_key[0]} props={props} book={book} />
              ))}
          </Row>
        </Container>
      </Container>
    </>
  )
}

// Add an option for how many books to display as a select or number
// Pagination
// Make array of all covers
