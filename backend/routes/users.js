const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urldRegEx } = require('../utils/constants');
const {
  getUsers, getUserById, getCurrentUser, updateProfile, updateAvatar,
} = require('../controllers/users');

// Валидация обновления профиля
const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

// Валидация обновления аватара
const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urldRegEx),
  }),
});

// Валидация id пользователя
const idValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24),
  }),
});

// Возвращаю всех пользователей
router.get('/', getUsers);

// Получаю информацию о текущем пользователе
router.get('/me', getCurrentUser);

// Возвращаю пользователя по ID
router.get('/:userId', idValidation, getUserById);

// Обновляю пофиль
router.patch('/me', updateProfileValidation, updateProfile);

// Обновляю аватар
router.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = router;
