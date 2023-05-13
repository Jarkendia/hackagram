const { getImageById } = require('../db/imagesdb');
const { likeUp } = require('../db/likesdb');

const postLikeImageController = async (req, res, next) => {
  try {
    const { imageId } = req.params;
    const { userId } = req;

    const image = await getImageById(imageId);

    const likeId = await likeUp(userId, imageId);

    res.send({
      status: 'Ok',
      message: image,
      likeId,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postLikeImageController,
};
