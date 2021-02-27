import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { OpenLibrarySearch } from "./OpenLibrary/OpenLibarySearch"
import { OpenLibrary } from "./OpenLibrary/OpenLibrary"
import { OpenLibraryProvider } from "./OpenLibrary/OpenLibraryProvider"

export const ApplicationViews = () => {
  return (
    <>
      <OpenLibraryProvider>
        <Route
          exact
          path="/"
          render={(props) => {
            return <Home {...props} />
          }}
        />
        <Route
          exact
          path="/searchol"
          render={(props) => {
            return <OpenLibrary {...props} />
          }}
        />
      </OpenLibraryProvider>
    </>
  )
}
