import React, { useState, useContext, useEffect } from "react"
import { QuestionsContext } from "../Questions/QuestionProvider"
import { Question } from "./Question"
import { QuestionCreateForm } from "./QuestionCreateForm"

export const QuestionEditDisplay = (props) => {
  const { getQuestions, questions } = useContext(QuestionsContext)

  useEffect(() => {
    getQuestions()
  }, [])
  return (
    <>
      <h2>Questions</h2>
      <QuestionCreateForm />
      <div className="question-container">
        {questions.map((question) => (
          <Question key={question.id} props={props} question={question} />
        ))}
      </div>
    </>
  )
}
