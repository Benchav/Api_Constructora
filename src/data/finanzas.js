const initialFinanzas = [
  { id: "f1", tipo: "Ingreso", proyectoId: 100, descripcion: "Pago Avance 2", monto: 50000, fecha: "2025-10-15" },
  { id: "f2", tipo: "Costo", proyectoId: 100, categoria: "Materiales", descripcion: "Compra Acero", monto: 15000, fecha: "2025-10-18" },
  { id: "f3", tipo: "Ingreso", proyectoId: 101, descripcion: "Pago Inicial", monto: 80000, fecha: "2025-09-20" },
  { id: "f4", tipo: "Costo", proyectoId: 101, categoria: "Mano de Obra", descripcion: "Planilla Quincenal", monto: 25000, fecha: "2025-10-20" },
  { id: "f5", tipo: "Costo", proyectoId: 100, categoria: "Equipo", descripcion: "Alquiler Grúa", monto: 8000, fecha: "2025-10-22" }
];

module.exports = { initialFinanzas };