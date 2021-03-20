import React, { useState, useEffect, useContext, useRef } from "react"
import { TopicsContext } from "../Topics/TopicsProvider"
import { useParams } from "react-router-dom"

export const TopicsEdit = (props) => {
  const { topics, getTopicsByBook, destroyTopicRel, setTopics, createTopic } = useContext(
    TopicsContext
  )
  const topic = useRef()
  const bookId = parseInt(useParams().bookId)

  // Causes render on state cahnge after skill relationship is destroyed

  const [booktopics, setBookTopics] = useState([])

  // Gets skills related to the book on iniitial render

  useEffect(() => {
    getTopicsByBook(bookId).then((res) => setTopics(res))
  }, [])

  // Gets skills related to the book on bookSkills state change

  useEffect(() => {
    getTopicsByBook(bookId).then(setTopics)
  }, [booktopics])
  return (
    <>
      <h1>Topics</h1>
      <form className="topic-form">
        <fieldset>
          <div className="form-group">
            <label htmlFor="question"> </label>
            <input type="text" name="topic" required ref={topic} />
            <input
              type="reset"
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
        <div className="topic" key={topic.id}>
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
