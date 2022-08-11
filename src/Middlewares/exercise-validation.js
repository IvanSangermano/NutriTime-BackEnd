const { body } = require('express-validator');

const exerciseValidations = () => {
  return [
    body('name', 'Name is required').notEmpty().isString().trim(),
    body('area', 'Area is required').notEmpty().isString().trim(),
    body('expecifyMuscle', 'Expecify Muscle is required')
      .notEmpty()
      .isString()
      .trim(),
  ];
};

module.exports = exerciseValidations;
