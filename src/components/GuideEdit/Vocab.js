import React from "react"

export const Vocab = ({ vocab }) => {
  console.log(vocab)
  return (
    <>
      <p>Word: {vocab.word}</p>
      <p>Definition: {vocab.definition}</p>
      <p>Page: {vocab.page}</p>
      <p>Notes: {vocab.notes}</p>
    </>
  )
}
