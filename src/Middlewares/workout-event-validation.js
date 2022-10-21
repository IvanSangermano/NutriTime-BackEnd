const { body } = require('express-validator');
const validationStringContainNumbers = require('../Helpers/validation-string-contain-numbers');

const workoutEventValidations = () => {
  return [
    body('name', 'Name is required').notEmpty().isString().trim(),
    body('places', 'Places is required').notEmpty().isString().trim().custom(validationStringContainNumbers),
    body('location', 'Location is required').notEmpty().isString().trim(),
    body('day', 'Day is required').notEmpty().isString(),
    body('startHour', 'Start hour is required').notEmpty().isString(),
    body('finalHour', 'Final hour is required').notEmpty().isString().trim(),
    body('classroom', 'Classroom is required').notEmpty().isInt(),
    body('placesOccupied', 'Places occupied is required').notEmpty().isInt(),
  ];
};

module.exports = workoutEventValidations;
