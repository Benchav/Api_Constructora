const GenericService = require('./genericService');
const { getUsuarios, setUsuarios } = require('../storage/inMemoryDb');

const usuariosService = new GenericService({
  getter: getUsuarios,
  updater: setUsuarios,
  idField: 'id',
  idIsNumber: true
});

module.exports = usuariosService;