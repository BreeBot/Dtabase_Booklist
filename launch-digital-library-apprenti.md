Let's build a digital library application to help us keep track of the books on our wishlist that we want to read!

## Learning Goals

* **Monolithic structure**. Work with a monolith application to become comfortable with app configuration and folder organization.
* **Database-backed application**. Apply a PostgreSQL database for interacting with data.
* **Joining data**. Understand the importance of defining database and model joins in order to associate our data.

## Getting Started

From your challenges directory, run the following:

```no-highlight
et get launch-digital-library-apprenti
cd launch-digital-library-apprenti
yarn install
```

Next, create your database, then get the app running:

```no-highlight
createdb launch_digital_library_development
yarn run dev
```

In another tab:

```
yarn run dev:client
```

Navigating to <http://localhost:3000/books> should display the header `My Book List`.

## Instructions

This is a multi-part challenge, you should not expect to complete this assignment in one sitting. There will be other lessons you will need to complete in order to gain the knowledge and experience for this challenge.

**Complete each part before moving onto the next!**

Make sure you take a look at the files you are provided with. A couple to highlight:
- `api/v1/booksRouter.js` has been created and is ready for routes to be added, and `Book.js` has been created with an empty class inside.
- `App.js`, within the folder `client/src/components`, is our top-level React component that displays the current text on the webpage. It includes a React `BrowserRouter`.
- `BooksList.js` includes a fetch call within the `useEffect()` to grab all of the books. For each book, it displays a `BookItem` component.
- `BookItem.js` shows the title and author of a book, and links the user to the show page.
- `BookShow.js` is responsible for displaying all of the book details.
- `BookForm.js` has the new book form, a custom `handleChange`, and a POST fetch request.

## Core User Stories

Use the user stories and acceptance criteria below to guide you as you build this application. Read through all 3 parts of the user stories to get an idea of how this application will be structured.

- What data types will be used in your `schema.sql` file?
- Which attributes are required or optional?
- What routes are needed (front-end and back-end)?

### Part 1: View Your Book Wishlist

```no-highlight
As an avid book reader
I want to see a list of all books
So that I can see which books I want to read
```

Acceptance Criteria:

- I can visit the books index page at `/books`
- On the books index page there is an `h1` header to let me know this is my collection of books, of "My Book List"
- There should be a list of all book titles retrieved from the database

Implementation Details:

- You should create a `books` table with a required string of `title`, a required string of `author`, a required integer of `page_count`, an optional string of `description`, and an optional boolean of `fiction`
  - Remember to import your `schema.sql` file to create your table!
  - It would also be helpful to insert a few book records, either via the command line or by updating the provided `Seeder`.
- You will need to update the provided `Book` Model to have Postgres functionality to `findAll()` books!
- Finally, you will need to build an API endpoint for GET requests to "/api/v1/books" which serves up all books in a format that the `BooksList` component can render to the page
- Be sure to account for any errors that occur in your API endpoint!


```no-highlight
As an avid book reader
I want to view the details of a book
So that I can learn more about the book
```

Acceptance Criteria:

- On the books index page, the title of each book should be a link to that book's show page at the "/books/:id" path
- A book show page should include its title, author, description, page count, and whether or not it is fiction

Implementation Details:

- You will need to create an API endpoint for GET requests to "/api/v1/book/:id" which responds with a single book's data in a format that the `BookShow` component can render to the page

**Tips:**

- Put `debugger`s in your API endpoints to play with your model methods -- run the debug script with `yarn run dev:debug`!

### Part 2: Add New Books

```no-highlight
As an avid book reader
I want to add books to my list
So that I can read more books
```

Acceptance Criteria:

- Navigating to `/books/new` should display a form for creating a new book
- When the form is submitted successfully, I should be redirected to the book's index page and see the new book in my list
- When there are errors persisting, I will stay on my page with the form still filled out (but no errors will appear _yet_)

Implementation Details:

- Your form has been set up to send a POST request to "/api/v1/books" upon submission
- Create the corresponding API endpoint to persist the submitted form data to the database

## Non-Core User Stories

### Error Handling

```
As an avid reader
I want to know how I'm filling in my form wrong
So I can save my books without issue
```

Our form isn't super helpful if our user fails to fill in required information. Add error handling on your front-end to make sure we're making it clear which fields are required (match up with the database requirements!)

### Bonus: Reading Notes

It's great to keep track of all of our books, but it's so easy to forget what they're about!

```no-highlight
As an avid reader
I want to leave reading notes for my books
So I remember what I liked about each book
```

Acceptance Criteria:

- Visiting `/books/:id` should display the details of the book already
- Now, it should also display a form to add new reading notes
- Upon submitting this form, a POST request should be sent to `/api/v1/books/:bookId/reading-notes` and the note persisted to the database.
- A reading note should have a "date", "title", and "body"

```no-highlight
As an avid reader
I want to see my prior reading notes
So that I can pick which books to reread
```

Acceptance Criteria:

- Visiting `/books/:id` should additionally display a list of related reading notes for each book
- The "title", "date", and "body" of each reading note should be displayed on the page


**Tips:**

- What tables need to be added?
- What associations need to be built?
- What routes will be needed?
- What components will be required?
