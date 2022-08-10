const { param } = require('express-validator');
const { Router } = require('express');
const {
  getPermission,
  postPermission,
  putPermission,
  deletePermission,
} = require('../Controller/permission-controller');
const validationsPermission = require('../Middlewares/permission-validation');
const fieldValidation = require('../Middlewares/field-validation');
const isLoggedIn = require('../Middlewares/is-logged-in');
const router = Router();

router.get('/:id', [param('id').isMongoId(), fieldValidation], getPermission);

router.post('/',  [validationsPermission(), fieldValidation], isLoggedIn, postPermission);

router.put(
  '/:id',
  [param('id').isMongoId(), validationsPermission(), fieldValidation],
  isLoggedIn,
  putPermission
);

router.delete(
  '/:id',
  [param('id').isMongoId(), fieldValidation],
  isLoggedIn,
  deletePermission
);

module.exports = router;