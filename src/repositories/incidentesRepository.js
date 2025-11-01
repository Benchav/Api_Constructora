const GenericRepository = require('./genericRepository');
const db = require('../storage/inMemoryDb');

module.exports = new GenericRepository(db.getIncidentes, db.setIncidentes, 'id');