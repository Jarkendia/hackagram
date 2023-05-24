const Joi = require('joi');

const {
  newCommentInCommentByCommentId,
  selectCommentsInCommentsByCommentId,
} = require('../db/commentsToCommentsdb');
const { getCommentsById } = require('../db/commentsdb');

const newCommentInCommentByCommentIdController = async (req, res, next) => {
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

    await getCommentsById(id);

    const commentInCommentCreated = await newCommentInCommentByCommentId(
      comment,
      userId,
      id
    );

    res.send({
      status: 'Ok',
      data: commentInCommentCreated,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newCommentInCommentByCommentIdController,
};
