const GenericRepository = require('./genericRepository');
const db = require('../storage/inMemoryDb');

module.exports = new GenericRepository(db.getInventario, db.setInventario, 'id');