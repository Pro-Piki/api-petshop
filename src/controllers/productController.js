const {
  getAllProducts,
  createProduct: createProductService,
  getProductById,
  updateProduct: updateProductService,
  deleteProduct: deleteProductService
} = require('../services/productService');

async function renderCreateProductForm(req, res) {
  try {
    const products = await getAllProducts();
    res.render('productos/crear', {
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

async function createProduct(req, res) {
  const { nombre, categoria, tipoMascota, precio, stock } = req.body;

  if (!nombre || !categoria || !tipoMascota || !precio || stock == null) {
    const products = await getAllProducts();
    return res.render('productos/crear', {
      title: 'Crear Producto',
      products,
      errorMessage: 'Faltan campos requeridos'
    });
  }

  try {
    await createProductService(nombre, categoria, tipoMascota, precio, stock);
    res.redirect('/productos');
  } catch (error) {
    res.render('productos/crear', {
      title: 'Crear Producto',
      errorMessage: 'Error al crear el producto: ' + error.message,
      products: await getAllProducts()
    });
  }
}

async function renderUpdateProductForm(req, res) {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).render('error', {
        title: 'Error',
        mensaje: 'Producto no encontrado'
      });
    }

    res.render('productos/editar', {
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

async function updateProduct(req, res) {
  try {
    const productId = req.params.id;
    const { nombre, categoria, tipoMascota, precio, stock } = req.body;

    const updatedProduct = await updateProductService(productId, {
      nombre,
      categoria,
      tipoMascota,
      precio,
      stock
    });

    if (!updatedProduct) {
      return res.status(404).render('error', {
        title: 'Error',
        mensaje: 'Producto no encontrado'
      });
    }

    res.redirect('/productos');
  } catch (error) {
    res.status(500).render('products/editar', {
      title: 'Editar Producto',
      errorMessage: 'Error al editar el producto: ' + error.message
    });
  }
}

async function listProductsView(req, res) {
  try {
    const products = await getAllProducts();
    res.render('productos/listar', {
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

async function getProductViewById(req, res) {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).render('error', {
        title: 'Error',
        mensaje: 'Producto no encontrado'
      });
    }

    res.render('productos/detalle', {
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

async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;
    const success = await deleteProductService(productId);

    if (!success) {
      return res.status(404).render('error', {
        title: 'Error',
        mensaje: 'Producto no encontrado'
      });
    }

    res.redirect('/productos');
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
    const product = await getProductById(req.params.id);
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