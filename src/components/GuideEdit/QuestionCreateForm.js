import React, { useState, useContext, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { QuestionsContext } from "../Questions/QuestionProvider"

export const QuestionCreateForm = () => {
  const { createQuestion } = useContext(QuestionsContext)
  const bookId = useParams.bookId
  const question = useRef()
  const page = useRef()

  return (
    <form className="question-form">
      <h2 className="question-form__title">Edit Book</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="question">Question: </label>
          <input type="text" name="question" required autoFocus ref={question} />
          <label htmlFor="question-page">Page Number: </label>
          <input type="text" name="page" required className="form-control" ref={page} />
          <input
            type="button"
            value="Add Question"
            onClick={() => {
              createQuestion({
                bookId: bookId,
                question: question,
                page: page,
              })
            }}
          />
        </div>
      </fieldset>
    </form>
  )
}
