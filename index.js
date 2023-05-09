require('dotenv').config();
const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } =
  process.env;

// console.log(process.env);

const express = require('express');
const morgan = require('morgan');

const app = express();

// app.use(morgan('dev')); | INFO de desarrollo

//Rutas para cada ENDPOINT

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
