// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getUsuarios } = require('../storage/inMemoryDb');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'secretito';

function login(req, res) {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'username y password son requeridos' });

  const user = getUsuarios().find(u => String(u.username).trim() === String(username).trim());
  if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

  // ✅ Usa bcrypt.compareSync porque tus contraseñas están hasheadas
  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Credenciales inválidas' });

  // Generar token
  const token = jwt.sign({ id: user.id, rol: user.rol }, SECRET, { expiresIn: '7d' });

  const safeUser = { ...user };
  delete safeUser.password;

  return res.json({ token, user: safeUser });
}

function me(req, res) {
  const safe = { ...req.user };
  delete safe.password;
  res.json({ user: safe });
}

module.exports = { login, me };