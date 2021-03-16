import React, { useState } from "react"
import { useHistory } from "react-router-dom"

export const QuestionsContext = React.createContext()

export const QuesitonsProvider = (props) => {
  const [questions, setQuestions] = useState([])
  const [question, setQuestion] = useState({})
  const history = useHistory()

  const getQuestions = () => {
    return fetch("http://localhost:8000/questions", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
      },
    })
      .then((response) => response.json())
      .then(setQuestions)
  }

  const getSingleQuestion = (id) => {
    return fetch(`http://localhost:8000/questions/${id}`, {
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
      },
    })
      .then((response) => response.json())
      .then(setQuestion)
  }

  const createNewQuestion = (questionObj) => {
    return fetch("http://localhost:8000/questions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionObj),
    })
      .then((res) => res.json())
      .then((res) => {
        getQuestions()
      })
  }

  return (
    <QuestionsContext.Provider
      value={{ questions, question, getQuestions, getSingleQuestion, createNewQuestion }}
    >
      {props.children}
    </QuestionsContext.Provider>
  )
}
