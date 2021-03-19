import React, { useContext, useState, useEffect } from "react"
import { QuestionsContext } from "../Questions/QuestionProvider"
import { useParams, useHistory } from "react-router-dom"

export const Question = ({ question }) => {
  const { destroyQuestion, editQuestion, getQuestionsByBook } = useContext(QuestionsContext)
  const [edit, setEdit] = useState(false)
  const bookId = parseInt(useParams().bookId)
  const history = useHistory()
  const [destroyed, setDestroyed] = useState("")
  const [editedQuestion, setEditedQuestion] = useState({
    id: "",
    bookId: "",
    question: "",
    page: "",
  })

  const changeQuestionState = (domEvent) => {
    const newQuestionState = Object.assign({}, editedQuestion)
    newQuestionState[domEvent.target.name] = domEvent.target.value
    setEditedQuestion(newQuestionState)
  }

  useEffect(() => {
    setEditedQuestion({
      id: question.id,
      bookId: question.book,
      question: question.question,
      page: question.page,
    })
  }, [])

  useEffect(() => {
    getQuestionsByBook(bookId)
  }, [edit])

  return !edit ? (
    <>
      <p>Question: {question.question}</p>
      <p>Page: {question.page}</p>
      <button
        onClick={() => {
          destroyQuestion(question.id, bookId).then(() => setDestroyed(bookId))
        }}
      >
        Delete
      </button>
      <button onClick={() => setEdit(true)}>Edit</button>
    </>
  ) : (
    <>
      <form className="question-form">
        <h2 className="question-form__title">Edit Book</h2>
        <fieldset>
          <div className="form-group">
            <label htmlFor="question">Question: </label>
            <input
              type="text"
              name="question"
              required
              className="form-control"
              value={editedQuestion.question}
              onChange={changeQuestionState}
            />
            <label htmlFor="question-page">Page Number: </label>
            <input
              type="text"
              name="page"
              required
              className="form-control"
              value={editedQuestion.page}
              onChange={changeQuestionState}
            />
            <input
              type="button"
              value="Edit"
              onClick={(e) => {
                e.preventDefault()
                editQuestion({
                  id: editedQuestion.id,
                  bookId: editedQuestion.bookId,
                  question: editedQuestion.question,
                  page: editedQuestion.page,
                }).then(() => {
                  setEdit(false)
                })
              }}
            />
          </div>
        </fieldset>
      </form>
    </>
  )
}
