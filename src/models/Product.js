const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  categoria: { type: String, required: true },
  tipoMascota: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  estado: { type: String, default: 'activo' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;