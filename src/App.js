import { React } from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import "./index.css"

export const App = () => {
  return (
    <>
      <Route render={(props) => <ApplicationViews {...props} />} />
    </>
  )
}
