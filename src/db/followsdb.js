const { getConnection } = require('./db');

const followUp = async (followerId, followeeId) => {
  let connection;
  try {
    connection = await getConnection();

    const [existingFollow] = await connection.query(
      'SELECT * FROM follows WHERE follower_id = ? AND followee_id = ?',
      [followerId, followeeId]
    );

    if (existingFollow.length > 0) {
      await connection.query(
        'DELETE FROM follows WHERE follower_id = ? AND followee_id = ?',
        [followerId, followeeId]
      );
    } else {
      await connection.query(
        'INSERT INTO follows (follower_id, followee_id) VALUES (?, ?)',
        [followerId, followeeId]
      );
    }
  } finally {
    if (connection) connection.release();
  }
};

const getFollowersByUserId = async (userId) => {
  let connection;
  try {
    connection = await getConnection();
    const [followers] = await connection.query(
      'SELECT u.username FROM users u INNER JOIN follows f ON u.id = f.follower_id WHERE f.followee_id = ?',
      [userId]
    );
    return followers;
  } finally {
    if (connection) connection.release();
  }
};

// Función para obtener los followings de un usuario por su ID
const getFollowingsByUserId = async (userId) => {
  let connection;
  try {
    connection = await getConnection();
    const [followings] = await connection.query(
      'SELECT u.username FROM users u INNER JOIN follows f ON u.id = f.followee_id WHERE f.follower_id = ?',
      [userId]
    );
    return followings;
  } finally {
    if (connection) connection.release();
  }
};

// const getFollowersAndFollowing = async (userId) => {
//   let connection;

//   try {
//     connection = await getConnection();

//     // Obtener el total de seguidores
//     const [followers] = await connection.query(
//       'SELECT COUNT(*) AS follower_count FROM follows WHERE followee_id = ?',
//       [userId]
//     );
//     const followerCount = followers[0].follower_count;

//     // Obtener el total de usuarios a los que sigue (followees)
//     const [followees] = await connection.query(
//       'SELECT COUNT(*) AS followee_count FROM follows WHERE follower_id = ?',
//       [userId]
//     );
//     const followeeCount = followees[0].followee_count;

//     return { followerCount, followeeCount };
//   } finally {
//     if (connection) connection.release();
//   }
// };

module.exports = {
  followUp,
  getFollowingsByUserId,
  getFollowersByUserId,
  //   getFollowersAndFollowing,
};
