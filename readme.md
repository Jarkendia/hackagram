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

### Futuros cambios

- hay que añadir otra ruta GET a los mensajes para que te de un array de objetos con todos los usuarios con los que tienes conversaciones y tambien el ultimo mensaje que tienes en cada conversacion.
- borrar una cuenta y todas sus fotos.
- añadir un campo en users de cuentra privada o publica, si la tiene publica todo el mundo incluso los que no esten .registrados pueden ver su perfil completo y sus fotos, tambien pueden darle follow pero si la tiene privada solo pueden ver la foto del avatar y el nombre de usuario, para que pueda ver el perfil completo y sus fotos tiene que darle follow y el tiene que aceptarle.
- los messages no se si que los envie cualquier persona si tienes el perfil en privado o solo las que te sigan.
- añadir una blacklist para usuarios bloqueados.
- añadir historys que puedas subir un video corto o una foto y se borre a las 24 horas, molaria si tambien se le pudiera dar like y comentar.
- añadir etiquetas (tags#)
- habria que revisar todas las funciones.
- tal vez habria que estructurar todo de otra manera con mas carpetas.
- añadir editAt a los comentarios y poder borrarlos si son tuyos.
- añadir likes a los comentarios.

### Cambios realizados

- se ha modificado initdb, se le han añadido unos cuantos campos a users(REVISARLO).
- tambien se han añadido las tablas follows, messages y commentsToComments(REVISARLO).
- tambien se ha modificado el .env y debeis registraros en mailjet(REVISARLO).
- se han terminado las settings de momento, puedes cambiar todos tus datos, tambien añadir o cambiar tu avatar.
- para poder cambiar tu password necesitaras proporcionarle antes el oldPasword(enviarle un JSON desde postman con oldPassword, newPassword y repeatPassword)
- se ha añadido la verificacion del email al crear un usuario o al cambiar el email en las settings.
- tambien añadi una ruta nueva para verificar el email con un "GET", en el que debereis pasarle el codigo que esta guardado en la base de datos como "verification_code" y enviarselo a esta ruta para verificar el email poniendo el codigo donde esta :code
- tambien añadi un middleware que se pone a continuacion de "authUser" y no te deja por ejemplo crear una nueva foto sin verificar antes tu cuenta.
- añadi los archivos de follows y termine sus funcionalidades(de momento).
- añadi una nueva ruta arriba del todo, en la que se ven todos los usuarios, la cantidad de followers y followings que tiene, los username de los followers y followings, con las fotos de cada usuario, y los likes y comentarios de cada usuario, echarle un ojo.
- añadi las funciones para escribir un message a otro usuario y para ver los messages que tienes con el usuario con la id que pongas en los params.
- añadi 2 rutas nuevas para las funciones, una con una petición "POST" y otra con "GET"
- añadi el archivo y las funciones necesarias para comentar los comentarios, si haceis un GET localhost:4000/ os saldran todas las fotos con los comentarios y los comentarios a comentarios.
- añadi un archivo "fillOutDataBase" que rellene los datos con varios usuarios, ya verificados, con fotos creadas,...
- corregido que saliera un error status 500 al buscar alguna foto que no existiera, darle like a alguna foto que no exista, era un fallo en la funcion "generateError" en "error.httpStatus = status;" en el middleware de errores teniamos en el res.status: "error.httpStatusCode", corregido esto ya lanza bien el estado de error.

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
- **GET /users** Se ven todos los usuarios, sus followers y followings, sus fotos, a cada foto su comentario y like, a cada comentario su comentario...
- **POST /follow/:id** Seguir a un usuario por su id o dejar de seguirle.
- **POST /message/:id** Escribir un mensaje a un usuario por su id
- **GET /messages/:id** Ver todos los mensajes que enviaste y te envio un usuario por su id
- **POST /comment/:id** Comentar un comentario.

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
