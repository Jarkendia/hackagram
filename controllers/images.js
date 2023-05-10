const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateError } = require('../helpers');
const { getUserImagesById, createPost } = require('../db/imagesdb');

const getImageController = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      data: 'MAAAAAL',
    });
  } catch (error) {
    next(error);
  }
};

const newImageController = async (req, res, next) => {
  try {
    //CREAR

    res.send({
      status: 'ok',
      message: 'Nueva imagen creada',
    });
  } catch (error) {
    next(error);
  }
};

const getSingleImageController = async (req, res, next) => {
  try {
    // const { id } = req.params;
    // REVISAR
    // const image = await getUserImagesById(id);
    res.send({
      status: 'Ok',
      message: image,
    });
  } catch (error) {
    next(error);
  }
};

const deleteImageController = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getImageController,
  newImageController,
  getSingleImageController,
  deleteImageController,
};
