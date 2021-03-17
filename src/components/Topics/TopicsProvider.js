import React, { useState } from "react"

export const TopicsContext = React.createContext()

export const TopicsProvider = (props) => {
  const [topics, setTopics] = useState([])

  const getTopics = () => {
    return fetch("http://localhost:8000/topics", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
      },
    })
      .then((response) => response.json())
      .then(setTopics)
  }

  const getTopicsByBook = (bookId) => {
    return fetch("http://localhost:8000/topics/get_topics_by_book", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId: bookId,
      }),
    }).then((response) => response.json())
  }

  const destroyTopicRel = (rel) => {
    return fetch(`http://localhost:8000/topics/destroy_topic_book_relationship`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rel),
    }).then(() => getTopicsByBook(rel.bookId))
  }

  const createTopic = (topicObj) => {
    return fetch("http://localhost:8000/topics", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(topicObj),
    }).then(getTopics)
  }
  return (
    <TopicsContext.Provider
      value={{ topics, getTopics, getTopicsByBook, destroyTopicRel, createTopic, setTopics }}
    >
      {props.children}
    </TopicsContext.Provider>
  )
}
