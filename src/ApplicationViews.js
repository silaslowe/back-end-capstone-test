import React, { Component } from "react"
import { Route } from "react-router-dom"
import { Search } from "./components/Search/Search"
import { OpenLibrary } from "./components/OpenLibrary/OpenLibrary"
import { OpenLibraryProvider } from "./components/OpenLibrary/OpenLibraryProvider"
import { ProfileProvider } from "./components/Profile/ProfileProvider"
import { CurrentProfile } from "./components/Profile/CurrentProfile"
import { Guide } from "./components/GuideDisplay/Guide"
import { SearchGuideDisplay } from "./components/Search/SearchGuideDisplay"
import { BooksProvider } from "./components/Books/BooksProvider"
import { GuideEdit } from "./components/GuideEdit/GuideEdit"
import { QuesitonsProvider } from "./components/Questions/QuestionProvider"
import { TopicsProvider } from "./components/Topics/TopicsProvider"
import { SkillsProvider } from "./components/Skills/SkillsProvider"
import { VocabProvider } from "./components/Vocab/VocabProvider"

export const ApplicationViews = (props) => {
  return (
    <>
      <OpenLibraryProvider>
        <BooksProvider>
          <ProfileProvider>
            <QuesitonsProvider>
              <TopicsProvider>
                <SkillsProvider>
                  <VocabProvider>
                    <Route
                      exact
                      path="/search"
                      render={(props) => {
                        return <Search {...props} />
                      }}
                    />
                    <Route
                      exact
                      path="/search-guide/:bookId(\d+)"
                      render={(props) => {
                        return <SearchGuideDisplay {...props} />
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
                      path="/"
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
                    <Route
                      path="/guide-edit/:bookId(\d+)"
                      render={(props) => {
                        return <GuideEdit {...props} />
                      }}
                    />
                  </VocabProvider>
                </SkillsProvider>
              </TopicsProvider>
            </QuesitonsProvider>
          </ProfileProvider>
        </BooksProvider>
      </OpenLibraryProvider>
    </>
  )
}
