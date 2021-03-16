import React, { useState } from "react"

export const ProfileContext = React.createContext()

export const ProfileProvider = (props) => {
  const [profiles, setProfiles] = useState([])
  const [profile, setProfile] = useState({ user: {} })

  const getProfiles = () => {
    return fetch("http://localhost:8000/profiles", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
      },
    })
      .then((response) => response.json())
      .then(setProfiles)
  }

  const getCurrentProfile = () => {
    return fetch("http://localhost:8000/profiles/current_profile", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
      },
    })
      .then((response) => response.json())
      .then(setProfile)
  }

  return (
    <ProfileContext.Provider value={{ profiles, profile, getProfiles, getCurrentProfile }}>
      {props.children}
    </ProfileContext.Provider>
  )
}
