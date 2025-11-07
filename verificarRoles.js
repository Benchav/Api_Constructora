const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api'; // Cambia si tu backend usa otro host o puerto

// Credenciales según tu BD
const usuarios = [
  { rol: 'CEO', username: 'ceo', password: '123' },
  { rol: 'Gerente General', username: 'gerente.luis', password: '123' },
  { rol: 'Director de Proyectos', username: 'dir.proyectos', password: '123' },
  { rol: 'Director Finanzas', username: 'dir.finanzas', password: '123' },
  { rol: 'Director Comercial', username: 'dir.comercial', password: '123' },
  { rol: 'Jefe Oficina Tecnica', username: 'jefe.tecnica', password: '123' },
  { rol: 'Jefe de Logística', username: 'jefe.logistica', password: '123' },
  { rol: 'RRHH', username: 'rrhh.lucia', password: '123' },
  { rol: 'Asistente Administrativo', username: 'asist.sara', password: '123' },
  { rol: 'Jefe de Obra', username: 'jefe.juan', password: '123' },
  { rol: 'Maestro de Obra', username: 'maestro.elena', password: '123' },
  { rol: 'Bodeguero', username: 'bodega.pedro', password: '123' },
  { rol: 'Albañil', username: 'david.p', password: '123' },
  { rol: 'Operador de Maquinaria', username: 'op.ernesto', password: '123' },
];

// Endpoints reales mapeados a tus rutas actuales
const endpoints = [
  '/usuarios',
  '/proyectos',
  '/inventario',
  '/empleados',
  '/finanzas',
  '/licitaciones',
  '/planos',
  '/reportes',
  '/solicitudesMateriales',
  '/solicitudesDinero',
  '/ordenescompra',
  '/inspeccionesCalidad',
  '/incidentesSeguridad',
];

async function loginUsuarios() {
  const tokens = {};
  console.log('🔐 Iniciando sesión de prueba...\n');

  for (const user of usuarios) {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        username: user.username,
        password: user.password,
      });
      tokens[user.rol] = res.data.token;
      console.log(`✅ ${user.rol.padEnd(25)} → Token obtenido`);
    } catch (err) {
      console.log(`❌ ${user.rol.padEnd(25)} → Error al iniciar sesión`);
    }
  }

  return tokens;
}

async function verificarAccesos(tokens) {
  console.log('\n🧩 Verificando accesos por rol:\n');

  for (const path of endpoints) {
    console.log(`\n🔹 Endpoint: ${path}`);

    for (const user of usuarios) {
      const token = tokens[user.rol];
      if (!token) {
        console.log(`⚠️ ${user.rol.padEnd(25)} → No tiene token`);
        continue;
      }

      try {
        const res = await axios.get(`${BASE_URL}${path}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(`✅ ${user.rol.padEnd(25)} → ${res.status} Acceso permitido`);
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          if (status === 403)
            console.log(`🚫 ${user.rol.padEnd(25)} → 403 SIN PERMISO`);
          else if (status === 401)
            console.log(`⚠️ ${user.rol.padEnd(25)} → 401 NO AUTORIZADO`);
          else
            console.log(`❌ ${user.rol.padEnd(25)} → ${status} (${error.response.data?.message || 'Error'})`);
        } else {
          console.log(`❌ ${user.rol.padEnd(25)} → Error de conexión`);
        }
      }
    }
  }
}

(async () => {
  const tokens = await loginUsuarios();
  await verificarAccesos(tokens);
})();


// node verificarRoles.js