import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"

export const OpenLibraryList = () => {
  const { register, handleSubmit } = useForm()
  const onSubmit = (data) => console.log(data)

  return (
    <>
      <h1>Open Library Search</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Search: </label>
        <input name="searchByTitle" />
        <input type="submit" />
      </form>
    </>
  )
}

// var replaced = str.replace(' ', '+');
