const { 
  getAllMovements, 
  registerIncome, 
  registerOutcome 
} = require('../services/stockService');
const { getProductById } = require('../services/productService');
const e = require('express');

// vista p listar movimientos
async function listMovementsView(req, res) {
  try {
    const movements = await getAllMovements();
    res.render('stock/listar', {
      title: 'Movimientos de Stock',
      movements
    });
  } catch (error) {
    res.status(500).render('error', {
      title: 'Error',
      mensaje: 'Error al cargar los movimientos de stock'
    });
  }
}

// renderiza el form de ingreso
async function renderIncomeForm(req, res) {
  try {
    const products = await getProductById(); // Necesitarías una función getAllProducts
    res.render('stock/ingreso', {
      title: 'Registrar Ingreso de Stock',
      products
    });
  } catch (error) {
    res.status(500).render('error', {
      title: 'Error',
      mensaje: 'Error al cargar el formulario'
    });
  }
}

// procesa ingreso de stock
async function processIncome(req, res) {
  const { idProducto, cantidad, proveedor, costoUnitario } = req.body;
  
  if (!idProducto || !cantidad || !proveedor || !costoUnitario) {
    const products = await getProductById();
    return res.render('stock/ingreso', {
      title: 'Registrar Ingreso de Stock',
      products,
      errorMessage: 'Faltan campos requeridos'
    });
  }

  try {
    await registerIncome({
      idProducto: Number(idProducto),
      cantidad: Number(cantidad),
      proveedor,
      costoUnitario: Number(costoUnitario)
    });
    res.redirect('/stock');
  } catch (error) {
    res.render('stock/ingreso', {
      title: 'Registrar Ingreso de Stock',
      errorMessage: 'Error al registrar ingreso: ' + error.message,
      products: await getProductById()
    });
  }
}

// renderiza el form de salida
async function renderOutcomeForm(req, res) {
  try {
    const products = await getProductById();
    res.render('stock/salida', {
      title: 'Registrar Salida de Stock',
      products
    });
  } catch (error) {
    res.status(500).render('error', {
      title: 'Error',
      mensaje: 'Error al cargar el formulario'
    });
  }
}

// procesa salida de stock
async function processOutcome(req, res) {
  const { idProducto, cantidad, motivo } = req.body;
  
  if (!idProducto || !cantidad || !motivo) {
    const products = await getProductById();
    return res.render('stock/salida', {
      title: 'Registrar Salida de Stock',
      products,
      errorMessage: 'Faltan campos requeridos'
    });
  }

  try {
    await registerOutcome({
      idProducto: Number(idProducto),
      cantidad: Number(cantidad),
      motivo
    });
    res.redirect('/stock');
  } catch (error) {
    res.render('stock/salida', {
      title: 'Registrar Salida de Stock',
      errorMessage: 'Error al registrar salida: ' + error.message,
      products: await getProductById() 
    });
  }
}

async function listMovementsApi(req, res) {
  try {
    const movements = await getAllMovements();
    res.json(movements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  listMovementsView,
  renderIncomeForm,
  processIncome,
  renderOutcomeForm,
  processOutcome,
  listMovementsApi
};