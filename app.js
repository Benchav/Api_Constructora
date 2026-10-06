const express = require('express');
const cors = require('cors');
const routes = require('./src/routes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

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

// Seguridad HTTP básica: permitir llamadas cross-origin y deshabilitar CSP en API REST
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: false
}));

const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:4173',
  'https://rikiconstructora.vercel.app'
];

const envOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(o => o.trim()).filter(Boolean)
  : [];

const allowedOrigins = Array.from(new Set([...defaultOrigins, ...envOrigins]));

const corsOptions = {
  origin: (origin, callback) => {
    // Permitir requests sin origin (como Postman, scripts server-side)
    if (!origin) return callback(null, true);
    // Permitir orígenes configurados o cualquier preview de rikiconstructora en Vercel
    if (allowedOrigins.includes(origin) || /^https:\/\/rikiconstructora.*\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
};
app.use(cors(corsOptions));

app.use(express.json({ limit: '2mb' })); // Prevenir payloads excesivamente grandes
app.use(cookieParser());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.send({ message: 'API en linea (construcción) - /api' });
});

// Swagger options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Construcción en Linea',
      version: '1.0.0',
      description: 'API REST en Linea para tu Frontend'
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
    
     security: [{ bearerAuth: [] }]
  },
  apis: [
    './src/routes/*.js' 
  ]
};

const swaggerSpec = swaggerJsdoc(options);
console.log('Swagger schemas:', Object.keys(swaggerSpec.components?.schemas || {}));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;