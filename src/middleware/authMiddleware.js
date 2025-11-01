const jwt = require('jsonwebtoken');

const usuariosService = require('../services/usuariosService'); 
require('dotenv').config();

const SECRET = process.env.JWT_SECRET || 'secretito';

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


function extractTokenFromReq(req) {

  const authHeader = req.headers.authorization || req.headers.Authorization;
  const xToken = req.headers['x-access-token'] || req.headers['x_token'] || req.headers['xapikey'];
  const qToken = req.query && (req.query.token || req.query.access_token);


  if (authHeader && typeof authHeader === 'string') {
    if (authHeader.startsWith('Bearer ')) return authHeader.split(' ')[1];
    return authHeader; 
  }


  if (xToken) return xToken;

  if (qToken) return qToken;

  return null;
}

async function protect(req, res, next) {
  console.log('--- protect() called ---');
  // console.log('Incoming headers.authorization:', req.headers.authorization);
  // console.log('Incoming x-access-token / x_token:', req.headers['x-access-token'] || req.headers['x_token']);
  // console.log('Incoming query token:', req.query && (req.query.token || req.query.access_token));

  const token = extractTokenFromReq(req);

  if (!token) {
    console.log('protect: No token found in request.');
    return res.status(401).json({ message: 'No autenticado. Proporcione Authorization: Bearer <token>' });
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
    console.log('protect: JWT verify error or DB error ->', err && err.message);
    return res.status(401).json({ message: 'Token inválido, expirado o error de base de datos' });
  }
}

function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'No autenticado' });
    }

    const userRol = req.user.rol;


    if (userRol === 'CEO') return next();

    if (allowedRoles.includes(userRol)) return next();

    const path = req.baseUrl || req.originalUrl; 

    const modulo = path.split('/')[2]?.split('?')[0]; 
    
 
    const modulosConocidos = [
      'proyectos', 'planos', 'finanzas', 'inventario', 'reportes', 
      'compras', 'personal', 'materiales', 'ventas',
      'usuarios', 'empleados', 'licitaciones', 'solicitudesMateriales', 
      'solicitudesDinero', 'ordenescompra', 'inspeccionesCalidad', 'incidentesSeguridad'
    ];

    let moduloActual = 'desconocido';
    if (modulosConocidos.includes(modulo)) {
      moduloActual = modulo;
    }
    
    const mapPermisos = {
      'ordenescompra': 'compras',
      'solicitudesMateriales': 'materiales',
      'empleados': 'personal',
      'reportesDiarios': 'reportes' 

    };

    const moduloPermiso = mapPermisos[moduloActual] || moduloActual;
    const puedeAcceder = permisos[userRol]?.includes('*') || permisos[userRol]?.includes(moduloPermiso);

    if (puedeAcceder) return next();

    return res.status(403).json({
      message: `Acceso denegado. Rol '${userRol}' no autorizado para el módulo '${moduloPermiso}'.`
    });
  };
}


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