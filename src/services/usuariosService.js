// src/services/usuariosService.js
const GenericService = require('./genericService');
const { getUsuarios, updateUsuarios } = require('../data/mockData');

const usuariosService = new GenericService({
  getter: getUsuarios,
  updater: updateUsuarios,
  idField: 'id',
  idIsNumber: true
});

module.exports = usuariosService;