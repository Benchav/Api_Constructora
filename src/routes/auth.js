const express = require('express');
const router = express.Router();
const { login, me } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login (recibe username y password)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Devuelve token y usuario
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Información del usuario autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Usuario actual
 */
router.get('/me', protect, me);

module.exports = router;