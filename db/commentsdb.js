const { generateError } = require('../helpers');
const { getConnection } = require('./db');

// Añade comentarios a una publicación por la id del post
const createCommentFromPostById = async (comment, userId, postId) => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
          INSERT INTO comments (comment, user_id, post_id) VALUES (?,?,?)
          `,
      [comment, userId, postId]
    );

    if (result.length === 0) {
      throw generateError('Esa imagen no existe', 404);
    }
    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createCommentFromPostById,
};
