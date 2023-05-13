const { getPostById } = require('../db/postsdb');
const {
  // getCommentsFromPostById,
  createCommentFromPostById,
} = require('../db/commentsdb');

const newCommentInPostByIdController = async (req, res, next) => {
  // Tengo que usar la función createCommentFromPostById
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

    // const image = await getImagesByText(post_text);

    res.send({
      status: 'Ok',
      message: `El comentario ${comment} se registro correctamente en el post con la id ${postId.id}`,
    });
  } catch (error) {
    next(error);
  }
};

// const showCommentFromPostById = async (req, res) => {
//   // Tengo que usar la función getCommentFromUserById
// };

module.exports = {
  newCommentInPostByIdController,
  // showCommentFromPostById,
};
