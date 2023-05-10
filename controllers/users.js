const { generateError } = require('../helpers');
const { createUser } = require('../db/usersdb');
const Joi = require('joi');
const newUserController = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    //Sustituir por Joi

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
      username: Joi.string().alphanum().min(3).max(30).required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        status: 'error',
        message: 'Invalid data',
        error: error.details[0].message,
      });
    }
    const id = await createUser(email, password, username);

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
