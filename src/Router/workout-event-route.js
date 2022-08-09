const { query, param } = require('express-validator');
const { Router } = require('express');
const {
  getWorkoutEvent,
  getWorkoutEvents,
  putWorkoutEvent,
  postWorkoutEvent,
  deleteWorkoutEvent,
} = require('../Controller/workout-event-controller');
const workoutEventValidations = require('../Middlewares/workout-event-validation');
const fieldValidation = require('../Middlewares/field-validation');
const isLoggedIn = require('../Middlewares/is-logged-in');
const router = Router();

router.get(
  '/',
  [
    query('name').isString().trim(),
    query('places').isString().trim(),
    query('duration').isString().trim(),
    query('members').isString().trim(),
    query('theme').isString().trim(),
  ],
  getWorkoutEvents
);

router.get('/:id', [param('id').isMongoId(), fieldValidation], getWorkoutEvent);

router.post(
  '/',
  [...workoutEventValidations(), fieldValidation],
  isLoggedIn,
  postWorkoutEvent
);

router.put(
  '/:id',
  [param('id').isMongoId(), ...workoutEventValidations(), fieldValidation],
  isLoggedIn,
  putWorkoutEvent
);

router.delete(
  '/:id',
  [param('id').isMongoId(), fieldValidation],
  isLoggedIn,
  deleteWorkoutEvent
);

module.exports = router;
