import React, { useState, useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { BooksContext } from "../Books/BooksProvider"
import { QuestionsContext } from "../Questions/QuestionProvider"
import { ProfileBookDisplay } from "./ProfileBookDisplay"

export const ProfileSearch = (props) => {
  const { getBooksBySkill, getBooksByTopic, books, setBooks } = useContext(BooksContext)
  const { setQuestions } = useContext(QuestionsContext)
  const { register, handleSubmit } = useForm()
  const [search, setSearch] = useState({})

  useEffect(() => {
    setBooks([])
  }, [])

  useEffect(() => {
    setQuestions([])
  }, [])

  //   const onSubmitSkill = (search) => {
  //     getBooksBySkill(search)
  //   }

  const topicSearch = (search) => {
    const searchTopic = search.topic.toLowerCase()
    if (searchTopic) {
      getBooksByTopic(searchTopic)
    } else {
      alert("No Matching Books")
    }
  }

  const skillSearch = (search) => {
    const searchSkill = search.skill.toLowerCase()
    if (searchSkill) {
      getBooksBySkill(searchSkill)
    } else {
      alert("No Matching Books")
    }
  }

  const handleControlledInputChange = (event) => {
    const newSearch = Object.assign({}, register) // Create copy
    newSearch[event.target.name] = event.target.value // Modify copy
    setSearch(newSearch) // Set copy as new state
  }
  // console.log("search", search)
  console.log("BOOKS", books)

  return (
    <>
      <h1>Search for Guides</h1>
      <form onChange={handleControlledInputChange}>
        <label>Seach By Skill</label>
        <input type="text" name="skill" ref={register} />
        <input
          type="reset"
          value="Submit"
          onClick={() => {
            setBooks([])
            skillSearch(search)
          }}
        />
        <label>Seach By Topic</label>
        <input type="text" name="topic" ref={register} />
        <input
          type="reset"
          value="Submit"
          onClick={() => {
            setBooks([])
            topicSearch(search)
          }}
        />
      </form>
      <div className="profile-books">
        {books.map((book) => (
          <ProfileBookDisplay key={book.id} {...props} book={book} />
        ))}
      </div>
    </>
  )
}
