const GenericService = require('./genericService');
const { getSolicitudesMateriales, setSolicitudesMateriales } = require('../storage/inMemoryDb');

const solicitudesMaterialesService = new GenericService({
  getter: getSolicitudesMateriales,
  updater: setSolicitudesMateriales,
  idField: 'id',
  idIsNumber: false,
  idPrefix: 'sm'
});

module.exports = solicitudesMaterialesService;