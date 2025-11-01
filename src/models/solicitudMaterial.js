// src/models/solicitudMaterial.js
const { toOpenApiSchema } = require('./_schemaHelper');

// Objeto base
const SolicitudMaterial = {
  id: { type: 'string', example: 'sm1' },
  proyectoId: { type: 'integer', example: 100 },
  item: { type: 'string', example: 'Acero 1/2' },
  cantidad: { type: 'number', example: 50 },
  estado: { type: 'string', example: 'Pendiente' },
  solicitante: { type: 'string', example: 'Juan Pérez' },
  fecha: { type: 'string', example: '2025-10-24' }
};

// --- Schemas para Swagger ---
const SolicitudMaterialSchema = toOpenApiSchema(SolicitudMaterial, {
  description: 'Solicitud de material completa'
});

const SolicitudMaterialCreate = toOpenApiSchema(SolicitudMaterial, {
  required: ['proyectoId', 'item', 'cantidad', 'solicitante', 'fecha'],
  description: 'Payload para crear solicitud de material'
});

const SolicitudMaterialUpdate = toOpenApiSchema(SolicitudMaterial, {
  description: 'Payload para actualizar solicitud de material'
});

// --- Validación ---
function validateCreateSolicitudMaterial(payload) {
  const required = ['proyectoId', 'item', 'cantidad', 'solicitante', 'fecha'];
  const missing = required.filter(k => !payload[k]);
  return { ok: missing.length === 0, missing };
}

module.exports = {
  SolicitudMaterialSchema,
  SolicitudMaterialCreate,
  SolicitudMaterialUpdate,
  validateCreateSolicitudMaterial
};