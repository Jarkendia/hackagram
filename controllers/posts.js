const fs = require('fs/promises');
const path = require('path');
const sharp = require('sharp');
const randomstring = require('randomstring');
const Joi = require('joi');

const { createPathIfNotExists, generateError } = require('../helpers');
const {
  createPost,
  getAllPosts,
  getPostsByText,
  deletePostById,
  getPostById,
  getPostByName,
} = require('../db/postsdb');
const { selectCommentsFromPostById } = require('../db/commentsdb');

const getAllPostsController = async (req, res, next) => {
  try {
    const images = await getAllPosts();

    for (const image of images) {
      image.comments = await selectCommentsFromPostById(image.id);
    }

    res.send({
      status: 'ok',
      data: images,
    });
  } catch (error) {
    next(error);
  }
};

//Crear publicación con imagen (y texto opcional)
const newPostController = async (req, res, next) => {
  try {
    const { postText } = req.body;
    let imageFileName;

    const schema = Joi.object({
      postImage: Joi.any(),
      postText: Joi.string().allow('').max(500),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      throw generateError(error.details[0].message, 400);
    }

    if (!req.files?.postImage) {
      throw generateError('No has seleccionado una imagen', 400);
    }

    const uploadsDir = path.join(__dirname, '../uploads');

    await createPathIfNotExists(uploadsDir);

    const image = sharp(req.files.postImage.data);
    // Gracias al sharp redimensionamos fácilmente las imágenes
    await image.resize(1000, 1000);

    const randomName = randomstring.generate(7) + '.jpg';
    // Generar nombre aleatorio con letras y números con máximo de 7 caracteres
    imageFileName = `${randomName}`;

    image.toFile(path.join(uploadsDir, imageFileName));

    const id = await createPost(req.userId, imageFileName, postText);

    res.send({
      status: 'ok',
      data: `Imagen ${imageFileName} con id ${id} creada correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

//Buscar publicación por su id (o randomstring, más bien)
const getSinglePostController = async (req, res, next) => {
  try {
    const { post_image } = req.params;
    const postName = await getPostByName(post_image + '.jpg');
    console.log(postName);
    console.log(post_image);

    for (const image of postName) {
      image.comments = await selectCommentsFromPostById(image.id);
    }

    res.send({
      status: 'Ok',
      data: postName,
    });
  } catch (error) {
    next(error);
  }
};

//Buscar fotos (por su texto descriptivo)
const getPostsController = async (req, res, next) => {
  try {
    const { post_text } = req.params;
    const images = await getPostsByText(post_text);

    res.send({
      status: 'Ok',
      data: images,
    });
  } catch (error) {
    next(error);
  }
};

const deletePostController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const image = await getPostById(id);

    console.log(image);

    if (req.userId !== image.user_id) {
      throw generateError(
        'Estás intentando borrar una imagen que no es tuya',
        401
      );
    }

    await deletePostById(id);
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
  getAllPostsController,
  newPostController,
  getPostsController,
  getSinglePostController,
  deletePostController,
  selectCommentsFromPostById,
};
