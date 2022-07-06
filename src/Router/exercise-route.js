const { query, param } = require('express-validator');
const { Router } = require('express');
const {
  getExercise,
  getExercises,
  postExercise,
  putExercise,
  deleteExercise,
} = require('../Controller/exercise-controller');
const exerciseValidations = require('../Middlewares/exercise-validation');
const fieldValidation = require('../Middlewares/field-validation');
const isLoggedIn = require('../Middlewares/is-logged-in');
const router = Router();

router.get(
  '/',
  [
    query('name').isString().trim(),
    query('duration').isString().trim(),
    query('set').isString().trim(),
  ],
  getExercises
);

router.get('/:id', [param('id').isMongoId(), fieldValidation], getExercise);

router.post(
  '/',
  [...exerciseValidations(), fieldValidation],
  isLoggedIn,
  postExercise
);

router.put(
  '/:id',
  [param('id').isMongoId(), ...exerciseValidations(), fieldValidation],
  isLoggedIn,
  putExercise
);

router.delete(
  '/:id',
  [param('id').isMongoId(), fieldValidation],
  isLoggedIn,
  deleteExercise
);

module.exports = router;
