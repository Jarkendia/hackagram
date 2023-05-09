const { generateError } = require('../helpers');
const { createUser } = require('../db/usersdb');
const newUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //Sustituir por Joi

    if (!email || !password) {
      throw generateError(
        'Debes introducir un email y un password valido',
        400
      );
    }
    const id = await createUser(email, password);

    res.send({
      status: 'ok',
      message: `User created with id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};
const getUserController = async (req, res, next) => {};
const loginController = async (req, res, next) => {};

module.exports = {
  newUserController,
  getUserController,
  loginController,
};
