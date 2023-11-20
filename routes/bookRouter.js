const express = require("express");
const bookRouter = express.Router();
const {
  getAllBooks,
  getBooksBasedOnISBN,
  getAllBooksByAuthor,
  getAllBooksBasedOnTitle,
  getBookReview,
  modifyBookReview,
  deleteBookReview,
  addBooks,
} = require("../controller/bookController");
const protected = require("../middlewares/protected");

bookRouter.post("/author", getAllBooksByAuthor);
bookRouter.post("/title", getAllBooksBasedOnTitle);
bookRouter.post("/add-books", addBooks);
bookRouter.get("/:isbn", getBooksBasedOnISBN);
bookRouter.get("/review/:isbn", getBookReview);
bookRouter.post("/review/:isbn", protected, modifyBookReview);
bookRouter.delete("/review/:isbn", protected, deleteBookReview);
bookRouter.get("/", getAllBooks);

module.exports = bookRouter;
