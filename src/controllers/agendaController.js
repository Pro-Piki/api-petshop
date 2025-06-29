//src/controllers/AgendaController.js

const { getTurnosPorFechaYCategoria } = require('../services/agendaService');

async function mostrarAgenda(req, res) {
  const categoria = req.query.categoria || '';
  const fecha = req.query.fecha || new Date().toISOString().slice(0, 10);

  const turnosFiltrados = await getTurnosPorFechaYCategoria(fecha, categoria);

  res.render('agenda', {
    turnos: turnosFiltrados,
    categoria,
    fecha
  });
}

module.exports = { mostrarAgenda };