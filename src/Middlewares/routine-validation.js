const { body } = require('express-validator');
const validationStringContainNumbers = require('../Helpers/validation-string-contain-numbers');

const routineValidations = () => {
  return [
    body('userId', 'userId is required').notEmpty().isString().trim(),
    body('breakDuration', 'break Duration is required')
      .notEmpty()
      .isString()
      .trim()
      .custom(validationStringContainNumbers),
    body('exercisesDuration', 'exercises Duration is required')
      .notEmpty()
      .isString()
      .trim()
      .custom(validationStringContainNumbers),
    body('exercises', 'Exercises is required').notEmpty().isString().trim(),
  ];
};

module.exports = routineValidations;
