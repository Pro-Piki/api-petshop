const fs = require('fs');
const path = require('path');
const { parseISO, isSameDay } = require('date-fns');

const rutaTurnos = path.join(__dirname, '..', 'data', 'turnos.json');

function getTurnosPorFechaYCategoria(fechaStr, categoria) {
  let turnos = [];

  try {
    const data = fs.readFileSync(rutaTurnos, 'utf-8');
    turnos = JSON.parse(data);
  } catch (error) {
    console.error('Error al leer turnos:', error);
    return [];
  }

  const fechaBuscada = parseISO(fechaStr);

  return turnos.filter(turno => {
    const fechaTurno = parseISO(turno.dia);

    const coincideFecha = isSameDay(fechaBuscada, fechaTurno);
    const coincideCategoria = categoria === '' || turno.categoria === categoria;

    return coincideFecha && coincideCategoria;
  });
}

module.exports = { getTurnosPorFechaYCategoria };