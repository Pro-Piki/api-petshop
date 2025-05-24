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
  const mensaje = req.query.mensaje || '';
  res.render('turnos', { mensaje });
});

// GET para obtener todos los turnos (respuesta JSON)
router.get('/api/turnos', async (req, res) => {
  try {
    const turnos = await leerTurnos();
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer los turnos' });
  }
});

// POST para recibir y guardar el turno
router.post('/nuevo', async (req, res) => {
  const { categoria, servicio, dia, hora, nombre, email, telefono } = req.body;
  const esJSON = req.is('application/json');

  // Validación de campos obligatorios
  if (!categoria || !servicio || !dia || !hora || !nombre || !email || !telefono) {
    const errorMsg = 'Por favor, completá todos los campos.';
    return esJSON
      ? res.status(400).json({ error: errorMsg })
      : res.render('turnos', { mensaje: errorMsg });
  }

  const turnos = await leerTurnos();

  // Verificamos si ya hay un turno en ese día y hora
  const turnoExistente = turnos.find(t => t.dia === dia && t.hora === hora);
  if (turnoExistente) {
    const errorMsg = 'Lo lamentamos, este turno no está disponible.';
    return esJSON
      ? res.status(400).json({ error: errorMsg })
      : res.render('turnos', { mensaje: errorMsg });
  }

  // Guardamos el nuevo turno
  turnos.push({ categoria, servicio, dia, hora, nombre, email, telefono });
  await guardarTurnos(turnos);

  const successMsg = 'El turno fue registrado con éxito';
  return esJSON
    ? res.status(201).json({ mensaje: successMsg })
    : res.render('turnos', { mensaje: successMsg });
});

module.exports = router;
