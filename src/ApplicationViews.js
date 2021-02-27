import React from "react"
import { Route } from "react-router-dom"
import { Landing } from "./Landing"
import { OpenLibraryList } from "./OpenLibrary/OpenLibaryList"
import { OpenLibraryProvider } from "./OpenLibrary/OpenLibraryProvider"

export const ApplicationViews = () => {
  return (
    <>
      <OpenLibraryProvider>
        <Route
          exact
          path="/"
          render={(props) => {
            return <Landing {...props} />
          }}
        />
        <Route
          path="/searchol"
          render={(props) => {
            return <OpenLibraryList {...props} />
          }}
        />
      </OpenLibraryProvider>
    </>
  )
}
