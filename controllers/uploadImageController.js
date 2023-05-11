// Ejemplo de DAVID SOUTO para subir imágenes mediante una función general

const randomstring = require('randomstring');
const path = require('path');
const sharp = require('sharp');
// ensureDir se asegura que el directorio exista (si no está, lo crea). Forma parte del módulo fs-extra
const { ensureDir } = require('fs-extra');

const uploadImage = async (id, imageData) => {
  const uploadDirectory = path.join(__dirname, '../public/photos', id);
  console.log(uploadDirectory);
  ensureDir(uploadDirectory);
  const image = sharp(imageData);
  const randomName = randomstring.generate(7) + '.jpg';
  console.log(randomName);

  await image
    .resize(500, 500)
    .toFormat('jpg')
    .toFile(path.join(uploadDirectory, randomName));

  return randomName;
};

module.exports = uploadImage;
