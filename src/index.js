require('dotenv').config();
const port = 4000;

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
  getAllUsersController,
} = require('./controllers/users');

// Controllers de POSTS
const {
  getAllPostsController,
  newPostController,
  getPostsByTextController,
  deletePostController,
} = require('./controllers/posts');

// Controllers de COMMENTS
const { newCommentInPostByIdController } = require('./controllers/comments');

// Controller de LIKES
const { postLikeController } = require('./controllers/likes');

// Controller de SETTINGS
const { changesUserController } = require('./controllers/settings');
const { verifyEmailController } = require('./controllers/email');
const { accountVerified } = require('./middlewares/verifyAccount');
const { userFollowsController } = require('./controllers/follows');
const {
  sendMessageController,
  getMessagesController,
} = require('./controllers/messages');
const {
  newCommentInCommentByCommentIdController,
} = require('./controllers/commentsToComments');

const app = express();
app.use(imageUpload());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('../uploads'));
app.use('/avatar', express.static('../uploads/avatars'));

//Rutas para cada ENDPOINT
//Rutas de usuario
app.get('/users', getAllUsersController);
app.post('/user', newUserController);
app.get('/user/id/:id', getPostsByUserIdController);
app.get('/user/:username', getPostsByUserController);
app.post('/login', loginController);
app.get('/verify/:code', authUser, accountVerified, verifyEmailController);

//Rutas de Posts
app.post('/', authUser, accountVerified, newPostController);
app.get('/', getAllPostsController);
app.get('/image/:post_text', getPostsByTextController);
app.delete('/image/:id', authUser, accountVerified, deletePostController);

//Ruta de like
app.post('/image/:imageId/like', authUser, accountVerified, postLikeController);

//Ruta de comentarios
app.post(
  '/image/:id/comment',
  authUser,
  accountVerified,
  newCommentInPostByIdController
);

//Rutas de settings
app.put('/settings', authUser, accountVerified, changesUserController);

//Rutas de follows

app.post('/follow/:id', authUser, accountVerified, userFollowsController);

//Rutas de mensajes.
app.post('/message/:id', authUser, accountVerified, sendMessageController);
app.get('/messages/:id', authUser, accountVerified, getMessagesController);

//Rutas de comentarios a comentarios.
app.post(
  '/comment/:id',
  authUser,
  accountVerified,
  newCommentInCommentByCommentIdController
);

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
