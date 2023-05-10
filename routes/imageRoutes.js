const express = require('express');
const imageRoutes = express.Router();

// Endpoints Publicos
imageRoutes.get('/', getImages);
imageRoutes.route('/:id').get(getImageById);

imageRoutes.route('/:id/comments').get(getCommentsByImageId);
imageRoutes.route('/:id/likes').get(getLikesByImageId);

// Endpoint Privados
imageRoutes.route('/').all(validateAuth).post(uploadImage);
imageRoutes
  .route('/:id')
  .all(validateAuth)
  .put(updateImageById)
  .patch(patchImageById)
  .delete(deleteImageById);

// imageRoutes.route('/:id/comments').all(validateAuth).post(writeCommentByIdUser);

module.exports = imageRoutes;
