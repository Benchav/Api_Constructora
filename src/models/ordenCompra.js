// src/models/ordenCompra.js
const { toOpenApiSchema } = require('./_schemaHelper');

// Objeto base
const OrdenCompra = {
  id: { type: 'string', example: 'oc1' },
  proyectoId: { type: 'integer', example: 100 },
  fechaPedido: { type: 'string', example: '2025-10-20' },
  proveedor: { type: 'string', example: 'Acero Rápido S.A.' },
  items: { type: 'string', example: '15 toneladas de Acero 1/2' },
  montoTotal: { type: 'number', example: 18000 },
  estado: { type: 'string', example: 'Recibida' }
};

// --- Schemas para Swagger ---
const OrdenCompraSchema = toOpenApiSchema(OrdenCompra, {
  description: 'Orden de compra completa'
});

const OrdenCompraCreate = toOpenApiSchema(OrdenCompra, {
  required: ['proyectoId', 'fechaPedido', 'proveedor', 'items', 'montoTotal', 'estado'],
  description: 'Payload para crear orden de compra'
});

const OrdenCompraUpdate = toOpenApiSchema(OrdenCompra, {
  description: 'Payload para actualizar orden de compra'
});

// --- Validación ---
function validateCreateOrdenCompra(payload) {
  const required = ['proyectoId', 'fechaPedido', 'proveedor', 'items', 'montoTotal', 'estado'];
  const missing = required.filter(k => !payload[k]);
  return { ok: missing.length === 0, missing };
}

module.exports = {
  OrdenCompraSchema,
  OrdenCompraCreate,
  OrdenCompraUpdate,
  validateCreateOrdenCompra
};