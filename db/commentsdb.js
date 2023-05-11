const { generateError } = require('../helpers');
const { getConnection } = require('./db');

const getCommentFromUserById = async (id) => {
  let connection;

  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
        SELECT comment FROM comments WHERE user_id = ?
        `,
      [id]
    );

    if (result.length === 0) {
      throw generateError('No hay ningún comentario con esa Id', 401);
    }
    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  getCommentFromUserById,
};
