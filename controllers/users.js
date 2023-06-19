const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');
const {
  createUser,
  getUserByEmail,
  getPostsByUser,
  getPostsByUserId,
  getUserByMyId,
} = require('../db/usersdb');
const { selectCommentsFromPostById } = require('../db/commentsdb');
const Joi = require('joi');
const { getAllPosts } = require('../db/postsdb');

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
      message: `Perfil de ${username} creado con el id ${id}`,
    });
  } catch (error) {
    next(error);
  }
};
const getPostsByUserController = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await getPostsByUser(username);

    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const getMeController = async (req, res, next) => {
  try {
    const user = await getUserByMyId(req.userId, false);

    res.send({
      status: 'ok',
      data: user,
    });
  } catch (error) {
    next(error);
  }

};


const getPostsByUserIdController = async (req, res, next) => {
  try {
    const { userId } = req;

    console.log(userId);

    const users = await getPostsByUserId(userId);

    for (const user of users) {
      user.comments = await selectCommentsFromPostById(user.id);
    }

    res.send({
      status: 'ok',
      data: users,
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
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newUserController,
  loginController,
  getPostsByUserController,
  getPostsByUserIdController,
  getMeController,
};
