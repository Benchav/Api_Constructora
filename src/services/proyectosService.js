// src/services/proyectosService.js
const GenericService = require('./genericService');
const { getProyectos, setProyectos } = require('../storage/inMemoryDb');

// Instanciamos el servicio genérico para la entidad 'Proyectos'
// Le decimos cómo obtener y cómo actualizar la lista de proyectos.
const proyectosService = new GenericService({
  getter: getProyectos,     // Función para obtener todos los proyectos
  updater: setProyectos,   // Función para guardar el nuevo array de proyectos
  idField: 'id',           // El campo que actúa como ID
  idIsNumber: true         // El ID es numérico (usará generateNumericId)
});

module.exports = proyectosService;