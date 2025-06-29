const express = require('express');
const router = express.Router();
const {
  renderCreateProductForm,
  createProduct,
  renderUpdateProductForm,
  updateProduct,
  listProductsView,
  getProductViewById,
  deleteProduct
} = require('../controllers/productController');


router.get('/crear', renderCreateProductForm);
router.post('/crear', createProduct);

router.get('/:id/editar', renderUpdateProductForm);
router.put('/:id', updateProduct);

router.get('/', listProductsView);
router.get('/:id', getProductViewById);
router.delete('/:id', deleteProduct);

module.exports = router;