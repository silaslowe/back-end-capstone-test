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

  const getQuestionsByBook = (bookId) => {
    return fetch("http://localhost:8000/questions/get_questions_by_book", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookId),
    }).then((response) => response.json())
  }

  const createQuestion = (questionObj) => {
    return fetch("http://localhost:8000/questions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionObj),
    })
  }

  const editQuestion = (questionObj) => {
    return fetch(`http://localhost:8000/questions/${questionObj.id}`, {
      method: "PUT",
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questionObj),
    }).then(getQuestions)
  }

  const destroyQuestion = (id) => {
    return fetch(`http://localhost:8000/questions/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
      },
    }).then(getQuestions)
  }

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        question,
        setQuestions,
        getQuestions,
        getSingleQuestion,
        getQuestionsByBook,
        createQuestion,
        destroyQuestion,
        editQuestion,
      }}
    >
      {props.children}
    </QuestionsContext.Provider>
  )
}
