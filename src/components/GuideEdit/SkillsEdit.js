import React, { useState, useEffect, useContext, useRef } from "react"
import { SkillsContext } from "../Skills/SkillsProvider"
import { useParams } from "react-router-dom"

export const SkillsEdit = (props) => {
  const { skills, getSkillsByBook, destroySkillRel, setSkills, createSkill } = useContext(
    SkillsContext
  )
  const skill = useRef()
  const bookId = parseInt(useParams().bookId)
  const [bookskills, setBookSkills] = useState([])

  useEffect(() => {
    getSkillsByBook(bookId).then((res) => setSkills(res))
  }, [])

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
            <input type="text" name="skill" required autoFocus ref={skill} />
            <input
              type="button"
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
