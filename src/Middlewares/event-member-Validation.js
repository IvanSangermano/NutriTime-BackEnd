const { body } = require('express-validator');

const eventMemberValidations = () => {
  return [
    body('workoutEvent', 'workEvent is required').notEmpty().isString().trim(),
  ];
};

module.exports = eventMemberValidations;
