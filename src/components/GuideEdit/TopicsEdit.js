import React, { useState, useEffect, useContext, useRef } from "react"
import { TopicsContext } from "../Topics/TopicsProvider"
import { useParams } from "react-router-dom"

export const TopicsEdit = (props) => {
  const { topics, getTopicsByBook, destroyTopicRel, setTopics, createTopic } = useContext(
    TopicsContext
  )
  const topic = useRef()
  const bookId = parseInt(useParams().bookId)
  const [booktopics, setBookTopics] = useState([])

  useEffect(() => {
    getTopicsByBook(bookId).then((res) => setTopics(res))
  }, [])

  useEffect(() => {
    getTopicsByBook(bookId).then(setTopics)
  }, [booktopics])
  console.log(topic)
  return (
    <>
      <h1>Topics</h1>
      <form className="topic-form">
        <fieldset>
          <div className="form-group">
            <label htmlFor="question">Question: </label>
            <input type="text" name="topic" required autoFocus ref={topic} />
            <input
              type="button"
              value="Add Topic"
              onClick={() => {
                createTopic({
                  bookId: bookId,
                  topic: topic.current.value.toLowerCase(),
                }).then((t) => {
                  setTopics(t)
                  setBookTopics(t)
                })
              }}
            />
          </div>
        </fieldset>
      </form>

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
