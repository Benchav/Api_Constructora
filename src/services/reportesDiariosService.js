const GenericService = require('./genericService');
const { getReportes, setReportes } = require('../storage/inMemoryDb');

const reportesDiariosService = new GenericService({
  getter: getReportes,
  updater: setReportes,
  idField: 'id',
  idIsNumber: false,
  idPrefix: 'r'
});

module.exports = reportesDiariosService;