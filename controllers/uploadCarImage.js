// Ejemplo de DAVID SOUTO para subir imágenes de coches

const Joi = require('joi');
const createJsonError = require('../../errors/createJsonError'); // generateError (en helpers.js)
const isAdmin = require('../../helpers/utils');
const { findCarById } = require('../../repositories/carsRepository');
const throwJsonError = require('../../errors/throwJsonError');
const {
  addImageByIdCar,
  removePrincipalByCarId,
} = require('../../repositories/carImagesRepository');
const uploadImage = require('../../helpers/uploadImage');

const schema = Joi.number().positive().integer().required();
const schemaBody = Joi.number().integer().min(0).max(1).required();
const schemaFiles = Joi.object().keys({
  imageCar: Joi.required(),
});

const uploadCarImageById = async (req, res) => {
  try {
    const { HTTP_BACKEND } = process.env;

    const { id } = req.params;
    // Validamos el id
    await schema.validateAsync(id);
    const { role } = req.auth; // .auth lo hemos definido nosotros así!!!!
    isAdmin(role);

    const car = await findCarById(id);
    if (!car) {
      throwJsonError(400, 'No existe el coche');
    }

    // Al subir una imagen tenemos un campo 'principal' true/false
    // para indicar si la imagen es la imagen que se mostrará como
    // imagen principal del coche
    const { principal } = req.body;
    await schemaBody.validateAsync(principal);

    // IMAGEN
    console.log(req.files);
    const { files } = req;
    // if (!files) //seria suficiente
    if (!files || Object.keys(files).length === 0) {
      throwJsonError(400, 'No ha seleccionado ningún fichero');
    }
    await schemaFiles.validateAsync(files);

    const { imageCar } = files;
    // Validamos formato imagen con el mimetype. Ver en uploadAvatar validacion con extension
    if (!imageCar.mimetype.startsWith('image')) {
      throwJsonError(400, 'Formato no válido');
    }
    //console.log(imageCar);
    /////
    //Procesar/trabajar la imagen
    const randomName = await uploadImage(id, imageCar.data);
    // FIN Procesado

    if (principal === '1') {
      await removePrincipalByCarId(id);
    }
    await addImageByIdCar(id, randomName, principal);

    res.status(201);
    res.send({ image: `${HTTP_BACKEND}/cars/${id}/${randomName}` });
  } catch (error) {
    createJsonError(error, res);
  }
};

module.exports = uploadCarImageById;
