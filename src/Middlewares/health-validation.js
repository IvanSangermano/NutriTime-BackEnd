const { body } = require('express-validator');
const validationStringContainNumbers = require('../Helpers/validation-string-contain-numbers');

const validations = () => {
  return [
    body('user', 'User is required').notEmpty().isString().trim(),
    body('height', 'Height is required').notEmpty().isString().trim().custom(validationStringContainNumbers),
    body('weight', 'Weight is required')
      .notEmpty()
      .isString()
      .trim()
      .custom(validationStringContainNumbers),
    body('age', 'Age is required')
      .notEmpty()
      .isString()
      .trim()
      .custom(validationStringContainNumbers),
    body('sex', 'Sex is required').notEmpty().isString().trim()
  ];
};

module.exports = validations;