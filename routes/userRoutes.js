const express = require('express');
const userRoutes = express.Router();

//http://localhost:port/users
//ENDPOINTS PUBLICOS
userRoutes.route('/').post(registerUser);
userRoutes.route('/login').post(loginUser);
userRoutes.route('/activation').get(activateUser);

//ENDPOINTS PRIVADOS
userRoutes.route('/').all(validateAuth).get(getUsers);
userRoutes
  .route('/profile')
  .all(validateAuth)
  .get(getUserProfile)
  .put(updateUser);

module.exports = userRoutes;
