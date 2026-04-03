const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const { userValidationRules, validate } = require('../utilities/usersValidator.js');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', isAuthenticated, userValidationRules(), validate, usersController.createUser);

router.put('/:id', isAuthenticated, userValidationRules(), validate, usersController.updateUser);

router.delete('/:id', isAuthenticated, usersController.deleteUser);

module.exports = router;