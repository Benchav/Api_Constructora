// src/models/proyecto.js
const { toOpenApiSchema } = require('./_schemaHelper');

// Objeto base de la entidad Proyecto
const Proyecto = {
  id: { type: 'integer', example: 100 },
  nombre: { type: 'string', example: 'Torre Central' },
  ubicacion: { type: 'string', example: 'Av. Principal #123' },
  estado: { type: 'string', example: 'En Curso' },
  avance: { type: 'integer', example: 65 },
  presupuesto: { type: 'number', example: 5000000 }
};

// --- Schemas para Swagger ---

// Schema de Proyecto (para respuestas GET)
const ProyectoSchema = toOpenApiSchema(Proyecto, {
  description: 'Proyecto completo (respuesta)'
});

// Schema para crear un Proyecto (para POST)
const ProyectoCreate = toOpenApiSchema(Proyecto, {
  required: ['nombre', 'ubicacion', 'estado', 'presupuesto'],
  description: 'Payload para crear un proyecto'
});

// Schema para actualizar un Proyecto (para PUT)
const ProyectoUpdate = toOpenApiSchema(Proyecto, {
  description: 'Payload para actualizar un proyecto (parcial)'
});


// --- Funciones de Validación ---

function validateCreateProyecto(payload) {
  // Ponemos 'avance' como opcional, si no viene, el servicio le pondrá un valor (ej. 0)
  const required = ['nombre', 'ubicacion', 'estado', 'presupuesto'];
  const missing = required.filter(k => payload[k] === undefined || payload[k] === null || payload[k] === '');
  return {
    ok: missing.length === 0,
    missing
  };
}

module.exports = {
  ProyectoSchema,
  ProyectoCreate,
  ProyectoUpdate,
  validateCreateProyecto
};