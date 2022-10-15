const { body , oneOf} = require('express-validator');
const validationStringContainNumbers = require('../Helpers/validation-string-contain-numbers');

const subscriptionValidations = () => {
  return [
    body('userId._id', 'User is required').notEmpty().isString().trim(),
    body('dayOfSubscription', 'Day of subscription is required').notEmpty().isString(),
    body('dayOfExpiration', 'Day of expiration is required').notEmpty().isString(),
    body('typeOfSubscription', 'Type of subscription is required').custom(validationStringContainNumbers)
  ];
};

module.exports = subscriptionValidations;