const usuariosService = require('./usuariosService');

function findByUsername(username) {
  const arr = usuariosService.findAll();
  return arr.find(u => String(u.username) === String(username));
}

function getUserById(id) {
  return usuariosService.findById(id);
}

module.exports = { findByUsername, getUserById };