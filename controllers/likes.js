const { getPostById } = require('../db/postsdb');
const { likeUp } = require('../db/likesdb');

const postLikeController = async (req, res, next) => {
  try {
    const { imageId } = req.params;
    const { userId } = req;

    const image = await getPostById(imageId);

    const like = await likeUp(userId, imageId);

    res.send({
      status: 'Ok',
      data: image,
      like,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postLikeController,
};
