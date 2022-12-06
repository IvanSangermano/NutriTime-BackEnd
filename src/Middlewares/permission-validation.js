const { body } = require('express-validator');

const permissionValidations = () => {
  return [
    body('role').notEmpty().isString().trim(),
    body('users').isBoolean(),
    body('permissions').isBoolean(),
    body('exercises').isBoolean(),
    body('routinesAction').isBoolean(),
    body('routinesView').isBoolean(),
    body('healthsAction').isBoolean(),
    body('healthsView').isBoolean(),
    body('subscriptions').isBoolean(),
    body('lessons').isBoolean(),
    body('workout').isBoolean()
  ];
};

module.exports = permissionValidations;