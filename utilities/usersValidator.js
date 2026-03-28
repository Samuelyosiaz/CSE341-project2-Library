const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    body('firstName')
      .notEmpty().withMessage('First name is required')
      .isString().withMessage('First name must be a string'),

    body('lastName')
      .notEmpty().withMessage('Last name is required')
      .isString().withMessage('Last name must be a string'),

    body('email')
      .notEmpty().withMessage('Email is required')
      .isEmail().withMessage('Email must be a valid email address'),

    body('borrowedBooks')
      .isArray().withMessage('BorrowedBooks must be an array')
      .custom((arr) => {
        if (!Array.isArray(arr)) {
          throw new Error('BorrowedBooks must be an array');
        }
        return true;
      })
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
  userValidationRules,
  validate,
};