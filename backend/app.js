const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { urldRegEx } = require('./utils/constants');

const NotFoundError = require('./errors/not-found-err');

const app = express();
const PORT = 3000;

// Подключаю БД
mongoose.connect('mongodb://localhost:27017/mestodb');

// Валидирую данные для регистрации, используя celebrate
const bodyValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(urldRegEx),
  }),
});

// Валидирую данные для логина, используя celebrate
const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

// Превращаю тело запроса в удобный формат JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Роуты не требующие авторизации: логин и регистрация
app.post('/signin', loginValidation, login);
app.post('/signup', bodyValidation, createUser);

// Роут авторизации
app.use(auth);

// Роуты, требующие авторизации
app.use('/users', auth, usersRouter);
app.use('/cards', auth, cardsRouter);

// Роут на ненайденную страницу
app.use('/*', (req, res, next) => next(new NotFoundError('Страница не найдена')));

// Мидлвара celebrate для отправки ошибки пользователю
app.use(errors());

// Обработчик ошибок
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляю 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяю статус и выставляю сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log('App started and listen port', PORT);
});
