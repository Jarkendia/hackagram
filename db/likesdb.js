const { getConnection } = require('./db');

const likeUp = async (userId, postId) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
          SELECT id FROM likes WHERE user_id = ? AND post_id = ?
        `,
      [userId, postId]
    );

    if (result.length > 0) {
      await connection.query(
        `
            DELETE FROM likes WHERE user_id = ? AND post_id = ?
          `,
        [userId, postId]
      );

      // Consultar nuevamente el número de "likes" después de eliminar el "like"
      const [updatedResult] = await connection.query(
        `
            SELECT COUNT(*) AS totalLikes FROM likes WHERE post_id = ?
          `,
        [postId]
      );

      const updatedLikes = updatedResult[0].totalLikes;

      return { liked: false, totalLikes: updatedLikes }; // Devolver el número de "likes" actualizado
    } else {
      await connection.query(
        `
            INSERT INTO likes (user_id, post_id) VALUES (?, ?)
          `,
        [userId, postId]
      );

      // Consultar nuevamente el número de "likes" después de agregar el "like"
      const [updatedResult] = await connection.query(
        `
            SELECT COUNT(*) AS totalLikes FROM likes WHERE post_id = ?
          `,
        [postId]
      );

      const updatedLikes = updatedResult[0].totalLikes;

      return { liked: true, totalLikes: updatedLikes }; // Devolver el número de "likes" actualizado
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  likeUp,
};
