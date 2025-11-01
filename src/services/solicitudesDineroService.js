const GenericService = require('./genericService');
const { getSolicitudesDinero, setSolicitudesDinero } = require('../storage/inMemoryDb');

const solicitudesDineroService = new GenericService({
  getter: getSolicitudesDinero,
  updater: setSolicitudesDinero,
  idField: 'id',
  idIsNumber: false,
  idPrefix: 'sd'
});

module.exports = solicitudesDineroService;