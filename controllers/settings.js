const Joi = require('joi');
const path = require('path');
const sharp = require('sharp');
const randomstring = require('randomstring');
const fs = require('fs/promises');
const bcrypt = require('bcryptjs');

const { changesUser } = require('../db/settingsdb');
const { getUserById } = require('../db/usersdb');
const { generateError, createPathIfNotExists } = require('../helpers');

const changesUserController = async (req, res, next) => {
  try {
    const { userId } = req;
    const {
      newUsername,
      newEmail,
      oldPassword,
      newPassword,
      newAvatar,
      newBio,
    } = req.body;
    const user = await getUserById(userId);

    const schema = Joi.object({
      newUsername: Joi.string().min(2).max(30),
      newEmail: Joi.string().email(),
      oldPassword: Joi.string().min(4).max(20).when('newPassword', {
        is: Joi.exist(),
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      newPassword: Joi.string().min(4).max(20),
      repeatPassword: Joi.valid(Joi.ref('newPassword')).when('newPassword', {
        is: Joi.exist(),
        then: Joi.required(),
        otherwise: Joi.optional(),
      }),
      newBio: Joi.string().min(4),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send({
        status: 'error',
        message: 'Invalid data',
        error: error.details[0].message,
      });
    }

    if (oldPassword) {
      // Comparar la contraseña anterior con la almacenada en la base de datos
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

      if (!isPasswordValid) {
        throw generateError(
          'Debes introducir tu contraseña actual para poder cambiarla.',
          400
        );
      }
    }

    if (Array.isArray(newAvatar))
      throw generateError('Debes introducir una sola imágen', 400);

    let imageFileName;

    const uploadsDir = path.join(__dirname, '../uploads/avatars');

    await createPathIfNotExists(uploadsDir);

    if (req.files && req.files.newAvatar) {
      const image = sharp(req.files.newAvatar.data);

      image.resize(300, 200).toFormat('jpg');

      const randomName = randomstring.generate(7) + '.jpg';

      imageFileName = `${randomName}`;

      image.toFile(path.join(uploadsDir, imageFileName));
    }

    if (user.avatar && req.files?.newAvatar) {
      await fs.rm(path.join(uploadsDir, user.avatar));
    }

    const changes = await changesUser(
      user,
      newUsername,
      newEmail,
      newPassword,
      imageFileName,
      newBio
    );

    res.send({
      status: 'Ok',
      data: changes,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  changesUserController,
};
