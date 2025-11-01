// src/utils/idGenerator.js
const { v4: uuidv4 } = require('uuid'); // no instalado por defecto; usaremos alternativa si no quieres instalar uuid

// Si no quieres instalar uuid: usa timestamp + random
const generateStringId = (prefix = '') => {
  const r = Math.random().toString(36).substring(2, 8);
  return `${prefix}${Date.now().toString().slice(-6)}${r}`;
};

const generateNumericId = (arr, idField = 'id') => {
  // devuelve next integer > max actual
  if (!Array.isArray(arr) || arr.length === 0) return 1;
  const max = arr.reduce((m, it) => {
    const val = Number(it[idField]) || 0;
    return val > m ? val : m;
  }, 0);
  return max + 1;
};

module.exports = {
  generateStringId,
  generateNumericId
};