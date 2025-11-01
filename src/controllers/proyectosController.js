// src/controllers/proyectosController.js
const proyectosService = require('../services/proyectosService');
const makeController = require('./genericController');
const { validateCreateProyecto } = require('../models/proyecto');
// Eliminamos la importación de idGenerator porque no la usamos aquí

// Creamos el controlador genérico pasándole el servicio de proyectos
const controller = makeController(proyectosService);

// Sobrescribimos el método 'create' para añadir validación
const originalCreate = controller.create;

controller.create = (req, res) => {
  const validation = validateCreateProyecto(req.body);
  if (!validation.ok) {
    return res.status(400).json({ message: 'Faltan campos requeridos', missing: validation.missing });
  }

  // Lógica de negocio específica: Asignar 'avance' si no viene
  // Modificamos directamente req.body, tal como lo haría el middleware
  if (req.body.avance === undefined) {
    req.body.avance = 0; // Valor por defecto
  }

  // Llamamos al 'create' original (del controlador genérico)
  return originalCreate(req, res);
};

module.exports = controller;