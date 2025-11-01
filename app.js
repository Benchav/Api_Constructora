// app.js
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Importar modelos/schemas
const { UsuarioSchema, UsuarioCreate, UsuarioUpdate } = require('./src/models/usuario');
const { ProyectoSchema, ProyectoCreate, ProyectoUpdate } = require('./src/models/proyecto');
const {InventarioItemSchema, InventarioItemCreate, InventarioItemUpdate} = require('./src/models/inventario');
const {EmpleadoSchema, EmpleadoCreate, EmpleadoUpdate} = require('./src/models/empleado');
const {FinanzaSchema, FinanzaCreate, FinanzaUpdate} = require ('./src/models/finanza');
const {LicitacionSchema, LicitacionCreate, LicitacionUpdate} = require('./src/models/licitacion');
const {PlanoSchema, PlanoCreate, PlanoUpdate} = require('./src/models/plano');
const {ReporteDiarioSchema, ReporteDiarioCreate, ReporteDiarioUpdate} = require('./src/models/reporteDiario');

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

        Poyecto: ProyectoSchema,
        ProyectoCreate: ProyectoCreate,
        ProyectoUpdate: ProyectoUpdate,

        InventarioItem: InventarioItemSchema,
        InventarioItemCreate: InventarioItemCreate,
        InventarioItemUpdate: InventarioItemUpdate,

        Empleado : EmpleadoSchema,
        EmpleadoCreate: EmpleadoCreate,
        EmpleadoUpdate: EmpleadoUpdate,

        Finanza : FinanzaSchema,
        FinanzaCreate: FinanzaCreate,
        FinanzaUpdate: FinanzaUpdate,

        Licitacion: LicitacionSchema,
        LicitacionCreate: LicitacionCreate,
        LicitacionUpdate: LicitacionUpdate,

        Planos: PlanoSchema,
        PlanoCreate: PlanoCreate,
        PlanoUpdate: PlanoUpdate,

        ReporteDiarios: ReporteDiarioSchema,
        ReporteDiarioCreate: ReporteDiarioCreate,
        ReporteDiarioUpdate: ReporteDiarioUpdate,
        
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