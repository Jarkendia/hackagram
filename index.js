require('dotenv').config();
const port = 4000;

const express = require('express');
const morgan = require('morgan');
const imageUpload = require('express-fileupload');
// Controllers de USERS
const {
  newUserController,
  getUserController,
  loginController,
} = require('./controllers/users');
// Controllers de IMAGES
const {
  getImagesController,
  newImageController,
  getSingleImageController,
  deleteImageController,
} = require('./controllers/images');
// Controllers de COMMENTS
const {
  newCommentInPostById,
  showCommentFromPostById,
} = require('./controllers/comments');

const { authUser } = require('./middlewares/auth');

const app = express();

// | INFO de desarrollo
app.use(imageUpload());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('./uploads'));

//Rutas para cada ENDPOINT

//Rutas de usuario
app.post('/user', newUserController);
app.get('/user/:id', getUserController);
app.post('/login', loginController);

//Rutas de Posts
app.post('/', authUser, newImageController);
app.get('/', getImagesController);
app.get('/image/:id', getSingleImageController);
app.delete('/image/:id', authUser, deleteImageController);

//Rutas de comentarios
app.post('/image/:id/', newCommentInPostById);
app.get('/image/:id/', showCommentFromPostById);

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
