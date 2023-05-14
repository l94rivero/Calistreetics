# CaliStreetics - Web App

CaliStreetics es una aplicación web que conecta a personas de todo el mundo que practican deportes de calistenia u otros. La aplicación tiene como objetivo principal facilitar la conexión entre usuarios que buscan hacer ejercicio juntos, así como conectar usuarios profesionales con aquellos que buscan servicios de entrenamiento o asesoramiento.
Características

    Ubicación en tiempo real: La aplicación permite a los usuarios ubicarse en tiempo real para que puedan encontrarse en un lugar y hacer ejercicio juntos.
    Registro de usuarios profesionales: Los usuarios profesionales pueden registrarse para ofrecer servicios de entrenamiento y ser puntuados por los usuarios que utilizan sus servicios.
    Registro de usuarios normales: Los usuarios normales pueden registrarse para contratar servicios, puntuar y recomendar a profesionales por la misma web app.
    App global: La aplicación está disponible en todo el mundo para involucrar a usuarios de diferentes países.
    Recompensas: Los usuarios son recompensados por utilizar la aplicación en criptomonedas.

Tecnologías

CaliStreetics se desarrolló utilizando las siguientes tecnologías:

    Front-end: HTML, CSS, JavaScript, React.js
    Back-end: Node.js, Express.js, MySQL
    Autenticación y seguridad: JSON Web Tokens (JWT), bcrypt

Instalación

Para instalar CaliStreetics en su máquina local, siga estos pasos:

    Clone el repositorio git clone https://github.com/nombre_usuario/calistreetics.git
    Ingrese a la carpeta del proyecto cd calistreetics
    Instale las dependencias del front-end cd client && npm install
    Instale las dependencias del back-end cd ../server && npm install
    Inicie el servidor npm start

Descripción de la estructura

    client/: contiene la parte de front-end de la aplicación, desarrollada en React.js. Dentro de esta carpeta se encuentran los archivos HTML, CSS, JavaScript, componentes, páginas y servicios.
    server/: contiene la parte de back-end de la aplicación, desarrollada en Node.js y Express.js. Dentro de esta carpeta se encuentran los controladores, middleware, modelos, rutas y utilidades.
    .env: archivo que contiene las variables de entorno necesarias para la aplicación.
    .gitignore: archivo que especifica los archivos y carpetas que no deben ser incluidos en el repositorio.
    package.json: archivo que especifica las dependencias y scripts necesarios para la aplicación.
    package-lock.json: archivo generado automáticamente por npm para asegurar la compatibilidad de versiones de las dependencias.
    README.md: archivo que contiene la documentación del proyecto.

Contribución

Si desea contribuir a CaliStreetics, puede enviar una solicitud de extracción (Pull Request) con sus cambios. Antes de enviar la solicitud de extracción, asegúrese de que su código cumpla con las siguientes pautas:

    Siga los estándares de codificación del proyecto.
    Incluya pruebas para cualquier nueva funcionalidad o corrección de errores.
    Asegúrese de que todas las pruebas pasen antes de enviar la solicitud de extracción.

Licencia

CaliStreetics se distribuye bajo la Licencia MIT. Consulte el archivo LICENSE para obtener más información.
