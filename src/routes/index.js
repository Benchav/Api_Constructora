const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');


router.use('/auth', require('./auth'));


router.use(protect);



router.use(
  '/usuarios',
  authorizeRoles('CEO', 'Gerente General', 'Director de Proyectos', 'RRHH'),
  require('./usuarios')
);


router.use(
  '/proyectos',
  authorizeRoles(
    'CEO',
    'Gerente General',
    'Director de Proyectos',
    'Director Finanzas',
    'Director Comercial',
    'Jefe Oficina Tecnica',
    'Jefe de Logística',
    'Jefe de Obra',
    'Maestro de Obra',
    'Bodeguero',
    'Asistente Administrativo',
    'Albañil',
    'Operador de Maquinaria'
  ),
  require('./proyectos')
);

// Inventario
router.use(
  '/inventario',
  authorizeRoles('CEO', 'Gerente General', 'Director de Proyectos', 'Jefe de Logística', 'Jefe de Obra', 'Bodeguero'),
  require('./inventario')
);

// Empleados
router.use(
  '/empleados',
  authorizeRoles('CEO', 'Gerente General', 'Director de Proyectos', 'RRHH', 'Asistente Administrativo'),
  require('./empleados')
);

// Finanzas
router.use(
  '/finanzas',
  authorizeRoles('CEO', 'Director Finanzas', 'Gerente General', 'Director de Proyectos', 'Asistente Administrativo'),
  require('./finanzas')
);

// Licitaciones
router.use(
  '/licitaciones',
  authorizeRoles('CEO', 'Gerente General', 'Director Comercial'),
  require('./licitaciones')
);

// Planos y documentos
router.use(
  '/planos',
  authorizeRoles(
    'CEO',
    'Gerente General',
    'Director de Proyectos',
    'Jefe Oficina Tecnica',
    'Jefe de Obra',
    'Maestro de Obra',
    'Albañil',
    'Operador de Maquinaria'
  ),
  require('./planos')
);

// Reportes diarios
router.use(
  '/reportes',
  authorizeRoles('CEO', 'Gerente General', 'Director de Proyectos', 'Jefe de Obra', 'Maestro de Obra'),
  require('./reportesDiarios')
);

// Solicitudes de materiales
router.use(
  '/solicitudesMateriales',
  authorizeRoles('CEO', 'Gerente General', 'Director de Proyectos', 'Director Finanzas', 'Jefe de Obra', 'Jefe de Logística', 'Bodeguero'),
  require('./solicitudesMateriales')
);

// Solicitudes de dinero
router.use(
  '/solicitudesDinero',
  authorizeRoles('CEO', 'Gerente General', 'Director de Proyectos', 'Director Finanzas', 'Gerente General', 'Jefe de Obra', 'Asistente Administrativo'),
  require('./solicitudesDinero')
);

// Órdenes de compra
router.use(
  '/ordenescompra',
  authorizeRoles('CEO', 'Director Finanzas', 'Gerente General', 'Jefe de Logística'),
  require('./ordenesCompra')
);

// Inspecciones de calidad
router.use(
  '/inspeccionesCalidad',
  authorizeRoles('CEO', 'Director de Proyectos', 'Jefe Oficina Tecnica', 'Jefe de Obra'),
  require('./inspeccionesCalidad')
);

// Incidentes de seguridad
router.use(
  '/incidentesSeguridad',
  authorizeRoles('CEO', 'Gerente General', 'Director de Proyectos', 'RRHH', 'Maestro de Obra', 'Jefe de Obra'),
  require('./incidentesSeguridad')
);

module.exports = router;