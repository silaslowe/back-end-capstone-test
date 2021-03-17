import React, { useState } from "react"

export const VocabContext = React.createContext()

export const VocabProvider = (props) => {
  const [vocabs, setVocabs] = useState()

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
  return (
    <VocabContext.Provider value={{ vocabs, getVocabByBook }}>
      {props.children}
    </VocabContext.Provider>
  )
}
