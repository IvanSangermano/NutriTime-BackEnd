const { query, param } = require('express-validator');
const { Router } = require('express');
const {
  getRoles,
  getRole,
  postRole,
  putRole,
  deleteRole,
} = require('../Controller/role-controller');
const roleValidations = require('../Middlewares/role-validation');
const fieldValidation = require('../Middlewares/field-validation');
const isLoggedIn = require('../Middlewares/is-logged-in');
const router = Router();

router.get(
  '/',
  [
    query('name').isString().trim(),
  ],
  getRoles
);

router.get('/:id', [param('id').isMongoId(), fieldValidation], getRole);

router.post('/', [roleValidations(), fieldValidation], isLoggedIn, postRole);

router.put(
  '/:id',
  [param('id').isMongoId(), roleValidations(), fieldValidation],
  isLoggedIn,
  putRole
);

router.delete(
  '/:id',
  [param('id').isMongoId(), fieldValidation],
  isLoggedIn,
  deleteRole
);

module.exports = router;
