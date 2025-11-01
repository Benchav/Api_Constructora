const makeController = (service) => ({
  list: (req, res) => {
    const items = service.findAll();
    res.json(items);
  },

  getById: (req, res) => {
    const { id } = req.params;
    const item = service.findById(id);
    if (!item) return res.status(404).json({ message: 'No encontrado' });
    res.json(item);
  },

  create: (req, res) => {
    const data = req.body;
    const newItem = service.create(data);
    res.status(201).json(newItem);
  },

  update: (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const updated = service.update(id, data);
    if (!updated) return res.status(404).json({ message: 'No encontrado' });
    res.json(updated);
  },

  remove: (req, res) => {
    const { id } = req.params;
    const ok = service.remove(id);
    if (!ok) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Eliminado correctamente' });
  }
});

module.exports = makeController;