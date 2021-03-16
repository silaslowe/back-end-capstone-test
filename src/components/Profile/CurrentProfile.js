import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import { ProfileContext } from "./ProfileProvider.js"
import { BooksContext } from "../Books/BooksProvider.js"
import { NavBar } from "../Nav/Nav"
import { ProfileBookDisplay } from "./ProfileBookDisplay"

export const CurrentProfile = (props) => {
  const { profile, getCurrentProfile } = useContext(ProfileContext)
  const { books, booksByCurrentUser } = useContext(BooksContext)
  useEffect(() => {
    getCurrentProfile()
  }, [])

  useEffect(() => {
    booksByCurrentUser()
  }, [profile])

  console.log(profile)
  console.log(books)

  return (
    <>
      <NavBar {...props} />
      <h1>Current Profile</h1>
      <div className="profile-container">
        <h3>
          Name: {profile.user.first_name} {profile.user.last_name}
        </h3>
        <p>Email: {profile.user.username}</p>
        <p>Role: {profile.role}</p>
        <p>Bio: {profile.bio}</p>
      </div>
      <div className="profile-books">
        {books.map((book) => (
          <ProfileBookDisplay key={book.id} {...props} book={book} />
        ))}
      </div>
    </>
  )
}
