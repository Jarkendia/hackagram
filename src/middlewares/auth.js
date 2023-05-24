const { generateError } = require('../helpers');
const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw generateError(
        'Debes iniciar sesion. Falta la cabecera de Authorization',
        401
      );
    }

    let token;

    try {
      token = jwt.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError('Token incorrecto', 401);
    }

    req.userId = token.id;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authUser,
};
