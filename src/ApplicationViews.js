import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { OpenLibrarySearch } from "./components/OpenLibrary/OpenLibarySearch"
import { OpenLibrary } from "./components/OpenLibrary/OpenLibrary"
import { OpenLibraryProvider } from "./components/OpenLibrary/OpenLibraryProvider"

export const ApplicationViews = (props) => {
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
