const { body } = require('express-validator');
const validationStringContainNumbers = require('../Helpers/validation-string-contain-numbers');

const workoutEventValidations = () => {
  return [
    body('name', 'Name is required').notEmpty().isString().trim(),
    body('places', 'Places is required').notEmpty().isString().trim().custom(validationStringContainNumbers),
    body('duration', 'Duration is required').notEmpty().isString().trim(),
    body('location', 'Location is required').notEmpty().isString().trim(),
    body('classroom', 'Classroom is required').notEmpty().isInt(),
    body('day', 'Day is required').notEmpty().isString(),
    body('hour', 'Hour is required').notEmpty().isString()
  ];
};

module.exports = workoutEventValidations;
