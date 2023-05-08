const { getConnection } = require('./db');

async function main() {
  let connection;

  try {
    connection = await getConnection();

    // await connection.query('DROP DATABASE IF EXISTS hackagram');
    // await connection.query('CREATE DATABASE IF NOT EXISTS hackagram');
    await connection.query('USE hackagram');

    console.log('Base de datos creada!!');

    await connection.query(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTO_INCREMENT,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            username VARCHAR(50) UNIQUE NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP)`);
    console.log('Tabla users creada!!');

    await connection.query(`
    CREATE TABLE posts (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        post_text VARCHAR(500),
        post_image VARCHAR(100) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    `);
    console.log('Tabla posts creada!!');

    // REVISAR CONSTRAINT en likes y comments!!!
    // await connection.query(`
    // CREATE TABLE likes (
    //     user_id INTEGER UNSIGNED NOT NULL,
    //     post_id INTEGER UNSIGNED NOT NULL,
    //     PRIMARY KEY(user_id,post_id),
    //     FOREIGN KEY (user_id) REFERENCES users(id),
    //     FOREIGN KEY (post_id) REFERENCES posts(id),
    //     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    // )
    // `);
    // console.log('Tabla likes creada!!');

    // await connection.query(`
    // CREATE TABLE comments (
    //     id INTEGER PRIMARY KEY AUTO_INCREMENT,
    //     comment VARCHAR(500),
    //     user_id INTEGER UNSIGNED NOT NULL,
    //     post_id INTEGER UNSIGNED NOT NULL,
    //     FOREIGN KEY (user_id) REFERENCES users(id),
    //     FOREIGN KEY (post_id) REFERENCES posts(id),
    //     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    // )
    // `);
    // console.log('Tabla comments creada!!');
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}

main();
