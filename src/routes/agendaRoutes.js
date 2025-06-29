//src/routes/agendaRoutes.js

const express = require('express');
const router = express.Router();
const { mostrarAgenda } = require('../controllers/agendaController');

router.get('/', mostrarAgenda);

module.exports = router;