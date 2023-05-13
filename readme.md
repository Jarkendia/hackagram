# REQUISITOS PROYECTO

- Implementar una API que permiita publicar fotos (añadiendo o no textos) y que otras personas puedan verlas.

# USUARIO ANÓNIMOS

- Ver últimas fotos publicadas de otros
- Ver perfil de usuario con su galería de fotos
- Buscar fotos (por su texto descriptivo)
- Login / Registro

# USUARIOS REGISTRADOS

- Hacer publicación de una foto (la foto debe ajustarse automáticamente a un tamaño máximo y unas proporciones establecidas por la plataforma). Y añadirle texto descriptivo
- Hacer / Quitar LIKE a fotos

# OPCIONAL

- Gestión perfil (cambios en user)
- Comentar foto (OJO, no se permiten comentarios a comentarios)

# ENDPOINTS

- **POST /user** Registro de usuario ✅
- **GET /user/:id** Muestra el perfil del usuario con sus datos y todas sus fotos ✅
- **POST /login** Acceso usuario (devuelve token) ✅
- **POST /** Crear un post (necesita header con token) ✅
- **GET /** Ver todos los posts (con imágenes con texto o sin él) ✅
- **GET /image/:id** Devuelve un post con una imagen ✅
- **DELETE /image/:id** Borra una imagen (sólo quién la subió) ✅
- **POST /image/:imageId/like** Hacer/quitar un like a una foto ✅
- **POST /user/:id/settings** Gestión del perfil (cambios en los datos de registro)
- **POST /image/:id/comment** Comentar una foto (no se permiten comentarios a comentarios)

# COSAS A REVISAR

revisar codigos de error, status
añadir comentarios a cada funcion para que nos quede claro
añadir un Joi para que la imagen sea obligatoria
Habria que añadir un avatar a cada usuario
