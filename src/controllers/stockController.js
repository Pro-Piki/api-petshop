const stockService = require('../services/stockService');
const Product = require('../models/Product');

// GET /stock/nuevo -> formulario para registrar movimiento
async function mostrarFormularioMovimiento(req, res) {
  try {
    const productos = await Product.find();
    res.render('stock/nuevo', { productos });
  } catch (error) {
    res.status(500).send('Error al cargar productos');
  }
}

// POST /stock -> registrar movimiento desde formulario
async function registrarMovimiento(req, res) {
  try {
    await stockService.registrarMovimiento(req.body);
    res.redirect('/stock'); // redirigimos al listado
  } catch (error) {
    const productos = await Product.find();
    res.render('stock/nuevo', {
      productos,
      error: error.message,
      oldData: req.body
    });
  }
}

// GET /stock/:idProducto -> historial de movimientos
async function getMovimientosPorProducto(req, res) {
  try {
    const { idProducto } = req.params;
    const movimientos = await stockService.getMovimientosPorProducto(idProducto);
    res.render('stock/movimientos', { movimientos });
  } catch (error) {
    res.status(500).send('Error al obtener movimientos');
  }
}

async function listarProductosConStock(req, res) {
  try {
    const productos = await Product.find();
    res.render('stock/listar', { productos });
  } catch (error) {
    res.status(500).send('Error al cargar productos');
  }
}


module.exports = {
  mostrarFormularioMovimiento,
  registrarMovimiento,
  getMovimientosPorProducto,
  listarProductosConStock
};
