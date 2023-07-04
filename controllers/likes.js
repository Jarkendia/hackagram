const { getPostById, getPostByName } = require('../db/postsdb');
const { likeUp } = require('../db/likesdb');

const postLikeController = async (req, res, next) => {
  try {
    const { imageId } = req.params;
    const { userId } = req;

    await likeUp(userId, imageId);

    const { post_image } = await getPostById(imageId);

    const image = await getPostByName(post_image, userId);

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
