const { generateError } = require('../helpers');
const { getConnection } = require('./db');

// Devuelve la informacion pública de un usuario con todas sus fotos por medio de su Id
const getUserPostsById = async (id) => {
  let connection;

  try {
    connection = await getConnection();

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

const getPostsByText = async (text) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
      SELECT username Nombre, post_image Imagen, post_text Descripción, comment Comentario, likes.user_id Likes, posts.created_at Creado FROM posts
LEFT JOIN users ON users.id = posts.user_id
LEFT JOIN likes ON posts.id = likes.post_id 
LEFT JOIN comments ON comments.post_id = posts.id
WHERE post_text LIKE ?
ORDER BY posts.created_at DESC
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

const getPostById = async (id) => {
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

const getPostByName = async (post_image) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
      SELECT p.*, u.username, COUNT(l.id) likes FROM posts p
    LEFT JOIN users u ON u.id = p.user_id
    LEFT JOIN likes l ON p.id = l.post_id 
    WHERE post_image = ?
    GROUP BY p.id
    ORDER BY p.created_at DESC
    `,
      [post_image]
    );

    if (result.length === 0) {
      throw generateError(
        `La publicación con el nombre ${post_image} no existe`,
        404
      );
    }

    return result;
  } finally {
    if (connection) connection.release();
  }
};

const getAllPosts = async () => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(`
    SELECT p.*, u.username, COUNT(l.id) likes FROM posts p
    LEFT JOIN users u ON u.id = p.user_id
    LEFT JOIN likes l ON p.id = l.post_id 
    GROUP BY p.id
    ORDER BY p.created_at DESC
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

const deletePostById = async (id) => {
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
  getUserPostsById,
  createPost,
  getAllPosts,
  getPostsByText,
  deletePostById,
  getPostById,
  getPostByName,
};
