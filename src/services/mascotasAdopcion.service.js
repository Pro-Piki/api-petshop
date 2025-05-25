const fs = require('fs').promises;
const path = require('path');

const RUTA_JSON = path.join(__dirname, '../data/mascotasAdopcion.json');

async function leerMascotasAdopcion() {
  try {
    const data = await fs.readFile(RUTA_JSON, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

module.exports = { leerMascotasAdopcion };