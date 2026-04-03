const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const { bookValidationRules, validate } = require('../utilities/booksValidator.js')
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', booksController.getAll);

router.get('/:id', booksController.getSingle);

router.post('/', isAuthenticated, bookValidationRules(), validate, booksController.createBook);

router.put('/:id', isAuthenticated, bookValidationRules(), validate, booksController.updateBook);

router.delete('/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;