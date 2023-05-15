const { generateError } = require('../helpers');
const { getConnection } = require('./db');

const changeName = async (userId, newUsername) => {
  let connection;

  try {
    connection = await getConnection();

    const [usernames] = await connection.query(
      'SELECT username FROM users WHERE username = ?',
      [newUsername]
    );

    if (usernames.length > 0) {
      throw generateError('Ya existe un usuario con ese nombre', 409);
    }

    const [result] = await connection.query(
      `
          UPDATE users SET username = ?  WHERE id = ?
          `,
      [newUsername, userId]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  changeName,
};
