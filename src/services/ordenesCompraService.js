const GenericService = require('./genericService');
const { getOrdenesCompra, setOrdenesCompra } = require('../storage/inMemoryDb');

const ordenesCompraService = new GenericService({
  getter: getOrdenesCompra,
  updater: setOrdenesCompra,
  idField: 'id',
  idIsNumber: false,
  idPrefix: 'oc'
});

module.exports = ordenesCompraService;