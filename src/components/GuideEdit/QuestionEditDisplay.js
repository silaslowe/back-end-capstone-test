import React, { useState, useContext, useEffect } from "react"
import { QuestionsContext } from "../Questions/QuestionProvider"
import { Question } from "./Question"
import { QuestionCreateForm } from "./QuestionCreateForm"
import { useParams } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Form from "react-bootstrap/Form"
import Image from "react-bootstrap/Image"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"

export const QuestionEditDisplay = (props) => {
  const { getQuestionsByBook, questions, setQuestions } = useContext(QuestionsContext)

  // Gets current book id from the params

  const bookId = parseInt(useParams().bookId)

  // Gets questions on render

  useEffect(() => {
    getQuestionsByBook(bookId)
  }, [])

  return (
    <>
      <h3>Questions</h3>
      <QuestionCreateForm {...props} />
      <Container>
        <Row>
          {questions.map((question) => (
            <Question key={question.id} props={props} question={question} />
          ))}
        </Row>
      </Container>
    </>
  )
}
