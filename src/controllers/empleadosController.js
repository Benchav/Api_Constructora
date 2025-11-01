const empleadosService = require('../services/empleadosService');
const makeController = require('./genericController');
const { validateCreateEmpleado } = require('../models/empleado');

const controller = makeController(empleadosService);


const originalCreate = controller.create;
controller.create = (req, res) => {
  const validation = validateCreateEmpleado(req.body);
  if (!validation.ok) {
    return res.status(400).json({ message: 'Faltan campos requeridos', missing: validation.missing });
  }
  

  if (!req.body.proyectoAsignadoId) {
    req.body.proyectoAsignadoId = null; 
  }

  return originalCreate(req, res);
};

module.exports = controller;