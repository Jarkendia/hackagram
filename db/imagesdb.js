const { generateError } = require('../helpers');
const { getConnection } = require('./db');

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

const getImagesByText = async (text) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
      SELECT post_image FROM posts WHERE post_text LIKE ?
    `,
      [`%${text}%`]
    );

    if (result.length === 0) {
      throw generateError(
        `La imagen con el texto descriptivo ${text} no existe`,
        404
      );
    }

    return result;
  } finally {
    if (connection) connection.release();
  }
};

const getImageById = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
      SELECT * FROM posts WHERE id = ?
    `,
      [id]
    );

    if (result.length === 0) {
      throw generateError(`La imagen con la id ${id} no existe`, 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

const getAllImages = async () => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(`
      SELECT * FROM posts ORDER BY created_at DESC
    `);

    return result;
  } finally {
    if (connection) connection.release();
  }
};

const createPost = async (userId, image, text = '') => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
        INSERT INTO posts (user_id, post_image, post_text) VALUES ( ?, ?, ?)
        `,
      [userId, image, text]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

const deleteImageById = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      DELETE FROM posts WHERE id=?
    `,
      [id]
    );

    if (result.length === 0) {
      throw generateError(`La imagen con id ${id} no existe`, 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  getUserImagesById,
  createPost,
  getAllImages,
  getImagesByText,
  deleteImageById,
  getImageById,
};
