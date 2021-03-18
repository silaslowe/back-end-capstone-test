import React, { useState } from "react"

export const VocabContext = React.createContext()

export const VocabProvider = (props) => {
  const [vocabs, setVocabs] = useState([])

  const getVocabByBook = (bookId) => {
    return fetch("http://localhost:8000/vocabs/get_vocab_by_book", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId: bookId,
      }),
    })
      .then((res) => res.json())
      .then(setVocabs)
  }

  const editVocab = (vocabObj) => {
    return fetch(`http://localhost:8000/vocabs/${vocabObj.id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vocabObj),
    }).then(() => getVocabByBook(vocabObj.bookId))
  }

  const createVocab = (vocabObj) => {
    return fetch(`http://localhost:8000/vocabs`, {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vocabObj),
    }).then(() => getVocabByBook(vocabObj.bookId))
  }

  return (
    <VocabContext.Provider value={{ vocabs, getVocabByBook, editVocab, createVocab, setVocabs }}>
      {props.children}
    </VocabContext.Provider>
  )
}
