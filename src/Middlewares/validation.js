const { body } = require('express-validator');
const validationStringContainNumbers = require('../Helpers/validationStringContainNumbers');

const validations = () => {
  return [
    body('name', 'Name is required').notEmpty().isString().trim(),
    body('lastName', 'Last name is required').notEmpty().isString().trim(),
    body('phone', 'Telephone is required')
      .notEmpty()
      .isString()
      .trim()
      .custom(validationStringContainNumbers),
    body('dni', 'Dni is required')
      .notEmpty()
      .isString()
      .trim()
      .custom(validationStringContainNumbers),
    body('email', 'Email is required').notEmpty().isEmail().trim(),
    body('password', 'Password is required').notEmpty().isString().trim(),
  ];
};

module.exports = validations;
