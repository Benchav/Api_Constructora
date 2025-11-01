// src/storage/inMemoryDb.js
const bcrypt = require('bcryptjs');
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
} = require('../data/index');

// Helper: detecta si ya está hasheado (bcrypt)
function isHashed(password) {
  return typeof password === 'string' && /^\$2[aby]\$/.test(password);
}

// Hashear seeds si es necesario (sincrónico para simplicidad)
const usuariosHashed = (Array.isArray(initialUsuarios) ? initialUsuarios : []).map(u => {
  const copy = { ...u };
  if (copy.password && !isHashed(copy.password)) {
    copy.password = bcrypt.hashSync(String(copy.password), 10);
  }
  return copy;
});

let usuarios = [...usuariosHashed];
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
  
  getUsuarios: () => usuarios,
  setUsuarios: (newArr) => { usuarios = newArr; },

 
  getProyectos: () => proyectos,
  setProyectos: (newArr) => { proyectos = newArr; },

 
  getInventario: () => inventario,
  setInventario: (newArr) => { inventario = newArr; },

  getEmpleados: () => empleados,
  setEmpleados: (newArr) => { empleados = newArr; },

 
  getFinanzas: () => finanzas,
  setFinanzas: (newArr) => { finanzas = newArr; },


  getLicitaciones: () => licitaciones,
  setLicitaciones: (newArr) => { licitaciones = newArr; },

 
  getPlanos: () => planos,
  setPlanos: (newArr) => { planos = newArr; },


  getReportes: () => reportes,
  setReportes: (newArr) => { reportes = newArr; },


  getSolicitudesMateriales: () => solicitudesMateriales,
  setSolicitudesMateriales: (newArr) => { solicitudesMateriales = newArr; },


  getSolicitudesDinero: () => solicitudesDinero,
  setSolicitudesDinero: (newArr) => { solicitudesDinero = newArr; },


  getOrdenesCompra: () => ordenesCompra,
  setOrdenesCompra: (newArr) => { ordenesCompra = newArr; },


  getInspecciones: () => inspecciones,
  setInspecciones: (newArr) => { inspecciones = newArr; },


  getIncidentes: () => incidentes,
  setIncidentes: (newArr) => { incidentes = newArr; }
};