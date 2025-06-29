//src/routes/turnos.routes.js

const express = require('express');
const router = express.Router();
const turnosController = require('../controllers/turnosController');
const turnosService = require('../services/turnosService');

// Mostrar formulario (GET /turnos/nuevo)
router.get('/nuevo', turnosController.mostrarFormulario);

// Obtener todos los turnos (GET /turnos/api/turnos)
router.get('/api/turnos', async (req, res) => {
  try {
    const turnos = await turnosService.getTurnos();
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer los turnos' });
  }
});

// Guardar nuevo turno (POST /turnos/nuevo)
router.post('/nuevo', turnosController.guardarTurno);

module.exports = router;