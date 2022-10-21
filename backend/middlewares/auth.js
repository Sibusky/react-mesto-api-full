const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/unauthorized-err');

module.exports = (req, res, next) => {
  // достаю авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаюсь, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  // извлекаю токен
  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    // пытаюсь верифицировать токен
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    // отправляю ошибку, если не получилось
    next(new UnauthorizedError('Необходима авторизация'));
  }

  req.user = payload; // записываю пейлоуд в объект запроса

  return next(); // пропускаю запрос дальше
};
