const { generateError } = require('../helpers');
const { getConnection } = require('./db');

const verifyAccount = async (verificationCode) => {
  let connection;
  try {
    connection = await getConnection();
    const [user] = await connection.query(
      'SELECT id FROM users WHERE verification_Code = ?',
      [verificationCode]
    );

    if (user.length === 0) {
      throw generateError('Código de verificación inválido', 400);
    }

    // Marcar la cuenta como verificada en la base de datos
    await connection.query(
      'UPDATE users SET verified_at = CURRENT_TIMESTAMP WHERE id = ?',
      [user[0].id]
    );

    return user[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  verifyAccount,
};
