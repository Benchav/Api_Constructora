const GenericService = require('./genericService');
const { getFinanzas, setFinanzas } = require('../storage/inMemoryDb');

const finanzasService = new GenericService({
  getter: getFinanzas,
  updater: setFinanzas,
  idField: 'id',
  idIsNumber: false, 
  idPrefix: 'f'
});

module.exports = finanzasService;