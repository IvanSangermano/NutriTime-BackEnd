const { query, param } = require('express-validator');
const { Router } = require('express');
const {
  getPosts,
  getPost,
  postPost,
  putPost,
  deletePost,
} = require('../Controller/post-controller');
const postValidations = require('../Middlewares/post-validation');
const fieldValidation = require('../Middlewares/field-validation');
const isLoggedIn = require('../Middlewares/is-logged-in');
const router = Router();

router.get(
  '/',
  [
    query('userId').isString().trim(),
  ],
  getPosts
);

router.get('/:id', [param('id').isMongoId(), fieldValidation], getPost);

router.post('/', [postValidations(), fieldValidation], isLoggedIn, postPost);

router.put(
  '/:id',
  [param('id').isMongoId(), postValidations(), fieldValidation],
  isLoggedIn,
  putPost
);

router.delete(
  '/:id',
  [param('id').isMongoId(), fieldValidation],
  isLoggedIn,
  deletePost
);

module.exports = router;
