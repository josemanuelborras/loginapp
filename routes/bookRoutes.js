'use strict'

const express = require('express');
const BookController = require('../controllers/booksController.js');

const api = express.Router();

const md_auth = require('../middlewares/authetication');

api.post('/newBook', md_auth.ensureAuth, BookController.createBook);

api.get('/books', md_auth.ensureAuth, BookController.getAllBooks);

api.get('/book/:id?', md_auth.ensureAuth, BookController.getBookById);

api.patch('/bookUpdate/:id', md_auth.ensureAuth, BookController.updateBook);

api.delete('/bookDelete/:id', md_auth.ensureAuth, BookController.deleteBook);

module.exports = api;