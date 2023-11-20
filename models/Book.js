const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  isbn: String,
  reviews: [{ user: String, review: String }],
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
