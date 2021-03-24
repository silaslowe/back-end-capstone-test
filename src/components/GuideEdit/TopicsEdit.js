import React, { useState, useEffect, useContext, useRef } from "react"
import { TopicsContext } from "../Topics/TopicsProvider"
import { useParams } from "react-router-dom"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import { BookDisplay } from "../GuideDisplay/BookDisplay"

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
      <h3>Topics</h3>
      <Form className="topic-form">
        {/* <Form.Label htmlFor="topic-edit">Add Topic</Form.Label> */}
        <Container style={{ display: "flex" }}>
          <Form.Control style={{ width: "80%" }} type="text" name="topic" required ref={topic} />
          <Button
            className="form-btn-side"
            type="reset"
            variant="secondary"
            onClick={() => {
              createTopic({
                bookId: bookId,
                topic: topic.current.value.toLowerCase(),
              }).then((t) => {
                setTopics(t)
                setBookTopics(t)
              })
            }}
          >
            Add
          </Button>
        </Container>
      </Form>
      <Container>
        <Row>
          {topics.map((topic) => (
            <div
              className="topic"
              key={topic.id}
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
                  fontSize: "1rem",
                }}
              >
                {topic.topic}
              </p>
              <Button
                variant="outline-primary"
                style={{ background: "0px", fontSize: "1.25rem", border: "0px" }}
                onClick={() => {
                  destroyTopicRel({ bookId: bookId, topicId: topic.id }).then((t) => {
                    setTopics(t)
                    setBookTopics(t)
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
