const { changeName } = require('../db/settingsdb');

const changeUsername = async (req, res, next) => {
  try {
    const { userId } = req;
    const { newUsername } = req.body;

    const changes = await changeName(userId, newUsername);

    res.send({
      status: 'Ok',
      message: changes,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  changeUsername,
};
