const { body } = require('express-validator');

const postValidations = () => {
  return [
    body('userId', 'User ID is required').notEmpty().isString().trim(),
    body('date', 'Date is required').notEmpty().isString().trim(),
    body('description', 'Description is required').notEmpty().isString().trim(),
    body('type', 'Type is required').notEmpty().isString().trim()
  ];
};

module.exports = postValidations;