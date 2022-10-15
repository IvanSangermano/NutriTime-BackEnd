const { body } = require('express-validator');
const validationStringContainNumbers = require('../Helpers/validation-string-contain-numbers');

const exerciseRoutineValidations = () => {
  return [
    body('routineId', 'Routine ID is required').notEmpty().isString().trim(),
    body('breakDuration', 'Break Duration is required')
      .notEmpty()
      .isString()
      .trim()
      .custom(validationStringContainNumbers),
    body('duration', 'Duration is required')
      .notEmpty()
      .isString()
      .trim()
      .custom(validationStringContainNumbers),
    body('exercise', 'Exercise is Required').isArray(),
  ];
};

module.exports = exerciseRoutineValidations;
