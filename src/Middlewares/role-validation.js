const { body, param } = require('express-validator');

const postValidations = () => {
  return [
    body('name', 'Name is required').notEmpty().isString().trim(),
    body('arrayPermision', 'Array permission is required').notEmpty().isMongoId()
  ];
};

module.exports = postValidations;