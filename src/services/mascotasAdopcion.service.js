//src/services/mascotasAdopcion.service.js

const Mascota = require('../models/MascotaAdopcion');

async function leerMascotasAdopcion() {
  return await Mascota.find(); // Devuelve todas
}

module.exports = { leerMascotasAdopcion };