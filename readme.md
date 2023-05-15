# PROYECTO Hackagram (clon de Instagram)

- Implementar una API que permita publicar fotos (añadiendo o no textos) y que otras personas puedan verlas.

## Requisitos del proyecto

### Usuarios anónimos

- Ver últimas fotos publicadas de otros
- Ver perfil de usuario con su galería de fotos
- Buscar fotos (por su texto descriptivo)
- Login / Registro

### Usuarios registrados

- Hacer publicación de una foto (la foto debe ajustarse automáticamente a un tamaño máximo y unas proporciones establecidas por la plataforma). Y añadirle texto descriptivo
- Hacer / Quitar LIKE a fotos

### Opcionales

- Gestión perfil (cambios en user)
- Comentar foto (OJO, no se permiten comentarios a comentarios)

![Cabesita loka](/public/photos/imagen3.jpg)

# ENDPOINTS de Hackagram

> Ruta pública: http://localhost:4000/

- **POST /user** Registro de usuario ✅
- **GET /user/:id** Muestra el perfil del usuario (por su Id) con sus datos y todas sus fotos ✅
- **GET /user/:username** Muestra el perfil del usuario (por su username) con sus datos y todas sus fotos ✅
- **POST /login** Acceso usuario (devuelve token) ✅
- **POST /** Crear un post (necesita header con token) ✅
- **GET /** Ver todos los posts (con imágenes con texto o sin él) ✅
- **GET /image/:postText** Devuelve todos los posts que coincidan por su texto descriptivo ✅
- **DELETE /image/:id** Borra una imagen (sólo quién la subió) ✅
- **GET /uploads/** Visualiza la imagen al ponerle su nombre y extensión ✅
- **POST /image/:imageId/like** Hacer/quitar un like a una foto ✅
- **POST /image/:id/comment** Comentar una foto (no se permiten comentarios a comentarios) ✅
- **PUT /settings** Gestión del perfil (cambios en los datos de registro) ✅

# MÓDULOS INSTALADOS

## Dependencias

- [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Módulo que gestiona la encriptación de passwords
- [dotenv](https://www.npmjs.com/package/dotenv) - Módulo que carga variables desde el fichero .env en el process.env
- [express](https://www.npmjs.com/package/express) - Módulo que proporciona características fundamentales de aplicaciones web
- [express-fileupload](https://www.npmjs.com/package/express-fileupload) - Middleware express para subir ficheros
- [joi](https://www.npmjs.com/package/joi) - Validación de datos a través de esquemas
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Implementación del Json Web Token
- [morgan](https://www.npmjs.com/package/morgan) - Creación de logs para nuestra API
- [mysql2](https://www.npmjs.com/package/mysql2) - Cliente MySQL para Node.js
- [randomstring](https://www.npmjs.com/package/randomstring) - Generación de cadenas aleatorias
- [sharp](https://www.npmjs.com/package/sharp) - Gestor de imágenes

# Github del equipo involucrado

- [Gonza](https://github.com/Gonza092)
- [Oscar Bouzo](https://github.com/Jarkendia)
- [DavidSoprano](https://github.com/DavidSoprano)
- [Marcelo](https://github.com/marcelohs999)
