// src/models/usuario.js
const { toOpenApiSchema } = require('./_schemaHelper');

// Objeto base de la entidad Usuario
const Usuario = {
  id: { type: 'integer', example: 1 },
  nombre: { type: 'string', example: 'Ana Martínez' },
  rol: { type: 'string', example: 'CEO' },
  username: { type: 'string', example: 'ceo' },
  password: { type: 'string', example: '123' },
  proyectoAsignadoId: { type: 'integer', nullable: true, example: 100 }
};

// --- Schemas para Swagger ---

const UsuarioSchema = toOpenApiSchema(Usuario, { 
  description: 'Usuario completo (respuesta)' 
});

const UsuarioCreate = toOpenApiSchema(Usuario, {
  required: ['nombre', 'rol', 'username', 'password'],
  description: 'Payload para crear usuario'
});

const UsuarioUpdate = toOpenApiSchema(Usuario, { 
  description: 'Payload para actualizar usuario (parcial)' 
});

// --- Funciones de Validación ---

function validateCreateUsuario(payload) {
  const required = ['nombre', 'rol', 'username', 'password'];
  const missing = required.filter(k => payload[k] === undefined || payload[k] === null || payload[k] === '');
  return {
    ok: missing.length === 0,
    missing
  };
}

module.exports = {
  UsuarioSchema,
  UsuarioCreate,
  UsuarioUpdate,
  validateCreateUsuario
};