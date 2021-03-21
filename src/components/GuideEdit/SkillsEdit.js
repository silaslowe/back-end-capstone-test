import React, { useState, useEffect, useContext, useRef } from "react"
import { SkillsContext } from "../Skills/SkillsProvider"
import { useParams } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

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
      <h3>Skills</h3>
      <Form className="skill-form">
        {/* <Form.Label htmlFor="skill-edit">Add Skill</Form.Label> */}
        <Container style={{ display: "flex" }}>
          <Form.Control style={{ width: "80%" }} type="text" name="skill" required ref={skill} />
          <Button
            className="form-btn-side"
            type="reset"
            variant="secondary"
            onClick={() => {
              createSkill({
                bookId: bookId,
                skill: skill.current.value.toLowerCase(),
              }).then((s) => {
                setSkills(s)
                setBookSkills(s)
              })
            }}
          >
            Add
          </Button>
        </Container>
      </Form>
      <Container>
        <Row>
          {skills.map((skill) => (
            <div
              className="topic"
              key={skill.id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: ".5rem",
                backgroundColor: "lightgray",
                padding: ".25rem",
                borderRadius: "5px",
              }}
            >
              <p
                style={{
                  margin: "0",
                  padding: ".25rem",
                  textTransform: "capitalize",
                  fontSize: "1.5rem",
                }}
              >
                {skill.skill}
              </p>
              <Button
                variant="outline-primary"
                style={{ background: "0px", fontSize: "1.25rem", border: "0px" }}
                onClick={() => {
                  destroySkillRel({ bookId: bookId, skillId: skill.id }).then((s) => {
                    setSkills(s)
                    setBookSkills(s)
                  })
                }}
              >
                X
              </Button>
            </div>
          ))}
        </Row>
      </Container>
    </>
  )
}
