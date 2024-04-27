const express = require('express');
const router = express.Router();
const {
    createBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById,
    getBooksByUser
} = require('../Controllers/book');

// Create a new book
router.post('/create', createBook);

// Get all books
router.get('/get', getAllBooks);

// Get book by ID
router.get('/get/:id', getBookById);

// Get book by specific user
router.get('/getUserCollection', getBooksByUser);

// Update book by ID
router.put('/update/:id', updateBookById);

// Delete book by ID
router.delete('/delete/:id', deleteBookById);

module.exports = router;
