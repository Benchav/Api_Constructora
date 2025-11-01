// src/routes/usuarios.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/usuariosController');

/**
 * @openapi
 * tags:
 *   - name: Usuarios
 *     description: Operaciones sobre usuarios
 */

/**
 * @openapi
 * /api/usuarios:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener lista de usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 */
router.get('/', ctrl.list);

/**
 * @openapi
 * /api/usuarios:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Crear nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioCreate'
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 */
router.post('/', ctrl.create);

/**
 * @openapi
 * /api/usuarios/{id}:
 *   put:
 *     tags:
 *       - Usuarios
 *     summary: Actualizar usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioUpdate'
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 */
router.put('/:id', ctrl.update);

/**
 * @openapi
 * /api/usuarios/{id}:
 *   delete:
 *     tags:
 *       - Usuarios
 *     summary: Eliminar usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Eliminado
 */
router.delete('/:id', ctrl.remove);

router.get('/:id', ctrl.getById);

module.exports = router;
