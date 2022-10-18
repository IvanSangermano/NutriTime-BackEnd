const { body } = require('express-validator');

const eventMemberValidations = () => {
  return [
    body('workoutEvent', 'workEvent is required').notEmpty().isMongoId().trim(),
    body('userId', 'User is required').notEmpty().isMongoId().trim()
  ];
};

module.exports = eventMemberValidations;
