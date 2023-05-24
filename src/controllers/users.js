const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const randomstring = require('randomstring');

const { generateError } = require('../helpers');
const {
  createUser,
  getUserByEmail,
  getPostsByUser,
  getPostsByUserId,
  getAllUsers,
  getUserById,
} = require('../db/usersdb');
const { sendVerificationEmail } = require('../email/email');
const { selectCommentsFromPostById } = require('./posts');
const { selectPostsByUserId } = require('../db/postsdb');
const {
  getFollowersByUserId,
  getFollowingsByUserId,
} = require('../db/followsdb');

const newUserController = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(4).required(),
      repeatPassword: Joi.ref('password'),
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

    const verificationCode = randomstring.generate(12);

    const id = await createUser(email, password, username, verificationCode);

    const verificationLink = `https://localhost:4000/verify/${verificationCode}`;

    await sendVerificationEmail(email, verificationLink);

    const userCreated = await getUserById(id);

    res.send({
      status: 'ok',
      data: userCreated,
    });
  } catch (error) {
    next(error);
  }
};

const getPostsByUserController = async (req, res, next) => {
  try {
    const { username } = req.params;

    const users = await getPostsByUser(username);

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

const getPostsByUserIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const users = await getPostsByUserId(id);

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
      message: token,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsersController = async (req, res, next) => {
  try {
    const users = await getAllUsers();

    for (const user of users) {
      user.followes = await getFollowingsByUserId(user.id);
      user.follows = await getFollowersByUserId(user.id);
      const posts = (user.posts = await selectPostsByUserId(user.id));
      for (const post of posts) {
        post.comments = await selectCommentsFromPostById(post.id);
      }
    }

    res.send({
      status: 'ok',
      data: users,
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
  getAllUsersController,
};
