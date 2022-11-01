const { query, param } = require('express-validator');
const { Router } = require('express');
const {
  getExerciseRoutine,
  getExerciseRoutines,
  postExerciseRoutine,
  putExerciseRoutine,
  deleteExerciseRoutine,
} = require('../Controller/exercise-routine-controller');
const exerciseRoutineValidations = require('../Middlewares/exercise-routine-validation');
const fieldValidation = require('../Middlewares/field-validation');
const isLoggedIn = require('../Middlewares/is-logged-in');
const router = Router();

router.get(
  '/',
  [
    query('routineId').optional().isMongoId(), 
    fieldValidation
  ],
  getExerciseRoutines
);

router.get(
  '/:id',
  [param('id').isMongoId(), fieldValidation],
  getExerciseRoutine
);

router.post(
  '/',
  [exerciseRoutineValidations(), fieldValidation],
  isLoggedIn,
  postExerciseRoutine
);

router.put(
  '/:id',
  [param('id').isMongoId(), exerciseRoutineValidations(), fieldValidation],
  isLoggedIn,
  putExerciseRoutine
);

router.delete(
  '/:id',
  [param('id').isMongoId(), fieldValidation],
  isLoggedIn,
  deleteExerciseRoutine
);

module.exports = router;
