const { getAllProducts, saveAllProducts, createProduct: createProductService, getProductById, deleteProduct: deleteProductService } = require('../services/productService');

// renderiza el form de creacion
async function renderCreateProductForm(req, res) {
  try {
    const products = await getAllProducts();
    res.render('products/crear', { 
      title: 'Crear Producto',
      products 
    });
  } catch (error) {
    res.status(500).render('error', {
      title: 'Error',
      mensaje: 'Error al cargar los productos'
    });
  }
}

// crea el nuevo producto (POST)
async function createProduct(req, res) {
  const { nombre, categoria, tipoMascota, precio, stock } = req.body;
  
  if (!nombre || !categoria || !tipoMascota || !precio || stock == null) {
    const products = await getAllProducts();
    return res.render('products/crear', {
      title: 'Crear Producto',
      products,
      errorMessage: 'Faltan campos requeridos'
    });
  }

try {
    // se llama al servicio
    await createProductService(nombre, categoria, tipoMascota, precio, stock);
    res.redirect('/products');
  } catch (error) {
    res.render('products/crear', {
      title: 'Crear Producto',
      errorMessage: 'Error al crear el producto: ' + error.message,
      products: await getAllProducts()
    });
  }
}

// renderiza form de edición
async function renderUpdateProductForm(req, res) {
  try {
    const product = await getProductById(Number(req.params.id));
    if (!product) {
      return res.status(404).render('error', {
        title: 'Error',
        mensaje: 'Producto no encontrado'
      });
    }
    
    res.render('products/editar', {
      title: 'Editar Producto',
      product
    });
  } catch (error) {
    res.status(500).render('error', {
      title: 'Error',
      mensaje: 'Error al cargar el producto'
    });
  }
}

// editar el producto (PUT)
async function updateProduct(req, res) {
  try {
    const productId = Number(req.params.id);
    const { nombre, categoria, tipoMascota, precio, stock } = req.body;
    
    const products = await getAllProducts();
    const productIndex = products.findIndex(p => p.id === productId);
    
    if (productIndex === -1) {
      return res.status(404).render('error', {
        title: 'Error',
        mensaje: 'Producto no encontrado'
      });
    }
    
    products[productIndex] = {
      ...products[productIndex],
      nombre,
      categoria,
      tipoMascota,
      precio,
      stock
    };
    
    await saveAllProducts(products);
    res.redirect('/products');
  } catch (error) {
    res.render('products/editar', {
      title: 'Editar Producto',
      errorMessage: 'Error al editar el producto: ' + error.message
    });
  }
}

// lista los productos
async function listProductsView(req, res) {
  try {
    const products = await getAllProducts();
    res.render('products/listar', {
      title: 'Listado de Productos',
      products
    });
  } catch (error) {
    res.status(500).render('error', {
      title: 'Error',
      mensaje: 'Error al cargar los productos'
    });
  }
}

// obtener un producto por id
async function getProductViewById(req, res) {
  try {
    const product = await getProductById(Number(req.params.id));
    if (!product) {
      return res.status(404).render('error', {
        title: 'Error',
        mensaje: 'Producto no encontrado'
      });
    }
    
    res.render('products/detalle', {
      title: 'Detalle del Producto',
      product
    });
  } catch (error) {
    res.status(500).render('error', {
      title: 'Error',
      mensaje: 'Error al cargar el producto'
    });
  }
}

// eliminar un producto (DELETE)
async function deleteProduct(req, res) {
  try {
    const productId = Number(req.params.id);
    const success = await deleteProductService(productId);
    
    if (!success) {
      return res.status(404).render('error', {
        title: 'Error',
        mensaje: 'Producto no encontrado'
      });
    }
    
    res.redirect('/products');
  } catch (error) {
    res.status(500).render('error', {
      title: 'Error',
      mensaje: 'Error al eliminar el producto'
    });
  }
}

async function listProductsApi(req, res) {
  try {
    const products = await getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getProductApi(req, res) {
  try {
    const product = await getProductById(Number(req.params.id));
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  renderCreateProductForm,
  createProduct,
  renderUpdateProductForm,
  updateProduct,
  listProductsView,
  getProductViewById,
  deleteProduct,
  listProductsApi,
  getProductApi
};