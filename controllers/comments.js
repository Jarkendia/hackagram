const {
  createCommentFromPostById,
  selectCommentsFromPostById,
} = require('../db/commentsdb');

const newCommentInPostByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const { comment } = req.body;

    await createCommentFromPostById(comment, userId, id);

    const updatedComments = await selectCommentsFromPostById(id);

    res.send({
      status: 'Ok',
      data: updatedComments,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newCommentInPostByIdController,
};
