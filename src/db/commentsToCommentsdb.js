const { getConnection } = require('./db');

const newCommentInCommentByCommentId = async (comment, userId, commentId) => {
  let connection;

  try {
    connection = await getConnection();
    await connection.query(
      `
            INSERT INTO commentsToComments (comment, user_id, comment_id) VALUES (?,?,?)
            `,
      [comment, userId, commentId]
    );

    connection = await getConnection();
    const [comments] = await connection.query(
      `
            SELECT id, comment, comment_id, created_at FROM commentsToComments WHERE comment_id = ?
            `,
      [commentId]
    );

    const lastComment = comments.length - 1;

    return comments[lastComment];
  } finally {
    if (connection) connection.release();
  }
};

const selectCommentsInCommentsByCommentId = async (commentId) => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
            SELECT id, comment, comment_id, created_at FROM commentsToComments WHERE comment_id = ?
            `,
      [commentId]
    );

    return result;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  newCommentInCommentByCommentId,
  selectCommentsInCommentsByCommentId,
};
