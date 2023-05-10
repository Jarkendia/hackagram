const getImageController = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

const newImageController = async (req, res, next) => {
  try {
    res.send({
      status: 'ok',
      message: 'Nueva imagen creada',
    });
  } catch (error) {
    next(error);
  }
};

const getSingleImageController = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

const deleteImageController = async (req, res, next) => {
  try {
    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getImageController,
  newImageController,
  getSingleImageController,
  deleteImageController,
};
