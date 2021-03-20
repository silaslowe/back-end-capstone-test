import React, { useState, useEffect, useContext } from "react"
import { useHistory } from "react-router-dom"
import { ProfileContext } from "./ProfileProvider.js"
import { BooksContext } from "../Books/BooksProvider.js"
import { Navigation } from "../Nav/Nav"
import { ProfileSearch } from "./ProfileSearch.js"
import Card from "react-bootstrap/Card"

export const CurrentProfile = (props) => {
  const { profile, getCurrentProfile } = useContext(ProfileContext)
  const { books, booksByCurrentUser } = useContext(BooksContext)
  useEffect(() => {
    getCurrentProfile()
  }, [])

  // useEffect(() => {
  //   booksByCurrentUser()
  // }, [profile])

  // console.log(profile)
  // console.log(books)

  return (
    <>
      <Navigation {...props} />
      <Card className="text-center">
        <Card.Header>Current Profile</Card.Header>
        <Card.Body>
          <Card.Title>
            Name: {profile.user.first_name} {profile.user.last_name}
          </Card.Title>
          <Card.Text>Email: {profile.user.username}</Card.Text>
          <Card.Text>Role: {profile.role}</Card.Text>
          <Card.Text> Bio: {profile.bio}</Card.Text>
        </Card.Body>
      </Card>
      <ProfileSearch {...props} />
    </>
  )
}
