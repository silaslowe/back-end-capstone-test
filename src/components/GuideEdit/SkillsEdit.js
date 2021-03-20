import React, { useState, useEffect, useContext, useRef } from "react"
import { SkillsContext } from "../Skills/SkillsProvider"
import { useParams } from "react-router-dom"

export const SkillsEdit = (props) => {
  const { skills, getSkillsByBook, destroySkillRel, setSkills, createSkill } = useContext(
    SkillsContext
  )
  const skill = useRef()
  const bookId = parseInt(useParams().bookId)

  // Causes render on state cahnge after skill relationship is destroyed

  const [bookskills, setBookSkills] = useState([])

  // Gets skills related to the book on iniitial render

  useEffect(() => {
    getSkillsByBook(bookId).then((res) => setSkills(res))
  }, [])

  // Gets skills related to the book on bookSkills state change

  useEffect(() => {
    getSkillsByBook(bookId).then(setSkills)
  }, [bookskills])

  return (
    <>
      <h1>Skills</h1>
      <form className="skill-form">
        <fieldset>
          <div className="form-group">
            <label htmlFor="question"></label>
            <input type="text" name="skill" required ref={skill} />
            <input
              type="reset"
              value="Add Academic Skill"
              onClick={() => {
                createSkill({
                  bookId: bookId,
                  skill: skill.current.value.toLowerCase(),
                }).then((s) => {
                  setSkills(s)
                  setBookSkills(s)
                })
              }}
            />
          </div>
        </fieldset>
      </form>

      {skills.map((skill) => (
        <div className="skill" key={skill.id}>
          <p>{skill.skill}</p>
          <button
            onClick={() => {
              destroySkillRel({ bookId: bookId, skillId: skill.id }).then((s) => {
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
