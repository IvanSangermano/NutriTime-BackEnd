const { body } = require('express-validator');
const validationStringContainNumbers = require('../Helpers/validation-string-contain-numbers');

const exerciseValidations = () => {
  return [
    body('name', 'Name is required').notEmpty().isString().trim(),
    body('duration', 'Duration is required')
      .notEmpty()
      .isString()
      .trim()
      .custom(validationStringContainNumbers),
    body('set', 'Set is required')
      .notEmpty()
      .isString()
      .trim()
      .custom(validationStringContainNumbers),
  ];
};

module.exports = exerciseValidations;
