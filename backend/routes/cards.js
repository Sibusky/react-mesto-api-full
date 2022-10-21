const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { urldRegEx } = require('../utils/constants');
const {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');

const cardDataValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(urldRegEx),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24),
  }),
});

// Возвращаю все карточки
router.get('/', getCards);

// Создаю карточку
router.post('/', cardDataValidation, createCard);

// Удаляю карточку по id
router.delete('/:cardId', cardIdValidation, deleteCardById);

// Ставлю лайк карточке
router.put('/:cardId/likes', cardIdValidation, likeCard);

// Убираю лайк с карточки
router.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = router;
