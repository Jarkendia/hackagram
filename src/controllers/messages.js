const Joi = require('joi');

const { sendMessage, getConversation } = require('../db/messagesdb');

const sendMessageController = async (req, res, next) => {
  try {
    const { message } = req.body;
    const { id } = req.params;
    const { userId } = req;

    const schema = Joi.object({
      message: Joi.string().max(500).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        status: 'error',
        message: 'Invalid data',
        error: error.details[0].message,
      });
    }

    await sendMessage(userId, id, message);

    res.send({
      status: 'Ok',
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

const getMessagesController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    const messages = await getConversation(userId, id);

    res.send({
      status: 'Ok',
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendMessageController,
  getMessagesController,
};
