const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const shortid = require('shortid');

const { createPathIfNotExists, generateError } = require('../helpers');
const {
  createPost,
  getAllImages,
  getImageById,
  deleteImageById,
} = require('../db/imagesdb');

const getImagesController = async (req, res, next) => {
  try {
    const images = await getAllImages();

    res.send({
      status: 'ok',
      data: images,
    });
  } catch (error) {
    next(error);
  }
};

const newImageController = async (req, res, next) => {
  try {
    //CREAR

    const { postText } = req.body;

    // if (!postImage) {
    //   throw generateError('Hay que subir una imagen', 400);
    // }

    let imageFileName;

    if (req.files && req.files.postImage) {
      const uploadsDir = path.join(__dirname, '../uploads');

      await createPathIfNotExists(uploadsDir);

      const image = sharp(req.files.postImage.data);

      await image.resize(1000);

      imageFileName = `${shortid(24)}.jpg`;

      image.toFile(path.join(uploadsDir, imageFileName));
    }

    const id = await createPost(req.userId, imageFileName, postText);

    res.send({
      status: 'ok',
      message: `Image con id ${id} creado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleImageController = async (req, res, next) => {
  try {
    const { id } = req.params;
    // REVISAR
    const image = await getImageById(id);

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
    const { id } = req.params;

    const image = await getImageById(id);

    console.log(image);

    if (req.userId !== image.user_id) {
      throw generateError(
        'Estás intentando borrar una imagen que no es tuya',
        401
      );
    }

    await deleteImageById(id);

    // fs.unlink(`../uploads/${image.filename}`, (err) => {
    //   if (err) {
    //     console.error(`Error al borrar la imagen: ${err}`);
    //     // Aquí puedes manejar el error según tus necesidades
    //   } else {
    //     console.log(`Imagen ${image.filename} borrada correctamente`);
    //   }
    // });

    res.send({
      status: 'ok',
      message: `Image con id ${id} fue borrado`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getImagesController,
  newImageController,
  getSingleImageController,
  deleteImageController,
};
