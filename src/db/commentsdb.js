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

    connection = await getConnection();
    const [comments] = await connection.query(
      `
          SELECT id, comment, user_id, created_at FROM comments WHERE post_id = ?
          `,
      [postId]
    );

    const lastComment = comments.length - 1;

    return comments[lastComment];
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
          SELECT id, comment, user_id, created_at FROM comments WHERE post_id = ?
          `,
      [postId]
    );

    return result;
  } finally {
    if (connection) connection.release();
  }
};

const getCommentsById = async (commentId) => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
          SELECT * FROM comments WHERE id = ?
          `,
      [commentId]
    );

    if (result.length === 0) {
      throw generateError(
        `El comentario con la id ${commentId} no existe`,
        404
      );
    }

    return result;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createCommentFromPostById,
  selectCommentsFromPostById,
  getCommentsById,
};
