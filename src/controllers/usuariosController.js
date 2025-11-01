const bcrypt = require('bcryptjs');
const usuariosService = require('../services/usuariosService');
const makeController = require('./genericController');
const { validateCreateUsuario } = require('../models/usuario');

const baseController = makeController(usuariosService);


const controller = {
  list: (req, res) => {
    const items = usuariosService.findAll().map(u => {
      const copy = { ...u };
      delete copy.password;
      return copy;
    });
    res.json(items);
  },

  getById: (req, res) => {
    const { id } = req.params;
    const item = usuariosService.findById(id);
    if (!item) return res.status(404).json({ message: 'No encontrado' });
    const copy = { ...item };
    delete copy.password;
    res.json(copy);
  },

  create: async (req, res) => {
    const validation = validateCreateUsuario(req.body);
    if (!validation.ok) {
      return res.status(400).json({ message: 'Faltan campos requeridos', missing: validation.missing });
    }

    const payload = { ...req.body };
    if (payload.password) {
      const salt = await bcrypt.genSalt(10);
      payload.password = await bcrypt.hash(payload.password, salt);
    }
  
    const newUser = usuariosService.create(payload);
    const safe = { ...newUser };
    delete safe.password;
    res.status(201).json(safe);
  },

  update: baseController.update,
  remove: baseController.remove
};

module.exports = controller;