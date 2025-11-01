const GenericService = require('./genericService');
const { getIncidentes, setIncidentes } = require('../storage/inMemoryDb');

const incidentesSeguridadService = new GenericService({
  getter: getIncidentes,
  updater: setIncidentes,
  idField: 'id',
  idIsNumber: false,
  idPrefix: 'is'
});

module.exports = incidentesSeguridadService;