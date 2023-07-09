const { createCommentFromPostById } = require('../db/commentsdb');

const newCommentInPostByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const { comment } = req.body;

    const newComment = await createCommentFromPostById(comment, userId, id);

    res.send({
      status: 'Ok',
      data: newComment,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newCommentInPostByIdController,
};
