const bcrypt = require('bcrypt');
const joi = require('joi');
const { getPostById } = require('../db/postsdb');
const {
  getCommentsFromPostById,
  createCommentFromPostById,
} = require('../db/commentsdb');

const newCommentInPostByIdController = async (req, res) => {
  // Tengo que usar la función createCommentFromPostById
  try {
    const { id } = req.params;
    const { post_id } = req;

    const imageId = await getPostById(id);

    // const image = await getImagesByText(post_text);

    res.send({
      status: 'Ok',
      message: imageId,
    });
  } catch (error) {
    next(error);
  }
};

const showCommentFromPostById = async (req, res) => {
  // Tengo que usar la función getCommentFromUserById
};

module.exports = {
  newCommentInPostByIdController,
  showCommentFromPostById,
};
