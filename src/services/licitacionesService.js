const GenericService = require('./genericService');
const { getLicitaciones, setLicitaciones } = require('../storage/inMemoryDb');

const licitacionesService = new GenericService({
  getter: getLicitaciones,
  updater: setLicitaciones,
  idField: 'id',
  idIsNumber: false,
  idPrefix: 'l'
});

module.exports = licitacionesService;