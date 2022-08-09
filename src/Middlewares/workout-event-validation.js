const { body } = require('express-validator');
const validationStringContainNumbers = require('../Helpers/validation-string-contain-numbers');

const workoutEventValidations = () => {
  return [
    body('name', 'Name is required').notEmpty().isString().trim(),
    body('places', 'Places is required')
      .notEmpty()
      .isString()
      .trim()
      .custom(validationStringContainNumbers),
    body('duration', 'Duration is required')
      .notEmpty()
      .isString()
      .trim()
      .custom(validationStringContainNumbers),
    body('location', 'Location is required').notEmpty().isString().trim(),
    body('theme', 'Theme is required').notEmpty().trim(),
    body('members', 'Members is required').isArray(),
  ];
};

module.exports = workoutEventValidations;
