//src/services/agendaService.js

const Turno = require('../models/Turno');
const { parseISO, isSameDay } = require('date-fns');

async function getTurnosPorFechaYCategoria(fechaStr, categoria) {
  try {
    const fechaBuscada = parseISO(fechaStr);

    const turnos = await Turno.find(); // Traemos todos y filtramos con date-fns

    return turnos.filter(turno => {
      const fechaTurno = parseISO(turno.dia);
      const coincideFecha = isSameDay(fechaBuscada, fechaTurno);
      const coincideCategoria = categoria === '' || turno.categoria === categoria;

      return coincideFecha && coincideCategoria;
    });
  } catch (error) {
    console.error('Error al obtener turnos desde MongoDB:', error);
    return [];
  }
}

module.exports = { getTurnosPorFechaYCategoria };