import express from "express";

import Book from "../../../models/Book.js";

const booksRouter = new express.Router();

booksRouter.get("/", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json({ books: books });
  } catch (error) {
    console.log(error);
    res.json({ errors: error });
  }
});

booksRouter.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json({ book: book });
  } catch (error) {
    console.log(error);
    res.json({ errors: error });
  }
});

booksRouter.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const book = new Book(req.body);
    book.save();
    res.json({ book: book });

  } catch (error) {
    console.log(error);
    res.json({ errors: error });
  }
});

export default booksRouter;