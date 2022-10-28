const { body } = require('express-validator');
const validationStringContainNumbers = require('../Helpers/validation-string-contain-numbers');

const routineValidations = () => {
  return [
    body('userId', 'userId is required').notEmpty().isString().trim(),
    body('exerciseRoutineId', 'Exercise routine ID is required').notEmpty().isString().trim(),
    body('position', 'Position is required').notEmpty().isInt(),
  ];
};

module.exports = routineValidations;
