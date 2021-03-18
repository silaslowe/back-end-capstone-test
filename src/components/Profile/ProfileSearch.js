import React, { useState, useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { BooksContext } from "../Books/BooksProvider"
import { ProfileBookDisplay } from "./ProfileBookDisplay"

export const ProfileSearch = (props) => {
  const { getBooksBySkill, books, setBooks } = useContext(BooksContext)
  const { register, handleSubmit } = useForm()
  const [search, setSearch] = useState({})
  const [filter, setFilter] = useState("")

  useEffect(() => {
    setBooks([])
  }, [])

  //   const onSubmitSkill = (search) => {
  //     getBooksBySkill(search)
  //   }

  const handleControlledInputChange = (event) => {
    const newSearch = Object.assign({}, register) // Create copy
    newSearch[event.target.name] = event.target.value // Modify copy
    setSearch(newSearch) // Set copy as new state
  }
  console.log("search", search)
  console.log("search", books)

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
            getBooksBySkill(search.skill)
          }}
        />
        <label>Seach By Topic</label>
        <input type="text" name="skill" ref={register} />
        <input
          type="reset"
          value="Submit"
          onClick={() => {
            getBooksBySkill(search.skill)
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
