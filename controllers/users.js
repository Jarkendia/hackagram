const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');
const { createUser, getUserById, getUserByEmail } = require('../db/usersdb');
const Joi = require('joi');

const newUserController = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
      username: Joi.string().alphanum().min(3).max(30).required(),
    });

    const { error } = schema.validate(req.body);

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
const getUserController = async (req, res, next) => {
  try {
    const id = req.params;

    const user = await getUserById(id);

    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        status: 'error',
        message: 'Invalid data',
        error: error.details[0].message,
      });
    }

    const user = await getUserByEmail(email);

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw generateError('El email o la contraseña no coinciden.', 401);
    }

    const payload = { id: user.id };

    //Teneis que poner esto en el .env con el mismo secreto que se creo, no se si es necesario.
    // SECRET=as6f98gaw694rg7fabasf76578a
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: '30d',
    });

    res.send({
      status: 'ok',
      message: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newUserController,
  getUserController,
  loginController,
};
