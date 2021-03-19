import React, { useState, useContext, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { QuestionsContext } from "../Questions/QuestionProvider"

export const QuestionCreateForm = (props) => {
  const { createQuestion, getQuestionsByBook } = useContext(QuestionsContext)
  const bookId = parseInt(useParams().bookId)
  const question = useRef()
  const page = useRef()

  console.log(bookId)

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
            type="reset"
            value="Add Question"
            onClick={() => {
              createQuestion({
                bookId: bookId,
                question: question.current.value,
                page: page.current.value,
              }).then((res) => getQuestionsByBook(res.bookId))
            }}
          />
        </div>
      </fieldset>
    </form>
  )
}
