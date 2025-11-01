const solicitudesDineroService = require('../services/solicitudesDineroService');
const makeController = require('./genericController');
const { validateCreateSolicitudDinero } = require('../models/solicitudDinero');

const controller = makeController(solicitudesDineroService);


const originalCreate = controller.create;
controller.create = (req, res) => {
  const validation = validateCreateSolicitudDinero(req.body);
  if (!validation.ok) {
    return res.status(400).json({ message: 'Faltan campos requeridos', missing: validation.missing });
  }
  
  
  if (req.body.estado === undefined) {
    req.body.estado = 'Pendiente'; 
  }

  return originalCreate(req, res);
};

module.exports = controller;