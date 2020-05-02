const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const { cookie } = req.headers;
  if (!cookie || !cookie.startsWith('jwt=')) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  const token = cookie.replace('jwt=', '');
  let payload = '';
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  return next();
};
