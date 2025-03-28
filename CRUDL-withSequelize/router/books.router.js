const express = require("express");
const booksRouter = express.Router();
const { asyncHandler } = require("../globalHandler/globalTryCatch");
const authenticate = require("../middleware/authenticate");
const {
  getBooks,
  getBook,
  deleteBook,
  addBook,
  editBook,
  editBookData,
} = require("../controllers/books.controller");

booksRouter.get("/", authenticate, asyncHandler(getBooks));
booksRouter.post("/", authenticate, asyncHandler(addBook));
booksRouter.get("/:id", authenticate, asyncHandler(getBook));
booksRouter.delete("/:id", authenticate, asyncHandler(deleteBook));
booksRouter.put("/:id", authenticate, asyncHandler(editBook));
booksRouter.patch("/:id", authenticate, asyncHandler(editBookData));
module.exports = booksRouter;
