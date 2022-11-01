const { body } = require('express-validator');

const exerciseRoutineValidations = () => {
  return [
    body('routineId', 'Routine ID is required')
      .notEmpty()
      .isMongoId(),
    body('breakDuration', 'Break Duration is required')
      .notEmpty()
      .isString()
      .trim(),
    body('duration', 'Duration is required')
      .notEmpty()
      .isString()
      .trim(),
    body('exerciseId', 'Exercise ID is Required')
    .notEmpty()
    .isString()
    .trim(),
    body('day', 'Day is Required')
    .notEmpty()
    .isString().trim(),
    body('position', 'Position is Required')
    .notEmpty()
    .isInt(),
  ];
};

module.exports = exerciseRoutineValidations;
