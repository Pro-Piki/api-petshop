const mongoose = require('mongoose');

const stockMovementSchema = new mongoose.Schema({
  tipo: { type: String, enum: ['entrada', 'salida'], required: true },
  idProducto: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  cantidad: { type: Number, required: true },
  proveedor: { type: String },
  costoUnitario: { type: Number },
  motivo: { type: String },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StockMovement', stockMovementSchema);
