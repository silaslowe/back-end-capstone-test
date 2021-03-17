import React, { useState, useEffect, useContext, useRef } from "react"
import { SkillContext } from "../Skills/SkillsProvider"
import { useParams } from "react-router-dom"

export const SkillsEdit = (props) => {
  const { skills, getSkillsByBook, destroyTopicRel, setSkills, createTopic } = useContext(
    SkillsContext
  )
  const topic = useRef()
  //   const topicToLower = topic.toLowerCase()
  const bookId = parseInt(useParams().bookId)
  const [bookskills, setBookSkills] = useState([])

  useEffect(() => {
    getSkillsByBook(bookId).then((res) => setSkils(res))
  }, [])

  useEffect(() => {
    getSkillsByBook(bookId).then(setSkills)
  }, [bookskills])
  console.log(topic)
  return (
    <>
      <h1>Skills</h1>
      <form className="topic-form">
        <h2 className="topic-form__title">Edit Book</h2>
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
                }).then((s) => {
                  setSkills(s)
                  setBookSkills(s)
                })
              }}
            />
          </div>
        </fieldset>
      </form>

      {skills.map((topic) => (
        <div className="topic">
          <p>{topic.topic}</p>
          <button
            onClick={() => {
              destroyTopicRel({ bookId: bookId, topicId: topic.id }).then((t) => {
                setSkills(s)
                setBookSkills(s)
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
