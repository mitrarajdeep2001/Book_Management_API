const Book = require("../Database/Model/book");
const User = require("../Database/Model/user");

// Create a new book
async function createBook(req, res) {
  const { title, author, publicationYear, userId } = req.body;
  try {
    // Create a new book document
    const newBook = new Book({ title, author, publicationYear, userId });
    await newBook.save();

    // Update the user's bookId array to include the newly created book
    await User.findByIdAndUpdate(
      userId,
      { $push: { bookId: newBook._id } },
      { new: true }
    );

    res.status(201).json({ newBook, message: "Book created successfully" });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get all books with optional filters
async function getAllBooks(req, res) {
  const { author, publicationYear } = req.query;
  const filter = {};

  if (author) {
    filter.author = author;
  }

  if (publicationYear) {
    filter.publicationYear = publicationYear;
  }

  try {
    const books = await Book.find(filter);
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get book by ID
async function getBookById(req, res) {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    console.error("Error fetching book by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Get all books by specific user
async function getBooksByUser(req, res) {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).select('-password').populate("bookId");
    res.json(user);
  } catch (error) {
    console.error("Error fetching book by specific user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


// Update book by ID
async function updateBookById(req, res) {
  const { id } = req.params;
  const { title, author, publicationYear } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, publicationYear },
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ updatedBook, message: "Book updated successfully" });
  } catch (error) {
    console.error("Error updating book by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Delete book by ID
async function deleteBookById(req, res) {
  const { id } = req.params;

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  getBooksByUser,
  updateBookById,
  deleteBookById,
};
