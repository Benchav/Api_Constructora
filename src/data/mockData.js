// src/data/mockData.js
const {
  initialUsuarios, initialProyectos, initialInventarioObra,
  initialEmpleados, initialFinanzas, initialLicitaciones,
  initialPlanos, initialReportesDiarios, initialSolicitudesMateriales,
  initialSolicitudesDinero, initialOrdenesCompra, initialInspeccionesCalidad,
  initialIncidentesSeguridad
} = require('./data');

// Exportamos variables mutables (simulan DB) y funciones de update

let mockUsuarios = [...initialUsuarios];
let mockProyectos = [...initialProyectos];
let mockInventarioObra = [...initialInventarioObra];
let mockEmpleados = [...initialEmpleados];
let mockFinanzas = [...initialFinanzas];
let mockLicitaciones = [...initialLicitaciones];
let mockPlanos = [...initialPlanos];
let mockReportesDiarios = [...initialReportesDiarios];
let mockSolicitudesMateriales = [...initialSolicitudesMateriales];
let mockSolicitudesDinero = [...initialSolicitudesDinero];
let mockOrdenesCompra = [...initialOrdenesCompra];
let mockInspeccionesCalidad = [...initialInspeccionesCalidad];
let mockIncidentesSeguridad = [...initialIncidentesSeguridad];

// getters
const getUsuarios = () => mockUsuarios;
const getProyectos = () => mockProyectos;
const getInventario = () => mockInventarioObra;
const getEmpleados = () => mockEmpleados;
const getFinanzas = () => mockFinanzas;
const getLicitaciones = () => mockLicitaciones;
const getPlanos = () => mockPlanos;
const getReportesDiarios = () => mockReportesDiarios;
const getSolicitudesMateriales = () => mockSolicitudesMateriales;
const getSolicitudesDinero = () => mockSolicitudesDinero;
const getOrdenesCompra = () => mockOrdenesCompra;
const getInspeccionesCalidad = () => mockInspeccionesCalidad;
const getIncidentesSeguridad = () => mockIncidentesSeguridad;

// update functions (reemplazan la colección)
const updateUsuarios = (newData) => { mockUsuarios = newData; };
const updateProyectos = (newData) => { mockProyectos = newData; };
const updateInventario = (newData) => { mockInventarioObra = newData; };
const updateEmpleados = (newData) => { mockEmpleados = newData; };
const updateFinanzas = (newData) => { mockFinanzas = newData; };
const updateLicitaciones = (newData) => { mockLicitaciones = newData; };
const updatePlanos = (newData) => { mockPlanos = newData; };
const updateReportesDiarios = (newData) => { mockReportesDiarios = newData; };
const updateSolicitudesMateriales = (newData) => { mockSolicitudesMateriales = newData; };
const updateSolicitudesDinero = (newData) => { mockSolicitudesDinero = newData; };
const updateOrdenesCompra = (newData) => { mockOrdenesCompra = newData; };
const updateInspeccionesCalidad = (newData) => { mockInspeccionesCalidad = newData; };
const updateIncidentesSeguridad = (newData) => { mockIncidentesSeguridad = newData; };

module.exports = {
  // getters
  getUsuarios, getProyectos, getInventario, getEmpleados,
  getFinanzas, getLicitaciones, getPlanos, getReportesDiarios,
  getSolicitudesMateriales, getSolicitudesDinero, getOrdenesCompra,
  getInspeccionesCalidad, getIncidentesSeguridad,
  // updaters
  updateUsuarios, updateProyectos, updateInventario, updateEmpleados,
  updateFinanzas, updateLicitaciones, updatePlanos, updateReportesDiarios,
  updateSolicitudesMateriales, updateSolicitudesDinero, updateOrdenesCompra,
  updateInspeccionesCalidad, updateIncidentesSeguridad
};