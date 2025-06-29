const express = require('express');
const router = express.Router();
const {
  mostrarFormularioMovimiento,
  registrarMovimiento,
  getMovimientosPorProducto,
  listarProductosConStock
} = require('../controllers/stockController.js');

router.get('/nuevo', mostrarFormularioMovimiento);
router.post('/', registrarMovimiento);
router.get('/:idProducto', getMovimientosPorProducto);
router.get('/', listarProductosConStock);

module.exports = router;