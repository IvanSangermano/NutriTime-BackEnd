const { body } = require('express-validator');
const validationStringContainNumbers = require('../Helpers/validation-string-contain-numbers');

const healthValidations = () => {
  return [
    body('userId', 'User is required').notEmpty().isString().trim(),
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

module.exports = healthValidations;