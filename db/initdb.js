const { getConnection } = require('./db');
require('dotenv').config({ path: '../.env' });

async function main() {
  let connection;

  try {
    connection = await getConnection();

    await connection.query('USE hackagram');

    await connection.query('DROP TABLE IF EXISTS comments');
    await connection.query('DROP TABLE IF EXISTS likes');
    await connection.query('DROP TABLE IF EXISTS posts');
    await connection.query('DROP TABLE IF EXISTS users');

    await connection.query(`CREATE TABLE users (
            id INTEGER UNSIGNED PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
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
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
