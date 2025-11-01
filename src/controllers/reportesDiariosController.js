const reportesDiariosService = require('../services/reportesDiariosService');
const makeController = require('./genericController');
const { validateCreateReporteDiario } = require('../models/reporteDiario');

const controller = makeController(reportesDiariosService);


const originalCreate = controller.create;
controller.create = (req, res) => {
  const validation = validateCreateReporteDiario(req.body);
  if (!validation.ok) {
    return res.status(400).json({ message: 'Faltan campos requeridos', missing: validation.missing });
  }
  return originalCreate(req, res);
};

module.exports = controller;