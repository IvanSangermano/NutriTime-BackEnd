const { query, param } = require('express-validator');
const { Router } = require('express');
const {
  getHealths,
  getHealth,
  postHealth,
  putHealth,
  deleteHealth,
} = require('../Controller/health-controller');
const healthValidations = require('../Middlewares/health-validation');
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

<<<<<<< HEAD
router.post(
  '/',
  [healthValidations(), fieldValidation],
  isLoggedIn,
  postHealth
);
=======
router.post('/',  [healthValidations(), fieldValidation], isLoggedIn, postHealth);
>>>>>>> 645c5cf7ecc87674794e467b07aa39faa6b1705d

router.put(
  '/:id',
  [param('id').isMongoId(), healthValidations(), fieldValidation],
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
