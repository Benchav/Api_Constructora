// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const usuariosService = require('../services/usuariosService');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'secretito';

const permisos = {
  CEO: ['*'],
  'Gerente General': ['proyectos', 'reportes', 'finanzas'],
  'Director de Proyectos': ['proyectos', 'reportes'],
  'Director Finanzas': ['finanzas', 'reportes'],
  'Director Comercial': ['ventas', 'reportes'],
  'Jefe Oficina Técnica': ['planos', 'reportes'],
  'Jefe de Logística': ['compras', 'inventario'],
  RRHH: ['personal'],
  'Asistente Administrativo': ['reportes', 'personal'],
  'Jefe de Obra': ['reportes', 'materiales'],
  'Maestro de Obra': ['reportes'],
  Bodeguero: ['inventario'],
  Albañil: ['planos'],
  'Operador de Maquinaria': ['planos'],
};

/* -------------------------- UTILIDAD PARA TOKEN -------------------------- */
function extractTokenFromReq(req) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const xToken =
    req.headers['x-access-token'] ||
    req.headers['x_token'] ||
    req.headers['xapikey'];
  const qToken =
    req.query && (req.query.token || req.query.access_token);

  if (authHeader && typeof authHeader === 'string') {
    if (authHeader.startsWith('Bearer ')) return authHeader.split(' ')[1];
    return authHeader;
  }

  if (xToken) return xToken;
  if (qToken) return qToken;
  return null;
}

/* ------------------------------ NORMALIZADOR ------------------------------ */
function normalizeRol(rol) {
  return rol
    ? rol
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // quita tildes
        .replace(/\s+/g, ' ') // elimina espacios extra
        .trim()
        .toLowerCase()
    : '';
}

/* --------------------------- MIDDLEWARE PROTECT --------------------------- */
async function protect(req, res, next) {
  console.log('--- protect() called ---');
  const token = extractTokenFromReq(req);

  if (!token) {
    console.log('protect: No token found in request.');
    return res
      .status(401)
      .json({ message: 'No autenticado. Proporcione Authorization: Bearer <token>' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    console.log('protect: JWT decoded ->', decoded);

    const user = await usuariosService.findById(decoded.id);

    if (!user) {
      console.log('protect: User not found for id from token:', decoded.id);
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log('protect: JWT verify error or DB error ->', err?.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

/* ------------------------- MIDDLEWARE AUTORIZACION ------------------------ */
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'No autenticado' });

    const userRolNorm = normalizeRol(req.user.rol);
    const allowedNorms = allowedRoles.map(normalizeRol);

    // Buscar rol equivalente en permisos
    const rolKey = Object.keys(permisos).find(
      (r) => normalizeRol(r) === userRolNorm
    );

    if (!rolKey) {
      return res
        .status(403)
        .json({ message: `Rol '${req.user.rol}' no reconocido` });
    }

    // CEO tiene acceso total
    if (rolKey.toLowerCase() === 'ceo') return next();

    // Si está explícitamente en la lista permitida
    if (allowedNorms.includes(userRolNorm)) return next();

    // Detección automática del módulo desde la URL
    const path = req.baseUrl || req.originalUrl;
    const modulo = path.split('/')[2]?.split('?')[0];

    const modulosConocidos = [
      'proyectos', 'planos', 'finanzas', 'inventario', 'reportes',
      'compras', 'personal', 'materiales', 'ventas',
      'usuarios', 'empleados', 'licitaciones', 'solicitudesMateriales',
      'solicitudesDinero', 'ordenescompra', 'inspeccionesCalidad', 'incidentesSeguridad',
    ];

    let moduloActual = 'desconocido';
    if (modulosConocidos.includes(modulo)) moduloActual = modulo;

    const mapPermisos = {
      ordenescompra: 'compras',
      solicitudesMateriales: 'materiales',
      empleados: 'personal',
      reportesDiarios: 'reportes',
    };

    const moduloPermiso = mapPermisos[moduloActual] || moduloActual;

    const puedeAcceder =
      permisos[rolKey]?.includes('*') ||
      permisos[rolKey]?.includes(moduloPermiso);

    if (puedeAcceder) return next();

    return res.status(403).json({
      message: `Acceso denegado. Rol '${req.user.rol}' no autorizado para el módulo '${moduloPermiso}'.`,
    });
  };
}

/* ---------------------------- MODO BASICO LEGADO --------------------------- */
function authorize(moduleOrRoles) {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).json({ message: 'No autenticado' });
    if (!moduleOrRoles)
      return res.status(403).json({ message: 'Sin permisos configurados' });

    if (Array.isArray(moduleOrRoles)) {
      return moduleOrRoles.includes(req.user.rol)
        ? next()
        : res.status(403).json({ message: 'Acceso denegado' });
    }

    if (String(moduleOrRoles) === req.user.rol) return next();

    return res.status(403).json({ message: 'Acceso denegado' });
  };
}

module.exports = { protect, authorizeRoles, authorize, permisos };