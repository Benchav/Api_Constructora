const GenericService = require('./genericService');
const { getInspecciones, setInspecciones } = require('../storage/inMemoryDb');

const inspeccionesCalidadService = new GenericService({
  getter: getInspecciones,
  updater: setInspecciones,
  idField: 'id',
  idIsNumber: false,
  idPrefix: 'ic'
});

module.exports = inspeccionesCalidadService;