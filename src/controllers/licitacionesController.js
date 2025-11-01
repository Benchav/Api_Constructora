const licitacionesService = require('../services/licitacionesService');
const makeController = require('./genericController');
const { validateCreateLicitacion } = require('../models/licitacion');

const controller = makeController(licitacionesService);


const originalCreate = controller.create;
controller.create = (req, res) => {
  const validation = validateCreateLicitacion(req.body);
  if (!validation.ok) {
    return res.status(400).json({ message: 'Faltan campos requeridos', missing: validation.missing });
  }
  return originalCreate(req, res);
};

module.exports = controller;