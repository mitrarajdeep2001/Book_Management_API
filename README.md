# Book Management API Documentation

This API allows users to manage books, including CRUD operations for books, user authentication, and filtering books by author or publication year.

## Technologies Used
* Node.js
* Express.js
* MongoDB (with Mongoose)

## Installation  
1. Clone the repository:
   git clone https://github.com/mitrarajdeep2001/Book_Management_API.git
2. Install dependencies:
   npm install
3. Set up .env file for MongoDB username & password and also for the JWT secrete key

## API Usage
 ### Authentication
   * **Signup**: Use the /auth/signup endpoint to register a new user.
   * **Login**: Use the /auth/login endpoint to login with existing credentials.

  ### Book Management
   * **Create Book**: Use the /book/create endpoint to create a new book.
   * **Get All Books**: Use the /book/get endpoint to fetch all books. Also use /book/get?author=name or /book/get?publicationYear=year in order to filter by author or publicationYear.
   * **Get Book by ID**: Use the /book/get/:id endpoint to fetch a book by its ID.
   * **Get Books by User**: Use the /book/getUserCollection endpoint to fetch all books created by a specific user.
   * **Update Book**: Use the /book/update/:id endpoint to update a book by its ID.
   * **Delete Book**: Use the /book/delete/:id endpoint to delete a book by its ID.

