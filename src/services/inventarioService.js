const GenericService = require('./genericService');
const { getInventario, setInventario } = require('../storage/inMemoryDb');

const inventarioService = new GenericService({
  getter: getInventario,
  updater: setInventario,
  idField: 'id',
  idIsNumber: true
});

module.exports = inventarioService;