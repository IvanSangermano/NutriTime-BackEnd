const { query, param } = require('express-validator');
const { Router } = require('express');
const {
  getUsers,
  getUser,
  postUser,
  putUser,
  deleteUser,
  login,
} = require('../Controller/user-controller');
const validations = require('../Middlewares/user-validation');
const loginValidations = require('../Middlewares/login-validation');
const fieldValidation = require('../Middlewares/field-validation');
const isLoggedIn = require('../Middlewares/is-logged-in');
const router = Router();

router.get(
  '/',
  [
    query('name').isString().trim(),
    query('lastName').isString().trim(),
    query('phone').isString().trim(),
    query('dni').isString().trim(),
    query('status').isBoolean()
  ],
  getUsers
);

router.get('/:id', [param('id').isMongoId(), fieldValidation], getUser);

router.post('/',[...validations(), fieldValidation], isLoggedIn, postUser);

router.put(
  '/:id',
  [param('id').isMongoId(), ...validations(), fieldValidation],
  isLoggedIn,
  putUser
);

router.delete(
  '/:id',
  [param('id').isMongoId(), fieldValidation],
  isLoggedIn,
  deleteUser
);

router.post('/login', [...loginValidations(), fieldValidation], login);

module.exports = router;
