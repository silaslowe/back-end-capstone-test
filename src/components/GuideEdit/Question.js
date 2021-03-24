import React, { useContext, useState, useEffect } from "react"
import { QuestionsContext } from "../Questions/QuestionProvider"
import { useParams, useHistory } from "react-router-dom"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"

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
      <Card style={{ width: "27rem", margin: "1rem" }}>
        <Card.Body
          style={{ display: "flex", flexDirection: "column", justifyContent: "space-between " }}
        >
          <div>
            <Card.Title>{question.question}</Card.Title>
            <Card.Text>Page: {question.page}</Card.Text>
          </div>
          <Button
            className="form-btn-below"
            style={{ width: "25%" }}
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
      <Form className="question-form">
        <Form.Label htmlFor="question">Question: </Form.Label>
        <Form.Control
          type="text"
          name="question"
          required
          className="form-control"
          value={editedQuestion.question}
          onChange={changeQuestionState}
        />
        <Form.Label htmlFor="question-page">Page Number: </Form.Label>
        <Form.Control
          type="text"
          name="page"
          required
          className="form-control"
          value={editedQuestion.page}
          onChange={changeQuestionState}
        />
        <Button
          className="form-btn-below"
          type="button"
          variant="secondary"
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
        >
          Edit
        </Button>
        <Button
          className="form-btn-side"
          variant="secondary"
          onClick={() => {
            destroyQuestion(question.id, bookId)
          }}
        >
          Delete
        </Button>
      </Form>
    </>
  )
}
