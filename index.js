require('dotenv').config();
const bcrypt = require('bcryptjs');
const { MYSQL_PORT } = process.env;

// console.log(process.env);

const express = require('express');
const morgan = require('morgan');
const {
  newUserController,
  getUserController,
  loginController,
} = require('./controllers/users');

const {
  getImageController,
  newImageController,
  getSingleImageController,
  deleteImageController,
} = require('./controllers/images');

const app = express();

// | INFO de desarrollo
app.use(morgan('dev'));

//Rutas para cada ENDPOINT

//Rutas de usuario
app.post('/user', newUserController);
app.get('/user/:id', getUserController);
app.post('/login', loginController);

//Rutas de Posts
app.get('/', getImageController);
app.post('/', newImageController);
app.get('/image/:id', getSingleImageController);
app.delete('/image/:id', deleteImageController);
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

app.listen(MYSQL_PORT, () => {
  console.log(`Servidor iniciado en el puerto ${MYSQL_PORT}`);
});
