import React, { useState, useEffect } from 'react'

import BookItem from "./BookItem"

const BooksList = (props) => {
  const [books, setBooks] = useState([])

  const getBooks = async () => {
    try {
      const response = await fetch("/api/v1/books")
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const responseBody = await response.json()
      setBooks(responseBody.books)
    } catch(err) {
      console.error(`Error in Fetch: ${err.message}`)
    }
  }

  useEffect(() => {
    getBooks()
  }, [])

  const bookItems = books.map((book) => {
    return (
      <BookItem
        key={book.id}
        book={book}
      />
    )
  })

  return (
    <div>
      <h1>My Book List</h1>
      <ul className="books">
        {bookItems}
      </ul>
    </div>
  )
}

export default BooksList
