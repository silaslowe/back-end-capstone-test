import React, { useState, useContext, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { QuestionsContext } from "../Questions/QuestionProvider"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export const QuestionCreateForm = (props) => {
  const { createQuestion, getQuestionsByBook, setQuestions } = useContext(QuestionsContext)
  const [bookQuestions, setBookQuestions] = useState([])
  const bookId = parseInt(useParams().bookId)
  const question = useRef()
  const page = useRef()

  // Gets questions on render

  useEffect(() => {
    getQuestionsByBook(bookId)
  }, [])

  // Gets questions when the bookQuestion state changes after the create call

  useEffect(() => {
    getQuestionsByBook(bookId)
  }, [bookQuestions])

  return (
    <Form className="question-form">
      <Form.Label htmlFor="question">Question: </Form.Label>
      <Form.Control type="text" name="question" required ref={question} />
      <Form.Label htmlFor="question-page">Page Number: </Form.Label>
      <Form.Control type="text" name="page" required className="form-control" ref={page} />
      <Button
        className="form-btn-below"
        type="reset"
        variant="secondary"
        onClick={() => {
          createQuestion({
            bookId: bookId,
            question: question.current.value,
            page: page.current.value,
          }).then((q) => {
            setBookQuestions(q)
          })
        }}
      >
        Add
      </Button>
    </Form>
  )
}
