const express = require('express');
const router = express.Router();
const booksController = require('../Controllers/booksController');
const authentication = require('../middleware/auth');

// to get all
router.get('/books',authentication, booksController.getAllBook)

//to get one
router.get('/book/:id',authentication,booksController.getOneBook)

//to delete
router.delete('/book/:id',authentication,booksController.deleteBook)

//to update
router.put('/book/:id',authentication,booksController.updateBook)

//to add
router.post('/book',authentication,booksController.createBook)

module.exports = router;

