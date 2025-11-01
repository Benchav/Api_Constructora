// src/models/usuario.js
// Definición central del "modelo" Usuario y schemas para Swagger.
// También sirve como "contrato" para tu frontend / validación simple.

const Usuario = {
  id: { type: 'integer', example: 1 },
  nombre: { type: 'string', example: 'Ana Martínez' },
  rol: { type: 'string', example: 'CEO' },
  username: { type: 'string', example: 'ceo' },
  password: { type: 'string', example: '123' },
  proyectoAsignadoId: { type: 'integer', nullable: true, example: 100 }
};

// Función auxiliar para convertir la estructura anterior a un schema OpenAPI (components.schema)
function toOpenApiSchema(baseObj, { required = [], description = '' } = {}) {
  const properties = {};
  Object.keys(baseObj).forEach(key => {
    const def = baseObj[key];
    const prop = {};
    // map simple fields
    if (def.type) prop.type = def.type;
    if (def.example !== undefined) prop.example = def.example;
    if (def.nullable) prop.nullable = true;
    // add description if present
    if (def.description) prop.description = def.description;
    properties[key] = prop;
  });

  const schema = {
    type: 'object',
    properties
  };
  if (required && required.length) schema.required = required;
  if (description) schema.description = description;
  return schema;
}

// Schemas específicos para create/update
const UsuarioSchema = toOpenApiSchema(Usuario, { description: 'Usuario completo (respuesta)' });

const UsuarioCreate = toOpenApiSchema(Usuario, {
  required: ['nombre', 'rol', 'username', 'password'],
  description: 'Payload para crear usuario'
});

// Para update: permitimos cualquier campo (sin required)
const UsuarioUpdate = toOpenApiSchema(Usuario, { description: 'Payload para actualizar usuario (parcial)' });

// Opcional: una función de validación simple (sin dependencias) que revisa campos obligatorios
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