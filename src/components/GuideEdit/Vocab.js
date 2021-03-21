import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { VocabContext } from "../Vocab/VocabProvider"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"

export const Vocab = ({ vocab }) => {
  const { editVocab, destroyVocabRel } = useContext(VocabContext)
  const bookId = parseInt(useParams().bookId)
  const [edit, setEdit] = useState(false)

  // Empty copy of question state

  const [editedVocab, setEditedVocab] = useState({
    id: "",
    word: "",
    definition: "",
    page: "",
    notes: "",
  })

  // Sets copy to vocab state

  useEffect(() => {
    setEditedVocab({
      id: vocab.id,
      word: vocab.word,
      notes: vocab.notes,
      page: vocab.page,
      definition: vocab.definition,
    })
  }, [])

  // Changes the state for the edited vocab when the form changes by using the newVocabState variable. newVocabState uses the targeted form element and captures its value and then sets the property in edited book to that value.

  const changeVocabState = (domEvent) => {
    const newVocabState = Object.assign({}, editedVocab)
    newVocabState[domEvent.target.name] = domEvent.target.value
    setEditedVocab(newVocabState)
  }

  return !edit ? (
    <>
      <Card style={{ width: "27rem", margin: "1rem" }}>
        <Card.Body
          style={{ display: "flex", flexDirection: "column", justifyContent: "space-between " }}
        >
          <div>
            <Card.Title>{vocab.word}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Def: {vocab.definition}</Card.Subtitle>
            <Card.Text>Teaching Notes: {vocab.notes}</Card.Text>
            <Card.Text>Page: {vocab.page}</Card.Text>
          </div>
          <Button
            className="form-btn-below"
            style={{ width: "20%" }}
            variant="secondary"
            onClick={() => setEdit(true)}
          >
            Edit
          </Button>
        </Card.Body>
      </Card>
    </>
  ) : (
    <>
      <Form className="vocab-form">
        <h3 className="vocab-form__title">Edit Vocabulary Word</h3>

        <Form.Label htmlFor="vocab">Word: </Form.Label>
        <Form.Control
          type="text"
          name="word"
          required
          className="form-control"
          value={editedVocab.word}
          onChange={changeVocabState}
        />
        <Form.Label htmlFor="vocab-definition">Definition: </Form.Label>
        <Form.Control
          type="text"
          name="definition"
          required
          className="form-control"
          value={editedVocab.definition}
          onChange={changeVocabState}
        />
        <Form.Label htmlFor="vocab-notes">Notes: </Form.Label>
        <Form.Control
          type="text"
          name="notes"
          required
          className="form-control"
          value={editedVocab.notes}
          onChange={changeVocabState}
        />
        <Form.Label htmlFor="vocab-page">Page Number: </Form.Label>
        <Form.Control
          type="text"
          name="page"
          required
          className="form-control"
          value={editedVocab.page}
          onChange={changeVocabState}
        />
        <Button
          className="form-btn-below"
          type="button"
          variant="secondary"
          onClick={() => {
            editVocab({
              id: editedVocab.id,
              word: editedVocab.word,
              definition: editedVocab.definition,
              notes: editedVocab.notes,
              page: editedVocab.page,
              bookId: bookId,
            })
            setEdit(false)
          }}
        >
          Edit
        </Button>
        <Button
          className="form-btn-side"
          type="reset"
          variant="secondary"
          onClick={() => {
            destroyVocabRel({
              vocabId: editedVocab.id,
              bookId: bookId,
            })
            setEdit(false)
          }}
        >
          Delete
        </Button>
      </Form>
    </>
  )
}
