import React, { useState, useContext, useEffect } from "react"

export const BookDisplay = (props) => {
  const book = props.book
  console.log(book)
  return (
    <>
      <h2>Book Details:</h2>
      <img src={book.cover_url} />
      <h3>Title: {book.title}</h3>
      <h3>Author: {book.author}</h3>
      <h3>Synopsis: {book.synopsis}</h3>
      <h3>Notes: {book.notes}</h3>
      <h3>Published: {book.publish_year}</h3>
      <h3>Location of Book: {book.Location}</h3>
      <h3>Rating: {book.rating}</h3>
      <h2>Topics:</h2>
      {book.topics.map((topic) => (
        <p>{topic.topic}</p>
      ))}
      <h2>Skills:</h2>
      {book.skills.map((skill) => (
        <p>{skill.skill}</p>
      ))}
      <h2>Questions:</h2>
      {book.questions.map((question) => (
        <p>{question.question}</p>
      ))}
      <h2>Vocabulary Words:</h2>
      {book.vocab.map((vocab) => (
        <div>
          <p>Word: {vocab.word}</p>
          <p>Definiton: {vocab.definition}</p>
        </div>
      ))}
    </>
  )
}
