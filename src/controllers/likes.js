const { getPostById } = require('../db/postsdb');
const { likeUp, selectLikesFromPostsById } = require('../db/likesdb');

const postLikeController = async (req, res, next) => {
  try {
    const { imageId } = req.params;
    const { userId } = req;

    await likeUp(userId, imageId);

    const image = await getPostById(imageId);

    image.likes = await selectLikesFromPostsById(imageId);

    res.send({
      status: 'Ok',
      data: image,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postLikeController,
};
