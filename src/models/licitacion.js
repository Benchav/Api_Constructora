// src/models/licitacion.js
const { toOpenApiSchema } = require('./_schemaHelper');

// Objeto base
const Licitacion = {
  id: { type: 'string', example: 'l1' },
  nombre: { type: 'string', example: 'Hospital Regional' },
  estado: { type: 'string', example: 'Presentada' },
  monto: { type: 'number', example: 2500000 },
  fechaLimite: { type: 'string', example: '2025-11-15' }
};

// --- Schemas para Swagger ---
const LicitacionSchema = toOpenApiSchema(Licitacion, {
  description: 'Licitación completa'
});

const LicitacionCreate = toOpenApiSchema(Licitacion, {
  required: ['nombre', 'estado', 'monto', 'fechaLimite'],
  description: 'Payload para crear licitación'
});

const LicitacionUpdate = toOpenApiSchema(Licitacion, {
  description: 'Payload para actualizar licitación'
});

// --- Validación ---
function validateCreateLicitacion(payload) {
  const required = ['nombre', 'estado', 'monto', 'fechaLimite'];
  const missing = required.filter(k => !payload[k]);
  return { ok: missing.length === 0, missing };
}

module.exports = {
  LicitacionSchema,
  LicitacionCreate,
  LicitacionUpdate,
  validateCreateLicitacion
};