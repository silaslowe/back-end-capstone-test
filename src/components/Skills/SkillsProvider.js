import React, { useState } from "react"

export const SkillsContext = React.createContext()

export const SkillsProvider = (props) => {
  const [skills, setSkills] = useState([])

  const getSkills = () => {
    return fetch("http://localhost:8000/skills", {
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
      },
    })
      .then((response) => response.json())
      .then(setSkills)
  }

  const getSkillsByBook = (bookId) => {
    return fetch("http://localhost:8000/skills/get_skills_by_book", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookId: bookId,
      }),
    }).then((response) => response.json())
  }

  const destroySkillRel = (rel) => {
    return fetch(`http://localhost:8000/skills/destroy_skill_book_relationship`, {
      method: "DELETE",
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rel),
    }).then(() => getSkillsByBook(rel.bookId))
  }

  const createSkill = (skillObj) => {
    return fetch("http://localhost:8000/skills", {
      method: "POST",
      headers: {
        "Authorization": `Token ${localStorage.getItem("active_user")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(skillObj),
    }).then(() => getSkillsByBook(skillObj.bookId))
  }
  return (
    <SkillsContext.Provider
      value={{ skills, getSkills, getSkillsByBook, destroySkillRel, createSkill, setSkills }}
    >
      {props.children}
    </SkillsContext.Provider>
  )
}
