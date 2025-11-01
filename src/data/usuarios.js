const initialUsuarios = [
  { id: 1, nombre: "Ana Martínez", rol: "CEO", username: "ceo", password: "123" },
  { id: 2, nombre: "Juan Pérez", rol: "Jefe de Obra", username: "jefe.juan", password: "123", proyectoAsignadoId: 100 },
  { id: 3, nombre: "Pedro Gil", rol: "Bodeguero", username: "bodega.pedro", password: "123", proyectoAsignadoId: 100 },
  { id: 4, nombre: "Lucía Vera", rol: "RRHH", username: "rrhh.lucia", password: "123" },
  { id: 5, nombre: "Marcos Díaz", rol: "Director de Proyectos", username: "dir.proyectos", password: "123" },
  { id: 6, nombre: "Elena Sol", rol: "Maestro de Obra", username: "maestro.elena", password: "123", proyectoAsignadoId: 100 },
  { id: 7, nombre: "Carlos Ruiz", rol: "Director Finanzas", username: "dir.finanzas", password: "123" },
  { id: 8, nombre: "Sofia Luna", rol: "Director Comercial", username: "dir.comercial", password: "123" },
  { id: 9, nombre: "Miguel Roca", rol: "Jefe Oficina Tecnica", username: "jefe.tecnica", password: "123" },
  { id: 10, nombre: "Luis Vega", rol: "Gerente General", username: "gerente.luis", password: "123" },
  { id: 11, nombre: "Roberto Gómez", rol: "Jefe de Logística", username: "jefe.logistica", password: "123" },
  { id: 12, nombre: "David P.", rol: "Albañil", username: "david.p", password: "123", proyectoAsignadoId: 100 },
  { id: 13, nombre: "Sara Nieto", rol: "Asistente Administrativo", username: "asist.sara", password: "123" },
  { id: 14, nombre: "Ernesto C.", rol: "Operador de Maquinaria", username: "op.ernesto", password: "123", proyectoAsignadoId: 101 }
];

module.exports = { initialUsuarios };