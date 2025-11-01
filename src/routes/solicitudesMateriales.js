// src/routes/solicitudesMateriales.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/solicitudesMaterialesController');

/**
 * @swagger
 * tags:
 *   - name: SolicitudesMateriales
 *     description: Operaciones sobre solicitudes de materiales
 */

/**
 * @swagger
 * /api/SolicitudesMateriales:
 *   get:
 *     tags:
 *       - SolicitudesMateriales
 *     summary: Obtener lista de solicitudes de materiales
 *     responses:
 *       "200":
 *         description: Lista de solicitudes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SolicitudMaterial'
 */
router.get('/', ctrl.list);

/**
 * @swagger
 * /api/SolicitudesMateriales:
 *   post:
 *     tags:
 *       - SolicitudesMateriales
 *     summary: Crear nueva solicitud de material
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SolicitudMaterialCreate'
 *     responses:
 *       "201":
 *         description: Solicitud creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SolicitudMaterial'
 *       "400":
 *         description: Datos de entrada inválidos
 */
router.post('/', ctrl.create);

/**
 * @swagger
 * /api/SolicitudesMateriales/{id}:
 *   put:
 *     tags:
 *       - SolicitudesMateriales
 *     summary: Actualizar solicitud de material
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SolicitudMaterialUpdate'
 *     responses:
 *       "200":
 *         description: Solicitud actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SolicitudMaterial'
 *       "404":
 *         description: Solicitud no encontrada
 */
router.put('/:id', ctrl.update);

/**
 * @swagger
 * /api/SolicitudesMateriales/{id}:
 *   delete:
 *     tags:
 *       - SolicitudesMateriales
 *     summary: Eliminar solicitud de material
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Eliminado correctamente
 *       "404":
 *         description: Solicitud no encontrada
 */
router.delete('/:id', ctrl.remove);

/**
 * @swagger
 * /api/SolicitudesMateriales/{id}:
 *   get:
 *     tags:
 *       - SolicitudesMateriales
 *     summary: Obtener una solicitud de material por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Solicitud encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SolicitudMaterial'
 *       "404":
 *         description: Solicitud no encontrada
 */
router.get('/:id', ctrl.getById);

module.exports = router;