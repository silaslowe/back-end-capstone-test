import React from "react"
import { Footer } from "../Nav/Footer"
import { Navigation } from "../Nav/Nav"
import { OpenLibrarySearch } from "./OpenLibarySearch"

export const OpenLibrary = (props) => {
  return (
    <>
      <Navigation {...props} />
      <OpenLibrarySearch {...props} />
    </>
  )
}
