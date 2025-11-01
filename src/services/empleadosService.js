const GenericService = require('./genericService');
const { getEmpleados, setEmpleados } = require('../storage/inMemoryDb');

const empleadosService = new GenericService({
  getter: getEmpleados,
  updater: setEmpleados,
  idField: 'id',
  idIsNumber: true
});

module.exports = empleadosService;