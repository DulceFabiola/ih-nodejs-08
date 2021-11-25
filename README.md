# Creación de LOGIN y gestión de sesiones

## a. Creación de vista LOGIN

## b. Crear la ruta GET de LOGIN

## c. Crear la ruta POST de LOGIN

      - Realizar parcialmente la ruta con verificación de contraseña
      - Creación de archivo “sesión” (session.js)
            - express-session
            - mongoconnect
      - Integrarlo en index.js
      - Integrarlo directamente en la ruta de POST
      - Verficar sesión en navegador (cookie) y MongoDB (session)

## d. Cerrar sesión

      - Arreglos en el Header del proyecto y su <nav>
      - Ruteo de POST para cerrar sesión

## e. Patrón de autorización (Áreas privadas de la plataforma)

      - Determinación de roles (visitantes (no registrados) y usuarios (registrados))
      - Route-guard (isLoggedIn vs isLoggedOut)
      - Verificar que en el Header aparezca un “Hola {{nombre}}”
