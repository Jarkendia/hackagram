const { getConnection } = require('./db');

const sendMessage = async (userId, id, message) => {
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      INSERT INTO messages (sender_id, receiver_id, message)
      VALUES (?, ?, ?)
      `,
      [userId, id, message]
    );

    return result;
  } finally {
    if (connection) connection.release();
  }
};

const getConversation = async (userId, id) => {
  let connection;

  try {
    connection = await getConnection();

    const [messages] = await connection.query(
      `
      SELECT *
      FROM messages
      WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)
      ORDER BY created_at ASC
      `,
      [userId, id, id, userId]
    );

    return messages;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  sendMessage,
  getConversation,
};
