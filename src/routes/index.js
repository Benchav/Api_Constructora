// src/routes/index.js
const express = require('express');
const router = express.Router();

router.use('/usuarios', require('./usuarios'));
router.use('/proyectos', require('./proyectos'));
router.use('/inventario', require('./inventario'));
router.use('/empleados', require('./empleados'));
router.use('/finanzas', require('./finanzas'));
router.use('/licitaciones', require('./licitaciones'));
router.use('/planos', require('./planos'));
router.use('/reportes', require('./reportesDiarios'));
router.use('/solicitudesMateriales', require('./solicitudesMateriales'));
router.use('/solicitudesDinero', require('./solicitudesDinero'));
/*
router.use('/ordenes-compra', require('./ordenesCompra'));
router.use('/inspecciones', require('./inspecciones'));
router.use('/incidentes', require('./incidentes'));*/

module.exports = router;