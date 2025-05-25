const express = require('express');
const router = express.Router();
const {
  renderCreateProductForm,
  createProduct,
  renderUpdateProductForm,
  updateProduct,
  listProductsView,
  getProductViewById,
  deleteProduct,
  listProductsApi,
  getProductApi
} = require('../controllers/productController');


router.get('/crear', renderCreateProductForm);
router.post('/crear', createProduct);

router.get('/:id/editar', renderUpdateProductForm);
router.put('/:id', updateProduct);

router.get('/', listProductsView);
router.get('/:id', getProductViewById);
router.delete('/:id', deleteProduct);


router.get('/api/list', listProductsApi);
router.get('/api/:id', getProductApi);

module.exports = router;