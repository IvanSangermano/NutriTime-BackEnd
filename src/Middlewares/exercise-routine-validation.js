const { body } = require('express-validator');

const exerciseRoutineValidations = () => {
  return [
    body('breakDuration', 'Break Duration is required')
      .notEmpty()
      .isString()
      .trim(),
    body('duration', 'Duration is required')
      .notEmpty()
      .isString()
      .trim(),
    body('exerciseId', 'exercise ID is Required').notEmpty().isString().trim(),
  ];
};

module.exports = exerciseRoutineValidations;
