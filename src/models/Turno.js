const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  servicio: { type: String, required: true },
  dia: { type: String, required: true },
  hora: { type: String, required: true },
  nombre: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: String, required: true }
});

module.exports = mongoose.model('Turno', turnoSchema);