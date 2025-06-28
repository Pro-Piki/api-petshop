const Product = require('../models/Product');
const stockService = require('./stockService');

async function getAllProducts() {
  return await Product.find();
}

async function getProductById(id) {
  return await Product.findById(id);
}

async function createProduct(nombre, categoria, tipoMascota, precio, stock) {
  const newProduct = new Product({ nombre, categoria, tipoMascota, precio: Number(precio), stock: 0 });
  const savedProduct = await newProduct.save();

  if (stock > 0) {
    await stockService.registrarMovimiento({
      tipo: 'entrada',
      idProducto: savedProduct._id,
      cantidad: stock,
      proveedor: 'Alta de producto',
      costoUnitario: precio,
      motivo: 'Alta inicial'
    });
  }

  return savedProduct;
}


async function updateProduct(id, productData) {
  const { stock, ...dataSinStock } = productData;

  const updated = await Product.findByIdAndUpdate(
    id,
    { ...dataSinStock, updatedAt: new Date() },
    { new: true }
  );
  return updated;
}


async function deleteProduct(id) {
  const producto = await Product.findById(id);
  if (!producto) return false;

  if (producto.stock > 0) {
    await stockService.registrarMovimiento({
      tipo: 'salida',
      idProducto: producto._id,
      cantidad: producto.stock,
      proveedor: 'Eliminación de producto',
      costoUnitario: producto.precio,
      motivo: 'Baja de producto'
    });
  }

  await Product.findByIdAndDelete(id);
  return true;
}


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};