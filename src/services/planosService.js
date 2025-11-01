const GenericService = require('./genericService');
const { getPlanos, setPlanos } = require('../storage/inMemoryDb');

const planosService = new GenericService({
  getter: getPlanos,
  updater: setPlanos,
  idField: 'id',
  idIsNumber: false,
  idPrefix: 'p'
});

module.exports = planosService;