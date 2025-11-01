# API de Constructora (Node.js, Express, Firebase)

Esta es una API RESTful robusta diseñada para gestionar los recursos y operaciones de una empresa constructora. El backend está construido con Node.js y Express, y utiliza **Firebase Firestore** como base de datos principal para la persistencia de datos.

El proyecto incluye un sistema completo de autenticación de usuarios basado en **JSON Web Tokens (JWT)** y un sistema de **permisos basado en roles** personalizado para proteger los *endpoints*.

## Características Principales

* **Servidor RESTful**: Operaciones CRUD completas para 13+ entidades (Proyectos, Usuarios, Inventario, Finanzas, etc.).
* **Base de Datos en la Nube**: Conectado a **Firebase Firestore** para una base de datos NoSQL, escalable y en tiempo real.
* **Autenticación y Seguridad**: Endpoints protegidos con JWT. La ruta `/api/auth/login` genera un token.
* **Autorización por Roles**: Middleware personalizado (`authMiddleware.js`) que gestiona permisos granulares por rol de usuario (ej. `CEO`, `Jefe de Obra`, `RRHH`, etc.).
* **Arquitectura Limpia**: Código organizado por capas (Rutas, Controladores, Servicios, Modelos) para fácil mantenimiento.
* **Documentación**: Documentación interactiva de la API generada automáticamente con Swagger en la ruta `/docs`.
* **Variables de Entorno**: Configuración segura usando archivos `.env`.
* **Contraseñas Seguras**: Las contraseñas de los usuarios se encriptan (hashean) usando `bcrypt` antes de guardarse en la base de datos.

##  Tecnologías Utilizadas

* **Backend**: Node.js, Express.js
* **Base de Datos**: Firebase Firestore (NoSQL)
* **Autenticación**: JSON Web Tokens (`jsonwebtoken`), `bcrypt.js` (para hasheo)
* **Documentación de API**: `swagger-jsdoc`, `swagger-ui-express`
* **Variables de Entorno**: `dotenv`
* **Desarrollo**: `nodemon` para recarga automática.

---

##  Configuración del Proyecto

Para ejecutar este proyecto localmente, necesitarás configurar tus variables de entorno.

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/Benchav/Api_Constructora.git
    cd Api_Constructora
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno (.env):**
    Crea un archivo `.env` en la raíz del proyecto y añade las siguientes claves. 


##  Ejecución de la API

```bash
npm run dev
```

## Hecha por:## Joshua Chavez
## Portafolio#
https://joshuachavez.vercel.app/