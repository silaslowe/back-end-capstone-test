import React, { useState, useContext, useEffect, useRef } from "react"
import { BooksContext } from "../Books/BooksProvider"
import { ProfileBookDisplay } from "./ProfileBookDisplay"

export const SearchProfileBooks = (props) => {
  const { getBooksBySkill, books, setBooks } = useContext(BooksContext)
  const [search, setSearch] = useState("")
  const skill = useRef()
  const topic = useRef()
  const title = useRef()
  console.log(search)
  console.log(books)

  useEffect(() => {
    setBooks([])
  }, [])
  return (
    <>
      <form>
        <label>Seach By Skill</label>
        <input type="text" name="skill" ref={skill} />
        <input
          type="reset"
          value="Submit"
          onClick={() => {
            setSearch(skill.current.value)
            getBooksBySkill(search)
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
