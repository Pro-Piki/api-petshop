const StockMovement = require('../models/Stock');
const Product = require('../models/Product.js');

async function registrarMovimiento({ tipo, idProducto, cantidad, proveedor, costoUnitario, motivo }) {
  const producto = await Product.findById(idProducto);
  const cantidadNumerica = Number(cantidad);
  if (isNaN(cantidadNumerica)) {
    throw new Error('Cantidad inválida');
  }
  if (!producto) {
    throw new Error('Producto no encontrado');
  }

  if (tipo === 'salida' && producto.stock < cantidadNumerica) {
    throw new Error('Stock insuficiente');
  }

  const movimiento = new StockMovement({ tipo, idProducto, cantidad: cantidadNumerica, proveedor, costoUnitario, motivo });
  await movimiento.save();

  producto.stock += tipo === 'entrada' ? cantidadNumerica : -cantidadNumerica;
  producto.updatedAt = new Date();
  await producto.save();

  return movimiento;
}

async function getMovimientosPorProducto(idProducto) {
  return await StockMovement.find({ idProducto }).sort({ fecha: -1 });
}

module.exports = {
  registrarMovimiento,
  getMovimientosPorProducto
};
