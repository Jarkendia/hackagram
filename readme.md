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
- **GET /user/:id** Muestra el perfil del usuario con sus datos y todas sus fotos
- **POST /login** Acceso usuario (devuelve token)✅
- **POST /** Crear un post (necesita header con token)
- **GET /** Ver todos los posts (con imágenes con texto o sin él) || FOLLOWS
- **GET /image/:id** Devuelve un post con una imagen
- **DELETE /image/:id** Borra una imagen (sólo quién la subió)
- **GET /image/:id/like/:sum** Muestra cuántos likes tiene una foto

<!-- imagen/1/user/1/like
imagen/1/user/2/null
imagen/1/user/3/like
imagen/1/user/4/like
imagen/1/user/5/porelculotelahinco
imagen/1/user/6/null

GET imagen/1/like/3 -->

# DUDAS para SAMU aka Patata-Lover

- El path del config para el .env
- Revisar GET/POST images
