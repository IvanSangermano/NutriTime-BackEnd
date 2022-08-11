const { body } = require('express-validator');
const validationStringContainNumbers = require('../Helpers/validation-string-contain-numbers');

const routineValidations = () => {
  return [
    body('userId', 'userId is required').notEmpty().isString().trim(),
    body('exercises', 'Exercises is required').isArray(),
  ];
};

module.exports = routineValidations;
