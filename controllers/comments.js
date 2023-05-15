const { getPostById } = require('../db/postsdb');
const { createCommentFromPostById } = require('../db/commentsdb');

const newCommentInPostByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req;
    const { comment } = req.body;

    const postId = await getPostById(id);
    const commentsPost = await createCommentFromPostById(
      comment,
      userId,
      postId.id
    );

    res.send({
      status: 'Ok',
      message: `El comentario ${comment} se registro correctamente en el post con la id ${postId.id}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  newCommentInPostByIdController,
};
