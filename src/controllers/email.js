const { verifyAccount } = require('../db/emaildb');

const verifyEmailController = async (req, res, next) => {
  try {
    const { code } = req.params;

    await verifyAccount(code);

    res.send({
      status: 'ok',
      message: 'Cuenta verificada correctamente!',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyEmailController,
};
