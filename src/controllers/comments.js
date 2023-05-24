const Joi = require('joi');

const { getPostById } = require('../db/postsdb');
const {
  createCommentFromPostById,
  selectCommentsFromPostById,
} = require('../db/commentsdb');

const newCommentInPostByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const { comment } = req.body;

    const schema = Joi.object({
      comment: Joi.string().max(500).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        status: 'error',
        message: 'Invalid data',
        error: error.details[0].message,
      });
    }
    await getPostById(id);

    const postComent = await createCommentFromPostById(comment, userId, id);

    res.send({
      status: 'Ok',
      data: postComent,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newCommentInPostByIdController,
};
