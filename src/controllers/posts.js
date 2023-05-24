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
} = require('../db/postsdb');
const { selectCommentsFromPostById } = require('../db/commentsdb');
const {
  selectCommentsInCommentsByCommentId,
} = require('../db/commentsToCommentsdb');

const getAllPostsController = async (req, res, next) => {
  try {
    const images = await getAllPosts();

    for (const image of images) {
      const comments = (image.comment = await selectCommentsFromPostById(
        image.id
      ));
      for (const comment of comments) {
        comment.comments = await selectCommentsInCommentsByCommentId(
          comment.id
        );
      }
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
      postText: Joi.string().max(500),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      throw generateError(error.details[0].message, 400);
    }

    if (!req.files?.postImage) {
      throw generateError('No has seleccionado una imagen', 400);
    }

    const uploadsDir = path.join(__dirname, '../../uploads');

    await createPathIfNotExists(uploadsDir);

    const image = sharp(req.files.postImage.data);
    // Gracias al sharp redimensionamos fácilmente las imágenes
    image.resize(300, 200);

    const randomName = randomstring.generate(7) + '.jpg';
    // Generar nombre aleatorio con letras y números con máximo de 7 caracteres
    imageFileName = `${randomName}`;

    image.toFile(path.join(uploadsDir, imageFileName));

    const id = await createPost(req.userId, imageFileName, postText);

    const postCreated = await getPostById(id);

    res.send({
      status: 'ok',
      message: postCreated,
    });
  } catch (error) {
    next(error);
  }
};

//Buscar fotos (por su texto descriptivo)
const getPostsByTextController = async (req, res, next) => {
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
  getPostsByTextController,
  deletePostController,
  selectCommentsFromPostById,
};
