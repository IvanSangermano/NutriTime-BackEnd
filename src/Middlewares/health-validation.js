const { body , oneOf} = require('express-validator');
const validationStringContainNumbers = require('../Helpers/validation-string-contain-numbers');
const validationStringContainNumbersAndComma = require('../Helpers/validationStringContainNumbersAndComma')

const healthValidations = () => {
  return [
    body('userId._id', 'User is required').notEmpty().isString().trim(),
    body('height', 'Height is required').notEmpty().isString().trim().custom(validationStringContainNumbersAndComma),
    body('weight', 'Weight is required')
      .notEmpty()
      .isString()
      .trim()
      .custom(validationStringContainNumbersAndComma),
    body('age', 'Age is required')
      .notEmpty()
      .isString()
      .trim()
      .custom(validationStringContainNumbers),
    body('sex', 'Sex is required').notEmpty().isString().trim(),
    body('day', 'Day is required').notEmpty().isString(),
    oneOf([
      body('macroCheck').equals('false').isBoolean(),
      body('stage', 'Stage is required').isString(),
      body('activity', 'Activity is required').custom(validationStringContainNumbersAndComma)
    ],
    [
      body('macroCheck').equals('true').isBoolean(),
    ])
  ];
};

module.exports = healthValidations;