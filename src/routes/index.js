// src/routes/index.js
const express = require('express');
const router = express.Router();
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Rutas públicas
router.use('/auth', require('./auth')); // login, /auth/me (protegido internamente)

// A partir de aquí todas las rutas requieren autenticación
router.use(protect);

// Rutas protegidas — roles deben coincidir EXACTAMENTE con initialUsuarios
router.use('/usuarios', authorizeRoles('CEO', 'Gerente General', 'Director de Proyectos'), require('./usuarios'));
router.use('/proyectos', authorizeRoles('CEO', 'Director de Proyectos', 'Jefe de Obra'), require('./proyectos'));
router.use('/inventario', authorizeRoles('CEO', 'Bodeguero', 'Jefe de Logística', 'Jefe de Obra'), require('./inventario'));
router.use('/empleados', authorizeRoles('CEO', 'Gerente General', 'RRHH'), require('./empleados'));
router.use('/finanzas', authorizeRoles('CEO', 'Director Finanzas'), require('./finanzas'));
router.use('/licitaciones', authorizeRoles('CEO', 'Director Comercial'), require('./licitaciones'));
router.use('/planos', authorizeRoles('CEO', 'Jefe Oficina Tecnica', 'Maestro de Obra', 'Director de Proyectos, Albañil, Operador de Maquinaria '), require('./planos'));
router.use('/reportes', authorizeRoles('CEO', 'Jefe de Obra', 'Maestro de Obra', 'Director de Proyectos'), require('./reportesDiarios'));
router.use('/solicitudesMateriales', authorizeRoles('CEO', 'Jefe de Obra', 'Bodeguero', 'Jefe de Logística'), require('./solicitudesMateriales'));
router.use('/solicitudesDinero', authorizeRoles('CEO', 'Jefe de Obra', 'Director Finanzas'), require('./solicitudesDinero'));
router.use('/ordenescompra', authorizeRoles('CEO', 'Director Finanzas', 'Jefe de Logística'), require('./ordenesCompra'));
router.use('/inspeccionesCalidad', authorizeRoles('CEO', 'Jefe Oficina Tecnica', 'Director de Proyectos'), require('./inspeccionesCalidad'));
router.use('/incidentesSeguridad', authorizeRoles('CEO', 'Jefe de Obra', 'Gerente General', 'RRHH'), require('./incidentesSeguridad'));

module.exports = router;