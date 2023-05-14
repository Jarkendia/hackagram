require('dotenv').config();
const port = 4000;

const express = require('express');
const morgan = require('morgan');
const imageUpload = require('express-fileupload');
// Controllers de USERS
const {
  newUserController,
  getPostsByUserController,
  loginController,
} = require('./controllers/users');
// Controllers de POSTS
const {
  getAllPostsController,
  newPostController,
  getPostsController,
  deletePostController,
} = require('./controllers/posts');
// Controllers de COMMENTS
const {
  newCommentInPostByIdController,
  // showCommentFromPostById,
} = require('./controllers/comments');

// Controller de LIKES
const { postLikeController } = require('./controllers/likes');

const { authUser } = require('./middlewares/auth');
const { changeUsername } = require('./controllers/settings');

const app = express();

// | INFO de desarrollo
app.use(imageUpload());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('./uploads'));

//Rutas para cada ENDPOINT

//Rutas de usuario
app.post('/user', newUserController);
app.get('/user/:username', getPostsByUserController);
app.post('/login', loginController);

//Rutas de Posts
app.post('/', authUser, newPostController);
app.get('/', getAllPostsController);
app.get('/image/:post_text', getPostsController);
app.delete('/image/:id', authUser, deletePostController);

//Ruta de like
app.post('/image/:imageId/like', authUser, postLikeController);

//Rutas de comentarios
app.post('/image/:id/comment', authUser, newCommentInPostByIdController);

app.put('/settings', authUser, changeUsername);

// Middleware del error 404 (ruta no encontrada)
app.use((req, res) => {
  res.status(404).send({
    status: 'Error',
    message: 'Ruta no encontrada',
  });
});

// Middleware de gestión de errores
app.use((error, req, res, next) => {
  console.error(error);
  res.status(error.httpStatusCode || 500).send({
    status: 'Error',
    message: error.message,
  });
});

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
