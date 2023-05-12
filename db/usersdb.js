const { generateError } = require('../helpers');
const { getConnection } = require('./db');
const bcrypt = require('bcryptjs');

const getUserByEmail = async (email) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
    SELECT * FROM users WHERE email = ?
    `,
      [email]
    );

    if (result.length === 0) {
      throw generateError('El email o la contraseña no coinciden.', 401);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

// Devuelve la informacion pública de un usuario por su id
const getUserById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
    SELECT id, email, username, created_at FROM users WHERE id=?
    `,
      [id]
    );

    if (result.length === 0) {
      throw generateError('No hay ningún usuario con esa id', 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

//Seleccionar todas las imagenes de un usuario
const getImagesByUser = async (username) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT p.post_image, u.username
      FROM posts p
      LEFT JOIN users u ON p.user_id = u.id
      WHERE u.username = ?
    `,
      [username]
    );
    // SELECT i.image_url, u.username
    // FROM images AS i
    // LEFT JOIN users AS u ON i.user_id = u.id
    // WHERE u.username = ?
    if (result.length === 0) {
      throw generateError('No hay ningún usuario con ese nombre', 404);
    }

    return result;
  } finally {
    if (connection) connection.release();
  }
};

// Crea un usuario en la base de datos  y devuelve su id
const createUser = async (email, password, username) => {
  let connection;

  try {
    connection = await getConnection();
    //Comprobar que no exista otro usuario con ese email
    const [user] = await connection.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (user.length > 0) {
      throw generateError('Ya existe un usuario con ese email', 409);
    }
    //Encriptar la password
    const passwordHash = await bcrypt.hash(password, 8);

    //Crear el usuario
    const [newUser] = await connection.query(
      `
      INSERT INTO users (email, password, username) VALUES(?,?,?)
      `,
      [email, passwordHash, username]
    );

    //Devolver la id
    return newUser.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getImagesByUser,
};
