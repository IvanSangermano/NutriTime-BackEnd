const { query, param } = require('express-validator');
const { Router } = require('express');
const {
  getRoutine,
  getRoutines,
  postExercise,
  putRoutine,
  deleteRoutine,
} = require('../Controller/routine-controller');
const routineValidations = require('../Middlewares/routine-validation');
const fieldValidation = require('../Middlewares/field-validation');
const isLoggedIn = require('../Middlewares/is-logged-in');
const router = Router();

router.get(
  '/',
  [query('userId').optional().isMongoId().trim(), fieldValidation],
  getRoutines
);

router.get('/:id', [param('id').isMongoId(), fieldValidation], getRoutine);

router.post(
  '/',
  [routineValidations, fieldValidation],
  isLoggedIn,
  postExercise
);

router.put(
  '/:id',
  [param('id').isMongoId(), routineValidations(), fieldValidation],
  isLoggedIn,
  putRoutine
);

router.delete(
  '/:id',
  [param('id').isMongoId(), fieldValidation],
  isLoggedIn,
  deleteRoutine
);

module.exports = router;
