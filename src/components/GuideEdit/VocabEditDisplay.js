import React, { useState, useContext, useEffect, useRef } from "react"
import { VocabContext } from "../Vocab/VocabProvider"
import { Vocab } from "./Vocab"
import { useParams } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"

export const VocabEditDisplay = (props) => {
  const { getVocabByBook, vocabs, setVocabs, createVocab } = useContext(VocabContext)
  const [bookVocabs, setBookVocabs] = useState([])
  const bookId = parseInt(useParams().bookId)
  const word = useRef()
  const definition = useRef()
  const notes = useRef()
  const page = useRef()

  useEffect(() => {
    getVocabByBook(bookId).then(() => setBookVocabs)
  }, [])

  useEffect(() => {
    getVocabByBook(bookId).then(() => setBookVocabs)
  }, [bookVocabs])

  return (
    <>
      <h3>Vocabulary Words</h3>
      <Container className="align-items-center">
        <Form className="vocab-create-form" style={{ width: "80%" }}>
          <Form.Label htmlFor="word">Vocabulary Word</Form.Label>
          <Form.Control type="text" name="word" required ref={word} />
          <Form.Label htmlFor="definition">Defintion</Form.Label>
          <Form.Control type="text" name="definition" required ref={definition} />
          <Form.Label htmlFor="notes">Teaching Notes</Form.Label>
          <Form.Control type="text" name="notes" required ref={notes} />
          <Form.Label htmlFor="page">Page</Form.Label>
          <Form.Control type="text" name="page" required ref={page} />
          <Button
            className="form-btn-below"
            type="reset"
            variant="secondary"
            onClick={() => {
              createVocab({
                bookId: bookId,
                word: word.current.value,
                definition: definition.current.value,
                notes: notes.current.value,
                page: page.current.value,
              })
            }}
          >
            Add
          </Button>
        </Form>
      </Container>
      <Container className="vocab-container">
        <Row>
          {vocabs.map((vocab) => (
            <Vocab key={vocab.id} props={props} vocab={vocab} />
          ))}
        </Row>
      </Container>
    </>
  )
}
