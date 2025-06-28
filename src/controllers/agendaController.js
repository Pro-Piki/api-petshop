const { getTurnosPorFechaYCategoria } = require('../services/agendaService');

function mostrarAgenda(req, res) {
  const categoria = req.query.categoria || ''; // '' para todos
  const fecha = req.query.fecha || new Date().toISOString().slice(0, 10); // hoy en formato YYYY-MM-DD
  
  const turnosFiltrados = getTurnosPorFechaYCategoria(fecha, categoria);

  res.render('agenda', {
    turnos: turnosFiltrados,
    categoria,
    fecha
  });
}

module.exports = { mostrarAgenda };