import React, { useState, useContext, useEffect } from "react"
import { VocabContext } from "../Vocab/VocabProvider"
import { Vocab } from "./Vocab"
import { useParams } from "react-router-dom"
// import { QuestionCreateForm } from "./QuestionCreateForm"

export const VocabEditDisplay = (props) => {
  const { getVocabByBook, vocabs } = useContext(VocabContext)
  const bookId = parseInt(useParams().bookId)

  useEffect(() => {
    getVocabByBook(bookId)
  }, [])
  console.log("Vocabs", vocabs)
  console.log(bookId)
  return (
    <>
      <h2>Vocabulary Words</h2>
      <div className="vocab-container">
        {vocabs.map((vocab) => (
          <Vocab key={vocab.id} props={props} vocab={vocab} />
        ))}
      </div>
    </>
  )
}
