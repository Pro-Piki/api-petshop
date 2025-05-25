const fs = require('fs').promises;
const path = require('path');
const Stock = require('../models/Stock');
const { getProductById, updateProduct } = require('./productService');

const movementsPath = path.join(__dirname, '../data/movementsStock.json');

async function getAllMovements() {
  try {
    const data = await fs.readFile(movementsPath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

async function saveAllMovements(movements) {
  await fs.writeFile(movementsPath, JSON.stringify(movements, null, 2));
}

async function registerMovement(movementData) {
  const movements = await getAllMovements();
  const newMovement = new Stock(movementData);
  
  movements.push(newMovement);
  await saveAllMovements(movements);
  return newMovement;
}

async function registerIncome({ idProducto, cantidad, proveedor, costoUnitario }) {
  const product = await getProductById(idProducto);
  if (!product) {
    throw new Error('Producto no encontrado');
  }

  await updateProduct(idProducto, {
    stock: product.stock + Number(cantidad)
  });

  return registerMovement({
    tipo: 'ingreso',
    idProducto,
    cantidad,
    proveedor,
    costoUnitario
  });
}

async function registerOutcome({ idProducto, cantidad, motivo }) {
  const product = await getProductById(idProducto);
  if (!product) {
    throw new Error('Producto no encontrado');
  }
  if (product.stock < cantidad) {
    throw new Error('Stock insuficiente');
  }

  await updateProduct(idProducto, {
    stock: product.stock - Number(cantidad)
  });

  return registerMovement({
    tipo: 'salida',
    idProducto,
    cantidad,
    motivo
  });
}

module.exports = {
  getAllMovements,
  saveAllMovements,
  registerMovement,
  registerIncome,
  registerOutcome
};