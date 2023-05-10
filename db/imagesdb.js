const { generateError } = require('../helpers');
const { getConnection } = require('./db');
const bcrypt = require('bcryptjs');

// Devuelve la informacion pública de un usuario con todas sus fotos por medio de su Id
const getUserImagesById = async (id) => {
  let connection;

  try {
    connection = await getConnection();
    // REVISAR
    const [result] = await connection.query(
      `
      SELECT username, post_image FROM users LEFT JOIN posts on users.id = user_id.posts WHERE id = ?
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

const createPost = async (userId, text, image = '') => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
        INSERT INTO posts (user_id, text_post, image_post) VALUES ( ?, ?, ?)
        `,
      [userId, text, image]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  getUserImagesById,
  createPost,
};
