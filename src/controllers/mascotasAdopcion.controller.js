const { leerMascotasAdopcion } = require('../services/mascotasAdopcion.service');

async function mostrarBusqueda(req, res) {
  res.render('mascotasAdopcion', { resultados: null });
}

async function buscarMascotasAdopcion(req, res) {
  const { tipo, zona, raza, tamano } = req.method === 'POST' ? req.body : req.query;
  const mascotas = await leerMascotasAdopcion();

  const resultados = mascotas.filter(m =>
    (tipo === 'todas' || m.tipo === tipo) &&
    (zona === 'Todas' || m.zona === zona) &&
    (raza === 'Todas' || m.raza === raza) &&
    (tamano === 'Todos' || m.tamano === tamano)
  );

  if (req.headers['content-type'] === 'application/json') {
    return res.json(resultados);
  }

  res.render('mascotasAdopcion', { resultados });
}

module.exports = { mostrarBusqueda, buscarMascotasAdopcion };