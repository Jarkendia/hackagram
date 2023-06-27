const { generateError } = require('../helpers');
const { getConnection } = require('./db');
const bcrypt = require('bcryptjs');

const changesUser = async (
  idUser,
  newUsername,
  newEmail,
  newPassword,
  newAvatar,
  newBio
) => {
  let connection;

  try {
    connection = await getConnection();

    const [usernames] = await connection.query(
      'SELECT username FROM users WHERE username = ? AND username != ?',
      [newUsername, idUser.username]
    );

    if (usernames.length > 0) {
      throw generateError('Ya existe un usuario con ese nombre', 409);
    }

    const [emails] = await connection.query(
      'SELECT email FROM users WHERE email = ? AND email != ?',
      [newEmail, idUser.email]
    );

    if (emails.length > 0) {
      throw generateError(
        'Ya existe un usuario que esta usando ese email',
        409
      );
    }

    let passwordHash;

    if (newPassword) {
      passwordHash = await bcrypt.hash(newPassword, 8);
    }

    await connection.query(
      `
          UPDATE users SET 
          username = IFNULL(?, username),
          email = IFNULL(?, email),
          password = IFNULL(?, password),
          avatar = IFNULL (?, avatar),
          bio = IFNULL (?, bio)
          WHERE id = ?
          `,
      [newUsername, newEmail, passwordHash, newAvatar, newBio, idUser.id]
    );

    const [result] = await connection.query(
      `
    SELECT id, email, username, avatar, bio FROM users WHERE id=?
    `,
      [idUser.id]
    );

    return result;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  changesUser,
};
