import React, { useContext, useState, useEffect } from "react"
import { QuestionsContext } from "../Questions/QuestionProvider"
import { useParams, useHistory } from "react-router-dom"

export const Question = ({ question }) => {
  const { destroyQuestion, editQuestion, getQuestionsByBook } = useContext(QuestionsContext)
  const [edit, setEdit] = useState(false)
  const bookId = parseInt(useParams().bookId)

  // Empty copy of question state

  const [editedQuestion, setEditedQuestion] = useState({
    id: "",
    bookId: "",
    question: "",
    page: "",
  })

  // Sets copy to quesiton state

  useEffect(() => {
    setEditedQuestion({
      id: question.id,
      bookId: question.book,
      question: question.question,
      page: question.page,
    })
  }, [])

  // Changes the state for the edited question when the form changes by using the newQuestionState variable. newQuestionState uses the targeted form element and captures its value and then sets the property in edited book to that value.

  const changeQuestionState = (domEvent) => {
    const newQuestionState = Object.assign({}, editedQuestion)
    newQuestionState[domEvent.target.name] = domEvent.target.value
    setEditedQuestion(newQuestionState)
  }

  // Triggers a rerender when edit state variable is changed

  useEffect(() => {
    getQuestionsByBook(bookId)
  }, [edit])

  // If edit state variable is false: display the text from the current question in the render. Else, display the question edit form.

  return !edit ? (
    <>
      <p>Question: {question.question}</p>
      <p>Page: {question.page}</p>
      <button
        onClick={() => {
          destroyQuestion(question.id, bookId)
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
