import React from "react"
import { useHistory, useParams } from "react-router-dom"
import { NavBar } from "../Nav/Nav"
import { BookEdit } from "./BookEdit"
import { QuestionEditDisplay } from "./QuestionEditDisplay"
import { SkillsEdit } from "./SkillsEdit"
import { TopicsEdit } from "./TopicsEdit"
import { VocabEditDisplay } from "./VocabEditDisplay"

export const GuideEdit = (props) => {
  const history = useHistory()
  const bookId = useParams().bookId
  return (
    <>
      <NavBar />
      <BookEdit {...props} />
      <TopicsEdit {...props} />
      <SkillsEdit {...props} />
      <VocabEditDisplay {...props} />
      <QuestionEditDisplay {...props} />
      <button onClick={() => history.push(`/guide/${bookId}`)}>Save</button>
    </>
  )
}
