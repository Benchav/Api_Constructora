// src/services/genericService.js
const { generateNumericId, generateStringId } = require('../utils/idGenerator');

class GenericService {
  constructor({ getter, updater, idField = 'id', idIsNumber = true, idPrefix = '' }) {
    this.getter = getter;
    this.updater = updater;
    this.idField = idField;
    this.idIsNumber = idIsNumber;
    this.idPrefix = idPrefix;
  }

  findAll() {
    return this.getter();
  }

  findById(id) {
    const arr = this.getter();
    return arr.find(item => String(item[this.idField]) === String(id));
  }

  create(data) {
    const arr = this.getter();
    let newId;
    if (this.idIsNumber) {
      newId = generateNumericId(arr, this.idField);
    } else {
      newId = generateStringId(this.idPrefix);
    }
    const newItem = { ...data, [this.idField]: newId };
    const newArr = [...arr, newItem];
    this.updater(newArr);
    return newItem;
  }

  update(id, data) {
    const arr = this.getter();
    const idx = arr.findIndex(item => String(item[this.idField]) === String(id));
    if (idx === -1) return null;
    const updated = { ...arr[idx], ...data, [this.idField]: arr[idx][this.idField] };
    const newArr = [...arr];
    newArr[idx] = updated;
    this.updater(newArr);
    return updated;
  }

  remove(id) {
    const arr = this.getter();
    const idx = arr.findIndex(item => String(item[this.idField]) === String(id));
    if (idx === -1) return false;
    const newArr = arr.filter((_, i) => i !== idx);
    this.updater(newArr);
    return true;
  }
}

module.exports = GenericService;