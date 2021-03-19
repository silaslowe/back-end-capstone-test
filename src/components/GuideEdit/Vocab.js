import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { VocabContext } from "../Vocab/VocabProvider"

export const Vocab = ({ vocab }) => {
  console.log(vocab)
  const { editVocab, destroyVocabRel } = useContext(VocabContext)
  const bookId = parseInt(useParams().bookId)
  const [edit, setEdit] = useState(false)
  const [editedVocab, setEditedVocab] = useState({
    id: "",
    word: "",
    definition: "",
    page: "",
    notes: "",
  })

  const changeVocabState = (domEvent) => {
    const newVocabState = Object.assign({}, editedVocab)
    newVocabState[domEvent.target.name] = domEvent.target.value
    setEditedVocab(newVocabState)
  }

  useEffect(() => {
    setEditedVocab({
      id: vocab.id,
      word: vocab.word,
      notes: vocab.notes,
      page: vocab.page,
      definition: vocab.definition,
    })
  }, [])
  console.log("Edited Vocab", editedVocab)
  return !edit ? (
    <>
      <p>Word: {vocab.word}</p>
      <p>Definition: {vocab.definition}</p>
      <p>Page: {vocab.page}</p>
      <p>Notes: {vocab.notes}</p>
      <button onClick={() => setEdit(true)}>Edit</button>
    </>
  ) : (
    <>
      <form className="vocab-form">
        <h2 className="vocab-form__title">Edit Vocabulary Word</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="vocab">Word: </label>
            <input
              type="text"
              name="word"
              required
              className="form-control"
              value={editedVocab.word}
              onChange={changeVocabState}
            />
            <label htmlFor="vocab-definition">Definition: </label>
            <input
              type="text"
              name="definition"
              required
              className="form-control"
              value={editedVocab.definition}
              onChange={changeVocabState}
            />
            <label htmlFor="vocab-notes">Notes: </label>
            <input
              type="text"
              name="notes"
              required
              className="form-control"
              value={editedVocab.notes}
              onChange={changeVocabState}
            />
            <label htmlFor="vocab-page">Page Number: </label>
            <input
              type="text"
              name="page"
              required
              className="form-control"
              value={editedVocab.page}
              onChange={changeVocabState}
            />
            <input
              type="button"
              value="Edit"
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
            />
            <input
              type="reset"
              value="
              Delete"
              onClick={() => {
                destroyVocabRel({
                  vocabId: editedVocab.id,
                  bookId: bookId,
                })
                setEdit(false)
              }}
            />
          </div>
        </fieldset>
      </form>
    </>
  )
}
