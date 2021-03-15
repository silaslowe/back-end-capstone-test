import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import { ProfileContext } from "./ProfileProvider.js"
import { BooksContext } from "../Books/BooksProvider.js"

export const CurrentProfile = (props) => {
  const { profile, getCurrentProfile } = useContext(ProfileContext)
  const { books, getBooks } = useContext(BooksContext)
  useEffect(() => {
    getCurrentProfile()
  }, [])

  useEffect(() => {
    getBooks()
  }, [profile])

  console.log(profile)
  console.log(books)

  return (
    <>
      <h1>Current Profile</h1>
    </>
  )
}
