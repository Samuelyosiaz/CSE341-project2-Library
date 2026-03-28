const { body, validationResult } = require('express-validator');

const bookValidationRules = () => {
  return [
    body('title')
      .notEmpty().withMessage('Title is required')
      .isString().withMessage('Title must be a string'),

    body('author')
      .notEmpty().withMessage('Author is required')
      .isString().withMessage('Author must be a string'),

    body('publicationYear')
      .notEmpty().withMessage('Publication year is required')
      .isInt({ min: 0 }).withMessage('Publication year must be a positive integer'),

    body('gender')
      .notEmpty().withMessage('Genre is required')
      .isString().withMessage('Genre must be a string'),

    body('editorial')
      .notEmpty().withMessage('Editorial is required')
      .isString().withMessage('Editorial must be a string'),

    body('pages')
      .notEmpty().withMessage('Pages are required')
      .isInt({ min: 1 }).withMessage('Pages must be an integer greater than 0'),

    body('available')
      .notEmpty().withMessage('Available field is required')
      .isBoolean().withMessage('Available must be a boolean (true/false)')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

module.exports = {
  bookValidationRules,
  validate,
};