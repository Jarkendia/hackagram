const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const randomstring = require('randomstring');

const { createPathIfNotExists, generateError } = require('../helpers');
const {
  createPost,
  getAllImages,
  getImagesByText,
  deleteImageById,
  getImageById,
} = require('../db/imagesdb');

const getAllImagesController = async (req, res, next) => {
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
      // Gracias al sharp redimensionamos fácilmente las imágenes
      await image.resize(300, 200);

      const randomName = randomstring.generate(7) + '.jpg';
      // Generar nombre aleatorio con letras y números con máximo de 7 caracteres
      imageFileName = `${randomName}`;

      image.toFile(path.join(uploadsDir, imageFileName));
    }

    const id = await createPost(req.userId, imageFileName, postText);

    res.send({
      status: 'ok',
      message: `Imagen ${imageFileName} con id ${id} creada correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

const getImagesController = async (req, res, next) => {
  try {
    const { post_text } = req.params;
    // REVISAR
    const image = await getImagesByText(post_text);

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
    await fs.rm(path.join(__dirname, `../uploads/${image.post_image}`));

    res.send({
      status: 'ok',
      message: `La imagen ${image.post_image} con id ${id} fue borrada`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllImagesController,
  newImageController,
  getImagesController,
  deleteImageController,
};
