const inventarioService = require('../services/inventarioService');
const makeController = require('./genericController');
const { validateCreateInventarioItem } = require('../models/inventario');

const controller = makeController(inventarioService);

// Wrap create to add validation
const originalCreate = controller.create;
controller.create = (req, res) => {
  const validation = validateCreateInventarioItem(req.body);
  if (!validation.ok) {
    return res.status(400).json({ message: 'Faltan campos requeridos', missing: validation.missing });
  }
  return originalCreate(req, res);
};

module.exports = controller;