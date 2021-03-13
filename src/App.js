import { React } from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./components/Auth/Login"
import { Register } from "./components/Auth/Register"
import "./index.css"

export const App = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("active_user")) {
          return (
            <>
              <ApplicationViews />
            </>
          )
        } else {
          return <Redirect to="/login" />
        }
      }}
    />

    <Route
      path="/login"
      render={() => {
        if (localStorage.getItem("active_user")) {
          return <Redirect to="/" />
        } else {
          return <Login />
        }
      }}
    />

    <Route
      path="/register"
      render={() => {
        if (localStorage.getItem("active_user")) {
          return <Redirect to="/" />
        } else {
          return <Register />
        }
      }}
    />
  </>
)
