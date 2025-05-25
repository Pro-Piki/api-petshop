const fs = require('fs').promises;
const path = require('path');
const Product = require('../models/Product');

const productsPath = path.join(__dirname, '../data/products.json');

async function getAllProducts() {
  try {
    const data = await fs.readFile(productsPath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    // si el archivo no existe, se devuelve un array vacío
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

async function saveAllProducts(products) {
  await fs.writeFile(productsPath, JSON.stringify(products, null, 2));
}

async function createProduct(nombre, categoria, tipoMascota, precio, stock) {
  const products = await getAllProducts();
  const newProduct = new Product(
    nombre, 
    categoria, 
    tipoMascota, 
    precio, 
    stock
  );
  
  newProduct.id = Date.now();
  newProduct.createdAt = new Date().toISOString();
  newProduct.updatedAt = newProduct.createdAt;
  
  products.push(newProduct);
  await saveAllProducts(products);
  return newProduct;
}

async function getProductById(id) {
  const products = await getAllProducts();
  return products.find(p => p.id === id);
}

async function updateProduct(id, productData) {
  const products = await getAllProducts();
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) return null;
  
  const updatedProduct = {
    ...products[index],
    ...productData,
    updatedAt: new Date().toISOString()
  };
  
  products[index] = updatedProduct;
  await saveAllProducts(products);
  return updatedProduct;
}

async function deleteProduct(id) {
  const products = await getAllProducts();
  const filteredProducts = products.filter(p => p.id !== id);
  
  if (products.length === filteredProducts.length) {
    return false;
  }
  
  await saveAllProducts(filteredProducts);
  return true;
}

module.exports = {
  getAllProducts,
  saveAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
};