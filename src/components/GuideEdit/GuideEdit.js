import React from "react"
import { useHistory, useParams } from "react-router-dom"
import { NavBar } from "../Nav/Nav"
import { BookEdit } from "./BookEdit"
import { QuestionEdit, QuestionEditDisplay } from "./QuestionEditDisplay"

export const GuideEdit = (props) => {
  const history = useHistory()
  const bookId = useParams().bookId
  return (
    <>
      <NavBar />
      <BookEdit {...props} />
      <QuestionEditDisplay {...props} />
      <button onClick={() => history.push(`/guide/${bookId}`)}>Save</button>
    </>
  )
}
