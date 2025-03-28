const express = require("express");
const booksRouter = express.Router();
const asyncHandler = require("../globalHandler/globalTryCatch");
const {
  getBooks,
  getBook,
  deleteBook,
  addBook,
  editBook,
  editBookData,
} = require("../controller/books.controller");

// ("/books/")
booksRouter.get("/", asyncHandler(getBooks));
booksRouter.post("/", asyncHandler(addBook));
booksRouter.get("/:id", asyncHandler(getBook));
booksRouter.delete("/:id", asyncHandler(deleteBook));
booksRouter.put("/:id", asyncHandler(editBook));
booksRouter.patch("/:id", asyncHandler(editBookData));

module.exports = booksRouter;
