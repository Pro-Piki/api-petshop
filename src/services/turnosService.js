const Turno = require('../models/Turno');

// Obtener todos los turnos
async function getTurnos() {
  return await Turno.find();
}

// Guardar un nuevo turno
async function saveTurno(nuevoTurno) {
  const turnoExistente = await Turno.findOne({
    dia: nuevoTurno.dia,
    hora: nuevoTurno.hora
  });

  if (turnoExistente) {
    throw new Error('Turno ocupado');
  }

  const turno = new Turno(nuevoTurno);
  return await turno.save();
}

module.exports = {
  getTurnos,
  saveTurno
};