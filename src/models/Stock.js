class StockMovement {
  constructor({ tipo, idProducto, cantidad, proveedor, costoUnitario, motivo, fecha = new Date().toISOString() }) {
    this.tipo = tipo;
    this.idProducto = idProducto;
    this.cantidad = cantidad;
    this.proveedor = proveedor || null;
    this.costoUnitario = costoUnitario || null;
    this.motivo = motivo || null;
    this.fecha = fecha;
  }
}

module.exports = StockMovement;