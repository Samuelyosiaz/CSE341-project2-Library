const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const { bookValidationRules, validate } = require('../utilities/booksValidator.js')

router.get('/', booksController.getAll);

router.get('/:id', booksController.getSingle);

router.post('/', bookValidationRules(), validate, booksController.createBook);

router.put('/:id', bookValidationRules(), validate, booksController.updateBook);

router.delete('/:id', booksController.deleteBook);

module.exports = router;