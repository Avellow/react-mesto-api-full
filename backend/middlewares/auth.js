const jwt = require('jsonwebtoken');
const TokenCheckError = require('../errors/TokenCheckError');
const AuthError = require('../errors/AuthError');

const { JWT_SECRET } = process.env;

const extractBearerHeader = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new AuthError('Необходима авторизация'));
  }

  const token = extractBearerHeader(authorization);
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    next(new TokenCheckError('Некорректный токен'));
  }

  req.user = payload;

  return next();
};
