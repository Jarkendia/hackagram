require('dotenv').config();

const { getConnection } = require('./db');

const fillOutDataBase = async () => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(`INSERT INTO users (id, email, password, username, bio, verification_code, verified_at)
     VALUES (1, 'asd@gmail.com', '$2a$08$Fvev04FXZ4AlLKjQp3i/t.CwFEpHgFcLPeEsN9edNmQRVJM8DlqV6', 'Naty', 'patata, pimiento', 'qwY8a68SNvOa',
      '2023-05-23 14:20:47');`);
    await connection.query(`INSERT INTO users (id, email, password, username, bio, verification_code, verified_at)
     VALUES (2, 'asd2@gmail.com', '$2a$08$Fvev04FXZ4AlLKjQp3i/t.CwFEpHgFcLPeEsN9edNmQRVJM8DlqV6', 'Naty2', 'patata, pimiento2', 'qwY8a68SNvO2',
      '2023-05-23 14:20:47');`);
    await connection.query(`INSERT INTO users (id, email, password, username, bio, verification_code, verified_at)
     VALUES (3, 'asd3@gmail.com', '$2a$08$Fvev04FXZ4AlLKjQp3i/t.CwFEpHgFcLPeEsN9edNmQRVJM8DlqV6', 'Naty3', 'patata, pimiento3', 'qwY8a68SNvO3',
      '2023-05-23 14:20:47');`);
    await connection.query(`INSERT INTO users (id, email, password, username, bio, verification_code, verified_at)
     VALUES (4, 'asd4@gmail.com', '$2a$08$Fvev04FXZ4AlLKjQp3i/t.CwFEpHgFcLPeEsN9edNmQRVJM8DlqV6', 'Naty4', 'patata, pimiento4', 'qwY8a68SNvO4',
      '2023-05-23 14:20:47');`);
    await connection.query(`INSERT INTO users (id, email, password, username, bio, verification_code, verified_at)
     VALUES (5, 'asd5@gmail.com', '$2a$08$Fvev04FXZ4AlLKjQp3i/t.CwFEpHgFcLPeEsN9edNmQRVJM8DlqV6', 'Naty5', 'patata, pimiento5', 'qwY8a68SNvO5',
      '2023-05-23 14:20:47');`);
    await connection.query(`INSERT INTO users (id, email, password, username, bio, verification_code, verified_at)
     VALUES (6, 'asd6@gmail.com', '$2a$08$Fvev04FXZ4AlLKjQp3i/t.CwFEpHgFcLPeEsN9edNmQRVJM8DlqV6', 'Naty6', 'patata, pimiento6', 'qwY8a68SNvO6',
      '2023-05-23 14:20:47');`);
    await connection.query(`INSERT INTO users (id, email, password, username, bio, verification_code, verified_at)
     VALUES (7, 'asd7@gmail.com', '$2a$08$Fvev04FXZ4AlLKjQp3i/t.CwFEpHgFcLPeEsN9edNmQRVJM8DlqV6', 'Naty7', 'patata, pimiento7', 'qwY8a68SNvO7',
      '2023-05-23 14:20:47');`);
    await connection.query(`INSERT INTO users (id, email, password, username, bio, verification_code, verified_at)
     VALUES (8, 'asd8@gmail.com', '$2a$08$Fvev04FXZ4AlLKjQp3i/t.CwFEpHgFcLPeEsN9edNmQRVJM8DlqV6', 'Naty8', 'patata, pimiento8', 'qwY8a68SNvO8',
      '2023-05-23 14:20:47');`);
    await connection.query(`INSERT INTO users (id, email, password, username, bio, verification_code, verified_at)
     VALUES (9, 'asd9@gmail.com', '$2a$08$Fvev04FXZ4AlLKjQp3i/t.CwFEpHgFcLPeEsN9edNmQRVJM8DlqV6', 'Naty9', 'patata, pimiento9', 'qwY8a68SNvO9',
      '2023-05-23 14:20:47');`);
    await connection.query(`INSERT INTO users (id, email, password, username, bio, verification_code, verified_at)
     VALUES (10, 'asd10@gmail.com', '$2a$08$Fvev04FXZ4AlLKjQp3i/t.CwFEpHgFcLPeEsN9edNmQRVJM8DlqV6', 'Naty10', 'patata, pimiento10', 'qwY8a68SNv10',
      '2023-05-23 14:20:47');`);
    await connection.query(`INSERT INTO users (id, email, password, username, bio, verification_code, verified_at)
     VALUES (11, 'asd11@gmail.com', '$2a$08$Fvev04FXZ4AlLKjQp3i/t.CwFEpHgFcLPeEsN9edNmQRVJM8DlqV6', 'Naty11', 'patata, pimiento11', 'qwY8a68SNv11',
      '2023-05-23 14:20:47');`);
    await connection.query(`INSERT INTO users (id, email, password, username, bio, verification_code, verified_at)
     VALUES (12, 'asd12@gmail.com', '$2a$08$Fvev04FXZ4AlLKjQp3i/t.CwFEpHgFcLPeEsN9edNmQRVJM8DlqV6', 'Naty12', 'patata, pimiento12', 'qwY8a68SNv12',
      '2023-05-23 14:20:47');`);
    console.log('Insert users');

    await connection.query(`INSERT INTO posts (id, user_id, post_text, post_image) 
    VALUES (1, 1, 'primera foto', 'ej_imagen.jpg');`);
    await connection.query(`INSERT INTO posts (id, user_id, post_text, post_image) 
    VALUES (2, 1, 'segunda foto', 'ej_imagen2.jpg');`);
    await connection.query(`INSERT INTO posts (id, user_id, post_text, post_image) 
    VALUES (3, 2, 'primera foto', 'ej_imagen3.jpg');`);
    await connection.query(`INSERT INTO posts (id, user_id, post_text, post_image) 
    VALUES (4, 3, 'primera foto', 'ej_imagen4.jpg');`);
    await connection.query(`INSERT INTO posts (id, user_id, post_text, post_image) 
    VALUES (5, 3, 'segunda foto', 'ej_imagen5.jpg');`);
    await connection.query(`INSERT INTO posts (id, user_id, post_text, post_image) 
    VALUES (6, 4, 'primera foto', 'ej_imagen6.jpg');`);
    await connection.query(`INSERT INTO posts (id, user_id, post_text, post_image) 
    VALUES (7, 5, 'primera foto', 'ej_imagen7.jpg');`);
    console.log('Insert posts');

    await connection.query(`INSERT INTO comments (id, comment, user_id, post_id) 
    VALUES (1, 'Nice foto', 2, 1);`);
    await connection.query(`INSERT INTO comments (id, comment, user_id, post_id) 
    VALUES (2, 'mmmmh interesante', 3, 1);`);
    await connection.query(`INSERT INTO comments (id, comment, user_id, post_id) 
    VALUES (3, 'Nice patata', 1, 3);`);
    await connection.query(`INSERT INTO comments (id, comment, user_id, post_id) 
    VALUES (4, 'Nice pimiento', 4, 2);`);
    console.log('Insert comments');

    await connection.query(`INSERT INTO likes (id, user_id, post_id) 
    VALUES (1, 1, 3);`);
    await connection.query(`INSERT INTO likes (id, user_id, post_id) 
    VALUES (2, 3, 3);`);
    await connection.query(`INSERT INTO likes (id, user_id, post_id) 
    VALUES (3, 2, 1);`);
    await connection.query(`INSERT INTO likes (id, user_id, post_id) 
    VALUES (4, 5, 2);`);
    console.log('Insert likes');

    await connection.query(`INSERT INTO follows (id, follower_id, followee_id) 
    VALUES (1, 2, 1);`);
    await connection.query(`INSERT INTO follows (id, follower_id, followee_id) 
    VALUES (2, 1, 2);`);
    await connection.query(`INSERT INTO follows (id, follower_id, followee_id) 
    VALUES (3, 3, 1);`);
    await connection.query(`INSERT INTO follows (id, follower_id, followee_id) 
    VALUES (4, 4, 1);`);
    await connection.query(`INSERT INTO follows (id, follower_id, followee_id) 
    VALUES (5, 5, 1);`);
    await connection.query(`INSERT INTO follows (id, follower_id, followee_id) 
    VALUES (6, 6, 1);`);
    await connection.query(`INSERT INTO follows (id, follower_id, followee_id) 
    VALUES (7, 1, 3);`);
    await connection.query(`INSERT INTO follows (id, follower_id, followee_id) 
    VALUES (8, 1, 4);`);
    await connection.query(`INSERT INTO follows (id, follower_id, followee_id) 
    VALUES (9, 3, 2);`);
    await connection.query(`INSERT INTO follows (id, follower_id, followee_id) 
    VALUES (10, 2, 4);`);
    console.log('Insert follows');

    await connection.query(`INSERT INTO messages (id, sender_id, receiver_id, message) 
    VALUES (1, 1, 2, 'Hola tio todo bien?');`);
    await connection.query(`INSERT INTO messages (id, sender_id, receiver_id, message) 
    VALUES (2, 2, 1, 'perfecto, y tu? como te va la vida');`);
    await connection.query(`INSERT INTO messages (id, sender_id, receiver_id, message) 
    VALUES (3, 1, 2, 'Bien, estudiando mucho.');`);
    await connection.query(`INSERT INTO messages (id, sender_id, receiver_id, message) 
    VALUES (4, 4, 1, 'Te conozco?');`);
    console.log('Insert messages');

    await connection.query(
      `INSERT INTO commentsToComments (id, comment, comment_id, user_id) 
      VALUES (1, 'si que esta guay', 1, 4);`
    );
    await connection.query(
      `INSERT INTO commentsToComments (id, comment, comment_id, user_id) 
        VALUES (2, 'Que hablais.', 1, 5);`
    );
    await connection.query(
      `INSERT INTO commentsToComments (id, comment, comment_id, user_id) 
          VALUES (3, 'HELLO WORLD', 3, 1);`
    );
    await connection.query(
      `INSERT INTO commentsToComments (id, comment, comment_id, user_id) 
            VALUES (4, 'Estas zumbado', 3, 6);`
    );
    console.log('Insert commentsToComments');
  } finally {
    if (connection) connection.release();
    process.exit();
  }
};

fillOutDataBase();
