require('dotenv').config();

const { getConnection } = require('./db');

const main = async () => {
  let connection;

  try {
    connection = await getConnection();

    await connection.query('USE hackagram');

    await connection.query('DROP TABLE IF EXISTS commentsToComments');
    await connection.query('DROP TABLE IF EXISTS messages');
    await connection.query('DROP TABLE IF EXISTS follows');
    await connection.query('DROP TABLE IF EXISTS comments');
    await connection.query('DROP TABLE IF EXISTS likes');
    await connection.query('DROP TABLE IF EXISTS posts');
    await connection.query('DROP TABLE IF EXISTS users');

    await connection.query(`CREATE TABLE users (
            id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            avatar VARCHAR(45),
            role ENUM('admin', 'user') DEFAULT 'user',
            is_active BOOLEAN DEFAULT true,
            bio VARCHAR(255),
            verification_code VARCHAR(24) NOT NULL,
            verified_at DATETIME)`);
    console.log('Tabla users creada!!');

    await connection.query(`
    CREATE TABLE posts (
        id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER UNSIGNED,
        FOREIGN KEY (user_id) REFERENCES users(id),
        post_text VARCHAR(500),
        post_image VARCHAR(100) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    `);
    console.log('Tabla posts creada!!');

    await connection.query(`
    CREATE TABLE comments (
        id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        comment VARCHAR(500),
        user_id INTEGER UNSIGNED,
        post_id INTEGER UNSIGNED,
        CONSTRAINT user_id_comments FOREIGN KEY (user_id) REFERENCES users(id),
        CONSTRAINT post_id_comments FOREIGN KEY (post_id) REFERENCES posts(id),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    `);
    console.log('Tabla comments creada!!');

    await connection.query(`
    CREATE TABLE likes (
      id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER UNSIGNED,
        post_id INTEGER UNSIGNED,
        CONSTRAINT user_id_likes FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT post_id_likes FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    `);
    console.log('Tabla likes creada!!');

    await connection.query(`
    CREATE TABLE follows (
      id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      follower_id INT UNSIGNED NOT NULL,
      followee_id INT UNSIGNED NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT follower_id_follows FOREIGN KEY (follower_id) REFERENCES users(id),
      CONSTRAINT followee_id_follows FOREIGN KEY (followee_id) REFERENCES users(id)
              )
    `);
    console.log('Tabla follows creada!!');

    await connection.query(`
    CREATE TABLE messages (
      id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      sender_id INTEGER UNSIGNED,
      receiver_id INTEGER UNSIGNED,
      message VARCHAR(500) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (sender_id) REFERENCES users(id),
      FOREIGN KEY (receiver_id) REFERENCES users(id)
            )`);
    console.log('Tabla messages creada!!');

    await connection.query(`
    CREATE TABLE commentsToComments (
      id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      comment VARCHAR(500),
      comment_id INTEGER UNSIGNED,
      user_id INTEGER UNSIGNED,
      FOREIGN KEY (comment_id) REFERENCES comments(id),
      FOREIGN KEY (user_id) REFERENCES users(id),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP);`);
    console.log('Tabla commentsToComments creada!!');
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

main();
