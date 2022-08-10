const { query, param } = require('express-validator');
const { Router } = require('express');
const {
  getHealths,
  getHealth,
  postHealth,
  putHealth,
  deleteHealth,
} = require('../Controller/health-controller');
const validationsHealth = require('../Middlewares/health-validation');
const fieldValidation = require('../Middlewares/field-validation');
const isLoggedIn = require('../Middlewares/is-logged-in');
const router = Router();

router.get(
  '/',
  [
    query('userId').optional().isMongoId().trim(),
    query('day').optional().isString().trim(),
    fieldValidation,
  ],
  getHealths
);

router.get('/:id', [param('id').isMongoId(), fieldValidation], getHealth);

router.post('/', [validationsHealth, fieldValidation], isLoggedIn, postHealth);

router.put(
  '/:id',
  [param('id').isMongoId(), validationsHealth(), fieldValidation],
  isLoggedIn,
  putHealth
);

router.delete(
  '/:id',
  [param('id').isMongoId(), fieldValidation],
  isLoggedIn,
  deleteHealth
);

module.exports = router;
