const fs = require('fs').promises;
const path = require('path');

const turnosPath = path.join(__dirname, '../data/turnos.json');

// Leer todos los turnos
async function getTurnos() {
  const data = await fs.readFile(turnosPath, 'utf-8');
  return JSON.parse(data);
}

// Guardar un nuevo turno
async function saveTurno(nuevoTurno) {
  const turnos = await getTurnos();

  // Verificar si el turno ya está ocupado
  const existe = turnos.find(
    t => t.dia === nuevoTurno.dia && t.hora === nuevoTurno.hora
  );

  if (existe) {
    throw new Error('Turno ocupado');
  }

  // Asignar ID automático
  nuevoTurno.id = turnos.length ? turnos[turnos.length - 1].id + 1 : 1;

  turnos.push(nuevoTurno);
  await fs.writeFile(turnosPath, JSON.stringify(turnos, null, 2));
  return nuevoTurno;
}

module.exports = {
  getTurnos,
  saveTurno,
};