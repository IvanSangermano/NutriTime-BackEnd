const { body } = require('express-validator');

const valorationValidations = () => {
  return [
    body('userId', 'User ID is required').notEmpty().isString().trim(),
    body('postId', 'Post ID is required').notEmpty().isString().trim(),
    body('valoration', 'Valoration is required').notEmpty().isInt().trim(),
  ];
};

module.exports = valorationValidations;