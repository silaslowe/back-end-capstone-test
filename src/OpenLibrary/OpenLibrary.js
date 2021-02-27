import React from "react"
import { NavBar } from "../Nav/Nav"
import { OpenLibrarySearch } from "./OpenLibarySearch"

export const OpenLibrary = (props) => {
  return (
    <>
      <NavBar {...props} />
      <OpenLibrarySearch {...props} />
    </>
  )
}
