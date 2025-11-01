const GenericService = require('./genericService');
const { getProyectos, setProyectos } = require('../storage/inMemoryDb');


const proyectosService = new GenericService({
  getter: getProyectos,     
  updater: setProyectos,   
  idField: 'id',           
  idIsNumber: true         
});

module.exports = proyectosService;