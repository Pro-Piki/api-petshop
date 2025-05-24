const express = require('express');
const router = express.Router();
const { mostrarBusqueda, buscarMascotasAdopcion } = require('../controllers/mascotasAdopcion.controller');

router.get('/busqueda', mostrarBusqueda);
router.post('/busqueda', buscarMascotasAdopcion);
router.get('/api/mascotas', buscarMascotasAdopcion);



module.exports = router;