require('dotenv').config();
const port = 4000;
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const imageUpload = require('express-fileupload');
const { authUser } = require('./middlewares/auth');

// Controllers de USERS
const {
  newUserController,
  getPostsByUserController,
  getPostsByUserIdController,
  loginController,
  getMeController,
  getUsersController,
} = require('./controllers/users');

// Controllers de POSTS
const {
  getAllPostsController,
  newPostController,
  getPostsController,
  deletePostController,
  getSinglePostController,
} = require('./controllers/posts');

// Controllers de COMMENTS
const { newCommentInPostByIdController } = require('./controllers/comments');

// Controller de LIKES
const { postLikeController } = require('./controllers/likes');

// Controller de SETTINGS
const { changesUserController } = require('./controllers/settings');

const app = express();
app.use(cors());
app.use(imageUpload());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('./uploads'));

//Rutas para cada ENDPOINT
//Rutas de usuario
app.post('/user', newUserController);
app.get('/user/id', authUser, getPostsByUserIdController);
app.get('/user/:username', getPostsByUserController);
app.post('/login', loginController);

//Rutas de Posts
app.post('/image', authUser, newPostController);
app.get('/', getAllPostsController);
app.get('/p/:post_image', getSinglePostController);
app.get('/image/:post_text', getPostsController);
app.get('/username/:username', getUsersController);
app.delete('/image/:id', authUser, deletePostController);

app.get('/user', authUser, getMeController);

//Ruta de like
app.post('/image/:imageId/like', authUser, postLikeController);

//Ruta de comentarios
app.post('/image/:id/comment', authUser, newCommentInPostByIdController);

//Rutas de settings
app.put('/settings', authUser, changesUserController);

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
