const { changeName } = require('../db/settingsdb');
const { getUserById } = require('../db/usersdb');

const changeUsername = async (req, res, next) => {
  try {
    const { userId } = req;
    const { newUsername } = req.body;

    const idUser = await getUserById(userId);

    await changeName(userId, newUsername);

    res.send({
      status: 'Ok',
      message: `Tu nombre ${idUser.username} fue cambiado por ${newUsername}`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  changeUsername,
};
