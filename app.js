// app.js
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Importar modelos/schemas
const { UsuarioSchema, UsuarioCreate, UsuarioUpdate } = require('./src/models/usuario');
const { ProyectoSchema, ProyectoCreate, ProyectoUpdate } = require('./src/models/proyecto');

const app = express();
app.use(cors());
app.use(express.json());

// Montar rutas
app.use('/api', routes);

app.get('/', (req, res) => {
  res.send({ message: 'API en memoria (construcción) - /api' });
});

// Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Construcción - En Memoria',
      version: '1.0.0',
      description: 'API REST en memoria para tu Frontend'
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      schemas: {
        // Inyectamos aquí los schemas importados desde models
        Usuario: UsuarioSchema,
        UsuarioCreate: UsuarioCreate,
        UsuarioUpdate: UsuarioUpdate,

        Proyecto: ProyectoSchema,
        ProyectoCreate: ProyectoCreate,
        ProyectoUpdate: ProyectoUpdate
        // Aquí más schemas cuando los agregues: InventarioItem, etc.
      }
    }
  },
  apis: [
    './src/routes/*.js' // dejar los JSDoc en las rutas (path & operations)
  ]
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;