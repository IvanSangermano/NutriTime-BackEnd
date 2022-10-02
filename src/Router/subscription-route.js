const { query, param } = require('express-validator');
const { Router } = require('express');
const {
  getSubscriptions,
  getSubscription,
  postSubscription,
  putSubscription,
  deleteSubscription,
} = require('../Controller/subscription-controller');
const subscriptionValidations = require('../Middlewares/subscription-validation');
const fieldValidation = require('../Middlewares/field-validation');
const isLoggedIn = require('../Middlewares/is-logged-in');
const router = Router();

router.get(
  '/',
  [
    query('userId').optional().isMongoId().trim(),
    fieldValidation,
  ],
  getSubscriptions
);

router.get('/:id', [param('id').isMongoId(), fieldValidation], getSubscription);

router.post(
  '/',
  [subscriptionValidations(), fieldValidation],
  isLoggedIn,
  postSubscription
);

router.put(
  '/:id',
  [param('id').isMongoId(), subscriptionValidations(), fieldValidation],
  isLoggedIn,
  putSubscription
);

router.delete(
  '/:id',
  [param('id').isMongoId(), fieldValidation],
  isLoggedIn,
  deleteSubscription
);

module.exports = router;
