const { generateError } = require('../helpers');
const { getConnection } = require('./db');

// Añade comentarios a una publicación por la id del post
const createCommentFromPostById = async (comment, userId, postId) => {
  let connection;

  try {
    connection = await getConnection();
    await connection.query(
      `
          INSERT INTO comments (comment, user_id, post_id) VALUES (?,?,?)
          `,
      [comment, userId, postId]
    );

    const [result] = await connection.query(
      `
          SELECT id, comment, user_id, post_id, created_at FROM comments WHERE post_id = ?
          `,
      [postId]
    );

    if (result.length === 0) {
      throw generateError('Esa imagen no existe', 404);
    }
    return;
  } finally {
    if (connection) connection.release();
  }
};

const selectCommentsFromPostById = async (postId) => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
      SELECT c.id, c.comment, c.user_id, c.post_id, c.created_at, u.username
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.post_id = ?
          `,
      [postId]
    );

    return result;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createCommentFromPostById,
  selectCommentsFromPostById,
};
