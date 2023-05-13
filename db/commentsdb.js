const { generateError } = require('../helpers');
const { getConnection } = require('./db');

// Muestra los comentarios que se han hecho en una publicación
// const getCommentsFromPostById = async (id) => {
//   let connection;

//   try {
//     connection = await getConnection();
//     const [result] = await connection.query(
//       `
//         SELECT comment FROM comments WHERE post_id = ?
//         `,
//       [id]
//     );

//     if (result.length === 0) {
//       throw generateError('No hay ningún comentario con esa Id', 401);
//     }
//     return result[0];
//   } finally {
//     if (connection) connection.release();
//   }
// };

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
  // getCommentsFromPostById,
  createCommentFromPostById,
};
