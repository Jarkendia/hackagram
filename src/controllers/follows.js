const { followUp } = require('../db/followsdb');
const { getUserById } = require('../db/usersdb');

const userFollowsController = async (req, res, next) => {
  try {
    const { userId } = req;
    const { id } = req.params;

    const userFollowing = await getUserById(id);

    await followUp(userId, id);

    res.send({
      status: 'ok',
      data: `ahora sigues a ${userFollowing.username}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userFollowsController,
};
