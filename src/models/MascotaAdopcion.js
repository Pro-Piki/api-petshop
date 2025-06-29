const mongoose = require('mongoose');

const mascotaAdopcionSchema = new mongoose.Schema({
  tipo: { type: String, required: true },
  zona: { type: String, required: true },
  raza: { type: String, required: true },
  tamano: { type: String, required: true },
  nombre: { type: String, required: true }
});

module.exports = mongoose.model('MascotaAdopcion', mascotaAdopcionSchema);