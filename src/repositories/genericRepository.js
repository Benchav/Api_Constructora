// src/repositories/genericRepository.js
class GenericRepository {
  constructor(getter, setter, idField = 'id') {
    this.getter = getter;
    this.setter = setter;
    this.idField = idField;
  }

  findAll() {
    return this.getter();
  }

  findById(id) {
    const arr = this.getter();
    return arr.find(item => String(item[this.idField]) === String(id)) || null;
  }

  findByField(field, value) {
    const arr = this.getter();
    return arr.find(item => item[field] === value) || null;
  }

  create(item) {
    const arr = this.getter();
    const newArr = [...arr, item];
    this.setter(newArr);
    return item;
  }

  update(id, patch) {
    const arr = this.getter();
    const idx = arr.findIndex(item => String(item[this.idField]) === String(id));
    if (idx === -1) return null;
    const updated = { ...arr[idx], ...patch, [this.idField]: arr[idx][this.idField] };
    const newArr = [...arr];
    newArr[idx] = updated;
    this.setter(newArr);
    return updated;
  }

  remove(id) {
    const arr = this.getter();
    const idx = arr.findIndex(item => String(item[this.idField]) === String(id));
    if (idx === -1) return false;
    const newArr = arr.filter((_, i) => i !== idx);
    this.setter(newArr);
    return true;
  }
}

module.exports = GenericRepository;