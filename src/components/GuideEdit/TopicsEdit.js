import React, { useState, useEffect, useContext } from "react"
import { TopicsContext } from "../Topics/TopicsProvider"
import { useParams } from "react-router-dom"
// import { Topic } from "./Topic"

export const TopicsEdit = (props) => {
  const { topics, getTopicsByBook, destroyTopicRel, setTopics } = useContext(TopicsContext)

  const bookId = parseInt(useParams().bookId)
  const [booktopics, setBookTopics] = useState([])

  useEffect(() => {
    getTopicsByBook(bookId).then((res) => setTopics(res))
  }, [])

  useEffect(() => {
    getTopicsByBook(bookId).then(setTopics)
  }, [booktopics])

  return (
    <>
      <h1>Topics</h1>
      {topics.map((topic) => (
        <div className="topic">
          <p>{topic.topic}</p>
          <button
            onClick={() => {
              destroyTopicRel({ bookId: bookId, topicId: topic.id }).then((t) => {
                setTopics(t)
                setBookTopics(t)
              })
            }}
          >
            X
          </button>
        </div>
      ))}
    </>
  )
}
