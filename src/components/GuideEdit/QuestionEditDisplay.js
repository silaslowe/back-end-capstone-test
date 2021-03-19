import React, { useState, useContext, useEffect } from "react"
import { QuestionsContext } from "../Questions/QuestionProvider"
import { Question } from "./Question"
import { QuestionCreateForm } from "./QuestionCreateForm"
import { useParams } from "react-router-dom"

export const QuestionEditDisplay = (props) => {
  const { getQuestionsByBook, questions, setQuestions } = useContext(QuestionsContext)
  const bookId = parseInt(useParams().bookId)

  useEffect(() => {
    getQuestionsByBook({ bookId: bookId }).then((res) => setQuestions(res))
  }, [])

  console.log("ID", bookId)
  console.log("QUESTIONS", questions)
  return (
    <>
      <h2>Questions</h2>
      <QuestionCreateForm {...props} />
      <div className="question-container">
        {questions.map((question) => (
          <Question key={question.id} props={props} question={question} />
        ))}
      </div>
    </>
  )
}
