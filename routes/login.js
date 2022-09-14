const router = require('express').Router();

const { loginValidate, userSchemaValidate } = require('../utils/celebrate/celebrate');

const {
  login,
  createUser,
} = require('../controllers/users');

router.post('/signin', loginValidate, login);
router.post('/signup', userSchemaValidate, createUser);

module.exports = router;
