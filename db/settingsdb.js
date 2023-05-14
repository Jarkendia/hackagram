const { getConnection } = require('./db');

const changeName = async (userId, newUsername) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
          UPDATE users SET username = ?  WHERE id
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
