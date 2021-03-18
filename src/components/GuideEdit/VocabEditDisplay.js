import React, { useState, useContext, useEffect, useRef } from "react"
import { VocabContext } from "../Vocab/VocabProvider"
import { Vocab } from "./Vocab"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
// import { QuestionCreateForm } from "./QuestionCreateForm"

export const VocabEditDisplay = (props) => {
  const { getVocabByBook, vocabs, setVocabs, createVocab } = useContext(VocabContext)
  const [bookVocabs, setBookVocabs] = useState([])
  const { register, handleSubmit, reset } = useForm()
  const bookId = parseInt(useParams().bookId)
  const word = useRef()
  const definition = useRef()
  const notes = useRef()
  const page = useRef()

  const formReset = (data, e) => {
    e.target.reset() // reset after form submit
  }

  useEffect(() => {
    getVocabByBook(bookId).then(() => setBookVocabs)
  }, [])

  useEffect(() => {
    getVocabByBook(bookId).then(() => setBookVocabs)
  }, [bookVocabs])

  useEffect(() => {}, [])

  // console.log("Vocabs", vocabs)
  // console.log(bookId)
  return (
    <>
      <h2>Vocabulary Words</h2>
      <form className="vocab-create-form" onSubmit={handleSubmit(formReset)}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="word">Vocabulary Word</label>
            <input type="text" name="word" required ref={word} />
            <label htmlFor="definition">Defintion</label>
            <input type="text" name="definition" required ref={definition} />
            <label htmlFor="notes">Teaching Notes</label>
            <input type="text" name="notes" required ref={notes} />
            <label htmlFor="page">Page</label>
            <input type="text" name="page" required ref={page} />
            <input
              type="reset"
              value="Add Vocabulary Word"
              onClick={(e) => {
                createVocab({
                  bookId: bookId,
                  word: word.current.value,
                  definition: definition.current.value,
                  notes: notes.current.value,
                  page: page.current.value,
                })
              }}
            />
          </div>
        </fieldset>
      </form>
      <div className="vocab-container">
        {vocabs.map((vocab) => (
          <Vocab key={vocab.id} props={props} vocab={vocab} />
        ))}
      </div>
    </>
  )
}
