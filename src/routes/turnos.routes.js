const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

const TURNOS_DB = path.join(__dirname, '../data/turnos.json');

// Función para leer turnos
async function leerTurnos() {
  try {
    const data = await fs.readFile(TURNOS_DB, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Función para guardar turnos
async function guardarTurnos(turnos) {
  await fs.writeFile(TURNOS_DB, JSON.stringify(turnos, null, 2));
}

// GET para mostrar el formulario
router.get('/nuevo', (req, res) => {
  res.render('turnos', { mensaje: null });
});

// POST para recibir y guardar el turno
router.post('/nuevo', async (req, res) => {
  const { categoria, servicio, dia, hora, nombre, email, telefono } = req.body;

  if (!categoria || !servicio || !dia || !hora || !nombre || !email || !telefono) {
    return res.render('turnos', { mensaje: 'Por favor, completá todos los campos.' });
  }

  const turnos = await leerTurnos();

  // Chequeamos que no haya turno para la misma fecha y hora
  const turnoExistente = turnos.find(t => t.dia === dia && t.hora === hora);
  if (turnoExistente) {
    return res.render('turnos', { mensaje: 'Lo lamentamos, este turno no está disponible.' });
  }

  // Guardamos nuevo turno
  turnos.push({ categoria, servicio, dia, hora, nombre, email, telefono });
  await guardarTurnos(turnos);

  res.render('turnos', { mensaje: 'El turno fue registrado con éxito' });
});

module.exports = router;
