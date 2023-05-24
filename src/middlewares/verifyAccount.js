const { getUserById } = require('../db/usersdb');
const { generateError } = require('../helpers');

const accountVerified = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await getUserById(userId);

    if (!user.verified_at) {
      throw generateError(
        'Para continuar debes haber verificado tu cuenta desde el link que se envio a tu email',
        404
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  accountVerified,
};
