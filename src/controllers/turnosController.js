// src/controllers/turnosController.js

const turnosService = require('../services/turnosService');

// Mostrar el formulario
function mostrarFormulario(req, res) {
  res.render('turnos', { mensaje: null });
}

// Procesar el formulario y guardar turno
async function guardarTurno(req, res) {
  const { categoria, servicio, dia, hora, nombre, email, telefono } = req.body;

  const nuevoTurno = {
    categoria,
    servicio,
    dia,
    hora,
    nombre,
    email,
    telefono
  };

  try {
    await turnosService.saveTurno(nuevoTurno);
    res.render('turnos', { mensaje: 'El turno fue registrado con éxito.' });
  } catch (error) {
    res.render('turnos', { mensaje: 'Lo lamentamos, este turno no está disponible.' });
  }
}

module.exports = {
  mostrarFormulario,
  guardarTurno
};