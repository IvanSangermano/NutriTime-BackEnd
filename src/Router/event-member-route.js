const { query, param } = require('express-validator');
const { Router } = require('express');
const {
  getEventMember,
  getEventMembers,
  postEventMember,
  putEventMember,
  deleteEventMember,
} = require('../Controller/event-member-controller');
const eventMemberValidations = require('../Middlewares/event-member-Validation');
const fieldValidation = require('../Middlewares/field-validation');
const isLoggedIn = require('../Middlewares/is-logged-in');
const router = Router();

router.get('/', [query('workoutEvent').isString().trim()], getEventMembers);

router.get('/:id', [param('id').isMongoId(), fieldValidation], getEventMember);

router.post(
  '/',
  [...eventMemberValidations(), fieldValidation],
  isLoggedIn,
  postEventMember
);

router.delete(
  '/:id',
  [param('id').isMongoId(), fieldValidation],
  isLoggedIn,
  deleteEventMember
);

module.exports = router;
