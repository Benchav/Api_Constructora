// src/storage/inMemoryDb.js
// Estado mutable en memoria. Inicializa con los seeds desde src/data/index.js

const {
  initialUsuarios,
  initialProyectos,
  initialInventarioObra,
  initialEmpleados,
  initialFinanzas,
  initialLicitaciones,
  initialPlanos,
  initialReportesDiarios,
  initialSolicitudesMateriales,
  initialSolicitudesDinero,
  initialOrdenesCompra,
  initialInspeccionesCalidad,
  initialIncidentesSeguridad
} = require('../data/index'); // src/data/index.js que exporta todo

// Inicializamos el "estado" en memoria copiando los seeds
let usuarios = Array.isArray(initialUsuarios) ? [...initialUsuarios] : [];
let proyectos = Array.isArray(initialProyectos) ? [...initialProyectos] : [];
let inventario = Array.isArray(initialInventarioObra) ? [...initialInventarioObra] : [];
let empleados = Array.isArray(initialEmpleados) ? [...initialEmpleados] : [];
let finanzas = Array.isArray(initialFinanzas) ? [...initialFinanzas] : [];
let licitaciones = Array.isArray(initialLicitaciones) ? [...initialLicitaciones] : [];
let planos = Array.isArray(initialPlanos) ? [...initialPlanos] : [];
let reportes = Array.isArray(initialReportesDiarios) ? [...initialReportesDiarios] : [];
let solicitudesMateriales = Array.isArray(initialSolicitudesMateriales) ? [...initialSolicitudesMateriales] : [];
let solicitudesDinero = Array.isArray(initialSolicitudesDinero) ? [...initialSolicitudesDinero] : [];
let ordenesCompra = Array.isArray(initialOrdenesCompra) ? [...initialOrdenesCompra] : [];
let inspecciones = Array.isArray(initialInspeccionesCalidad) ? [...initialInspeccionesCalidad] : [];
let incidentes = Array.isArray(initialIncidentesSeguridad) ? [...initialIncidentesSeguridad] : [];

module.exports = {
  // Usuarios
  getUsuarios: () => usuarios,
  setUsuarios: (newArr) => { usuarios = newArr; },

  // Proyectos
  getProyectos: () => proyectos,
  setProyectos: (newArr) => { proyectos = newArr; },

  // Inventario
  getInventario: () => inventario,
  setInventario: (newArr) => { inventario = newArr; },

  // Empleados
  getEmpleados: () => empleados,
  setEmpleados: (newArr) => { empleados = newArr; },

  // Finanzas
  getFinanzas: () => finanzas,
  setFinanzas: (newArr) => { finanzas = newArr; },

  // Licitaciones
  getLicitaciones: () => licitaciones,
  setLicitaciones: (newArr) => { licitaciones = newArr; },

  // Planos
  getPlanos: () => planos,
  setPlanos: (newArr) => { planos = newArr; },

  // Reportes diarios
  getReportes: () => reportes,
  setReportes: (newArr) => { reportes = newArr; },

  // Solicitudes materiales
  getSolicitudesMateriales: () => solicitudesMateriales,
  setSolicitudesMateriales: (newArr) => { solicitudesMateriales = newArr; },

  // Solicitudes dinero
  getSolicitudesDinero: () => solicitudesDinero,
  setSolicitudesDinero: (newArr) => { solicitudesDinero = newArr; },

  // Ordenes de compra
  getOrdenesCompra: () => ordenesCompra,
  setOrdenesCompra: (newArr) => { ordenesCompra = newArr; },

  // Inspecciones
  getInspecciones: () => inspecciones,
  setInspecciones: (newArr) => { inspecciones = newArr; },

  // Incidentes
  getIncidentes: () => incidentes,
  setIncidentes: (newArr) => { incidentes = newArr; }
};