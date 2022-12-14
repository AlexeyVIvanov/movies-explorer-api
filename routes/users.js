const router = require('express').Router();

const { profileSchemaValidate } = require('../utils/celebrate/celebrate');

const {
  getUsersMe,
  updateProfile,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/users/me', getUsersMe);
// обновляет информацию о пользователе (email и имя)
router.patch('/users/me', profileSchemaValidate, updateProfile);

module.exports = router;
