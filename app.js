// app.js
const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const { UsuarioSchema, UsuarioCreate, UsuarioUpdate } = require('./src/models/usuario');
const { ProyectoSchema, ProyectoCreate, ProyectoUpdate } = require('./src/models/proyecto');
const { InventarioItemSchema, InventarioItemCreate, InventarioItemUpdate } = require('./src/models/inventario');
const { EmpleadoSchema, EmpleadoCreate, EmpleadoUpdate } = require('./src/models/empleado');
const { FinanzaSchema, FinanzaCreate, FinanzaUpdate } = require('./src/models/finanza');
const { LicitacionSchema, LicitacionCreate, LicitacionUpdate } = require('./src/models/licitacion');
const { PlanoSchema, PlanoCreate, PlanoUpdate } = require('./src/models/plano');
const { ReporteDiarioSchema, ReporteDiarioCreate, ReporteDiarioUpdate } = require('./src/models/reporteDiario');
const { SolicitudMaterialSchema, SolicitudMaterialCreate, SolicitudMaterialUpdate } = require('./src/models/solicitudMaterial');
const { SolicitudDineroSchema, SolicitudDineroCreate, SolicitudDineroUpdate } = require('./src/models/solicitudDinero');
const { OrdenCompraSchema, OrdenCompraCreate, OrdenCompraUpdate } = require('./src/models/ordenCompra');
const { InspeccionCalidadSchema, InspeccionCalidadCreate, InspeccionCalidadUpdate } = require('./src/models/inspeccionCalidad');
const { IncidenteSeguridadSchema, IncidenteSeguridadCreate, IncidenteSeguridadUpdate } = require('./src/models/incidenteSeguridad');

const app = express();
app.use(cors());
app.use(express.json());

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
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        // nombres de schemas deben coincidir exactamente con los $ref usados en tus rutas
        Usuario: UsuarioSchema,
        UsuarioCreate: UsuarioCreate,
        UsuarioUpdate: UsuarioUpdate,

        Proyecto: ProyectoSchema,
        ProyectoCreate: ProyectoCreate,
        ProyectoUpdate: ProyectoUpdate,

        InventarioItem: InventarioItemSchema,
        InventarioItemCreate: InventarioItemCreate,
        InventarioItemUpdate: InventarioItemUpdate,

        Empleado: EmpleadoSchema,
        EmpleadoCreate: EmpleadoCreate,
        EmpleadoUpdate: EmpleadoUpdate,

        Finanza: FinanzaSchema,
        FinanzaCreate: FinanzaCreate,
        FinanzaUpdate: FinanzaUpdate,

        Licitacion: LicitacionSchema,
        LicitacionCreate: LicitacionCreate,
        LicitacionUpdate: LicitacionUpdate,

        Plano: PlanoSchema,
        PlanoCreate: PlanoCreate,
        PlanoUpdate: PlanoUpdate,

        ReporteDiario: ReporteDiarioSchema,
        ReporteDiarioCreate: ReporteDiarioCreate,
        ReporteDiarioUpdate: ReporteDiarioUpdate,

        SolicitudMaterial: SolicitudMaterialSchema,
        SolicitudMaterialCreate: SolicitudMaterialCreate,
        SolicitudMaterialUpdate: SolicitudMaterialUpdate,

        SolicitudDinero: SolicitudDineroSchema,
        SolicitudDineroCreate: SolicitudDineroCreate,
        SolicitudDineroUpdate: SolicitudDineroUpdate,

        OrdenCompra: OrdenCompraSchema,
        OrdenCompraCreate: OrdenCompraCreate,
        OrdenCompraUpdate: OrdenCompraUpdate,

        InspeccionCalidad: InspeccionCalidadSchema,
        InspeccionCalidadCreate: InspeccionCalidadCreate,
        InspeccionCalidadUpdate: InspeccionCalidadUpdate,

        IncidenteSeguridad: IncidenteSeguridadSchema,
        IncidenteSeguridadCreate: IncidenteSeguridadCreate,
        IncidenteSeguridadUpdate: IncidenteSeguridadUpdate
      }
    },
    // opcional: agregar seguridad global (si quieres que todas las rutas requieran token por defecto en la UI)
     security: [{ bearerAuth: [] }]
  },
  apis: [
    './src/routes/*.js' // tus JSDoc en rutas
  ]
};

const swaggerSpec = swaggerJsdoc(options);
console.log('Swagger schemas:', Object.keys(swaggerSpec.components?.schemas || {}));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
