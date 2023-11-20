const Book = require("../models/Book");
const User = require("../models/User");
// get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    if (!books || books.length === 0) {
      return res.status(404).send({ message: "Books not found" });
    }
    res.status(200).json({
      Books: books,
    });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

// // Task 2: Get the books based on ISBN
const getBooksBasedOnISBN = async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const book = await Book.findOne({ isbn });

    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.status(201).json({
      book,
    });
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

// // Task 3: Get all books by Author
const getAllBooksByAuthor = async (req, res) => {
  try {
    const { author } = req.body;
    console.log(author);
    const books = await Book.find({ author });
    res.json(books);
  } catch (error) {
    console.error("Error fetching books by author:", error);
    res.status(500).send("Internal Server Error");
  }
};

// // Task 4: Get all books based on Title
const getAllBooksBasedOnTitle = async (req, res) => {
  try {
    const { title } = req.body;
    const books = await Book.find({ title });
    res.json(books);
  } catch (error) {
    console.error("Error fetching books by title:", error);
    res.status(500).send("Internal Server Error");
  }
};

// // Task 5: Get book Review
const getBookReview = async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const book = await Book.findOne({ isbn });

    if (!book) {
      return res.status(404).send("Book not found");
    }

    res.json(book.reviews);
  } catch (error) {
    console.error("Error fetching book reviews:", error);
    res.status(500).send("Internal Server Error");
  }
};

// // Task 8: Add/Modify a book review
const modifyBookReview = async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const userId = req.session.userAuth;
    const user = await User.findById(userId);

    const { review } = req.body;

    const book = await Book.findOneAndUpdate(
      { isbn },
      { $push: { reviews: { user: user.username, review } } },
      { new: true }
    );

    if (!book) {
      return res.status(404).send("Book not found");
    }

    res.json(book.reviews);
  } catch (error) {
    console.error("Error modifying book review:", error);
    res.status(500).send("Internal Server Error");
  }
};

// // Task 9: Delete book review added by that particular user
const deleteBookReview = async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const userId = req.session.userAuth;
    const user = await User.findById(userId);

    const book = await Book.findOneAndUpdate(
      { isbn },
      { $pull: { reviews: { user: user.username } } },
      { new: true, projection: { reviews: 1 } }
    );

    if (!book) {
      return res.status(404).send("Book not found");
    }

    res.json(book.reviews);
  } catch (error) {
    console.error("Error deleting book review:", error);
    res.status(500).send("Internal Server Error");
  }
};

const addBooks = async (req, res) => {
  const sampleBooks = [
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      isbn: "978-0-316-76948-0",
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "978-0-06-112008-4",
    },
    {
      title: "1984",
      author: "George Orwell",
      isbn: "978-0-452-28423-4",
    },
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0-7432-7356-5",
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      isbn: "978-1-85326-000-3",
    },
  ];

  try {
    const addedBooks = await Book.insertMany(sampleBooks);
    res.status(201).json(addedBooks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getAllBooks,
  getBooksBasedOnISBN,
  getAllBooksByAuthor,
  getAllBooksBasedOnTitle,
  getBookReview,
  modifyBookReview,
  deleteBookReview,
  addBooks,
};
