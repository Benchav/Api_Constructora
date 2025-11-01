const initialInspeccionesCalidad = [
  { id: "ic1", proyectoId: 100, fecha: "2025-10-20", fase: "Cimentación", resultado: "Aprobado", observaciones: "Las dimensiones y el refuerzo cumplen con el plano estructural." },
  { id: "ic2", proyectoId: 100, fecha: "2025-10-25", fase: "Mampostería Nivel 1", resultado: "Con Observaciones", observaciones: "Se detectó un desnivel de 5mm en el muro del Eje C. Pendiente corrección." },
  { id: "ic3", proyectoId: 101, fecha: "2025-10-15", fase: "Fundición de Zapatas", resultado: "Aprobado", observaciones: "Resistencia del concreto según lo solicitado." }
];

module.exports = { initialInspeccionesCalidad };