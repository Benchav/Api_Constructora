// src/models/_schemaHelper.js

// Esta función es un ayudante genérico para crear schemas de OpenAPI
function toOpenApiSchema(baseObj, { required = [], description = '' } = {}) {
  const properties = {};
  Object.keys(baseObj).forEach(key => {
    const def = baseObj[key];
    const prop = {};

    if (def.type) prop.type = def.type;
    if (def.example !== undefined) prop.example = def.example;
    if (def.nullable) prop.nullable = true;
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

module.exports = {
  toOpenApiSchema
};