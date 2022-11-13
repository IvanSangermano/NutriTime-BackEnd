const { query, param } = require('express-validator');
const { Router } = require('express');
const {
  getValorations,
  getValoration,
  postValoration,
  putValoration,
  deleteValoration,
} = require('../Controller/valoration-controller');
const valorationValidations = require('../Middlewares/valoration-Validation');
const fieldValidation = require('../Middlewares/field-validation');
const isLoggedIn = require('../Middlewares/is-logged-in');
const router = Router();

router.get(
  '/',
  [
    query('userId').isString().trim(),
    query('postId').isString().trim(),
  ],
  getValorations
);

router.get('/:id', [param('id').isMongoId(), fieldValidation], getValoration);

router.post('/', [valorationValidations(), fieldValidation], isLoggedIn, postValoration);

router.put(
  '/:id',
  [param('id').isMongoId(), valorationValidations(), fieldValidation],
  isLoggedIn,
  putValoration
);

router.delete(
  '/:id',
  [param('id').isMongoId(), fieldValidation],
  isLoggedIn,
  deleteValoration
);

module.exports = router;