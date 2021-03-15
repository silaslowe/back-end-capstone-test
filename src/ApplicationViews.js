import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { OpenLibrarySearch } from "./components/OpenLibrary/OpenLibarySearch"
import { OpenLibrary } from "./components/OpenLibrary/OpenLibrary"
import { OpenLibraryProvider } from "./components/OpenLibrary/OpenLibraryProvider"
import { ProfileProvider } from "./components/Profile/ProfileProvider"
import { CurrentProfile } from "./components/Profile/CurrentProfile"
import { Guide } from "./components/GuideForm/Guide"
import { BooksProvider } from "./components/Books/BooksProvider"

export const ApplicationViews = (props) => {
  return (
    <>
      <OpenLibraryProvider>
        <BooksProvider>
          <ProfileProvider>
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
            <Route
              exact
              path="/profile"
              render={(props) => {
                return <CurrentProfile {...props} />
              }}
            />
            <Route
              path="/guide/:bookId(\d+)"
              render={(props) => {
                return <Guide {...props} />
              }}
            />
          </ProfileProvider>
        </BooksProvider>
      </OpenLibraryProvider>
    </>
  )
}
