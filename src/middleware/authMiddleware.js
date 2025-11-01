// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { getUsuarios } = require('../storage/inMemoryDb');
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'secretito';

// Tabla de permisos opcional (no usada por authorizeRoles pero útil si quieres combinar)
const permisos = {
  CEO: ['*'],
  'Gerente General': ['proyectos','reportes','finanzas'],
  'Director de Proyectos': ['proyectos','reportes'],
  'Director Finanzas': ['finanzas','reportes'],
  'Director Comercial': ['ventas','reportes'],
  'Jefe Oficina Técnica': ['planos','reportes'],
  'Jefe de Logística': ['compras','inventario'],
  RRHH: ['personal'],
  'Asistente Administrativo': ['reportes','personal'],
  'Jefe de Obra': ['reportes','materiales'],
  'Maestro de Obra': ['reportes'],
  Bodeguero: ['inventario'],
  Albañil: ['planos'], 
 'Operador de Maquinaria': ['planos'] 
};

// Extrae token soportando varios lugares y formatos
function extractTokenFromReq(req) {
  // headers pueden venir en minúsculas o con mayúscula
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const xToken = req.headers['x-access-token'] || req.headers['x_token'] || req.headers['xapikey'];
  const qToken = req.query && (req.query.token || req.query.access_token);

  // Caso 1: Authorization header "Bearer <token>" o token directo en Authorization
  if (authHeader && typeof authHeader === 'string') {
    if (authHeader.startsWith('Bearer ')) return authHeader.split(' ')[1];
    return authHeader; // Swagger a veces pone solo el token
  }

  // Caso 2: x-access-token header
  if (xToken) return xToken;

  // Caso 3: token en query param
  if (qToken) return qToken;

  return null;
}

// protect: valida JWT y adjunta req.user (sin password)
// Más tolerante: acepta Authorization Bearer, token sin Bearer, x-access-token o ?token=
function protect(req, res, next) {
  // debug logs — elimina o reduce en producción
  console.log('--- protect() called ---');
  console.log('Incoming headers.authorization:', req.headers.authorization);
  console.log('Incoming x-access-token / x_token:', req.headers['x-access-token'] || req.headers['x_token']);
  console.log('Incoming query token:', req.query && (req.query.token || req.query.access_token));

  const token = extractTokenFromReq(req);

  if (!token) {
    console.log('protect: No token found in request.');
    return res.status(401).json({ message: 'No autenticado. Proporcione Authorization: Bearer <token>' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    console.log('protect: JWT decoded ->', decoded);

    // Busca usuario en memoria por id del token
    const user = getUsuarios().find(u => Number(u.id) === Number(decoded.id));
    if (!user) {
      console.log('protect: User not found for id from token:', decoded.id);
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Adjuntamos user (sin password)
    req.user = {
      id: user.id,
      nombre: user.nombre,
      username: user.username,
      rol: user.rol,
      proyectoAsignadoId: user.proyectoAsignadoId
    };

    next();
  } catch (err) {
    console.log('protect: JWT verify error ->', err && err.message);
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}

/**
 * authorizeRoles(...allowedRoles)
 * - Uso en routes/index.js: authorizeRoles('CEO','Gerente General',...)
 * - Si el usuario es 'CEO' permite todo
 * - Compara strings exactos (respeta espacios y mayúsculas)
 */
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    const userRol = req.user.rol;

    // ✅ CEO tiene acceso total
    if (userRol === 'CEO') return next();

    // ✅ Si el rol está en la lista explícita de roles permitidos
    if (allowedRoles.includes(userRol)) return next();

    // ✅ Si la ruta actual pertenece a un módulo permitido por la tabla 'permisos'
    const path = req.baseUrl || req.originalUrl; // por ejemplo: /api/planos
    const modulo = path.split('/').find(p =>
      ['proyectos', 'planos', 'finanzas', 'inventario', 'reportes', 'compras', 'personal', 'materiales'].includes(p)
    );

    const puedeAcceder = permisos[userRol]?.includes('*') || permisos[userRol]?.includes(modulo);
    if (puedeAcceder) return next();

    return res.status(403).json({
      message: `Acceso denegado. Rol '${userRol}' no autorizado para el módulo '${modulo}'.`
    });
  };
}

// Backwards-compatible alias (por si otras partes usan authorize)
function authorize(moduleOrRoles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: 'No autenticado' });
    if (!moduleOrRoles) return res.status(403).json({ message: 'Sin permisos configurados' });

    if (Array.isArray(moduleOrRoles)) {
      return moduleOrRoles.includes(req.user.rol) ? next() : res.status(403).json({ message: 'Acceso denegado' });
    }

    if (String(moduleOrRoles) === req.user.rol) return next();

    return res.status(403).json({ message: 'Acceso denegado' });
  };
}

module.exports = { protect, authorizeRoles, authorize, permisos };