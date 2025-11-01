const initialOrdenesCompra = [
  { id: "oc1", proyectoId: 100, fechaPedido: "2025-10-20", proveedor: "Acero Rápido S.A.", items: "15 toneladas de Acero 1/2", montoTotal: 18000, estado: "Recibida" },
  { id: "oc2", proyectoId: 101, fechaPedido: "2025-10-25", proveedor: "Materiales El Fuerte", items: "200 sacos de Cemento, 5m³ de Grava", montoTotal: 6500, estado: "Emitida" },
  { id: "oc3", proyectoId: 100, fechaPedido: "2025-10-26", proveedor: "Ferretería Central", items: "Herramientas de mano", montoTotal: 1200, estado: "Pendiente" }
];

module.exports = { initialOrdenesCompra };