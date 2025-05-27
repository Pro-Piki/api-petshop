const express = require('express');
const router = express.Router();
const {
  listMovementsView,
  renderIncomeForm,
  processIncome,
  renderOutcomeForm,
  processOutcome,
  listMovementsApi
} = require('../controllers/stockController');

router.get('/', listMovementsView);
router.get('/ingreso', renderIncomeForm);
router.post('/ingreso', processIncome);
router.get('/salida', renderOutcomeForm);
router.post('/salida', processOutcome);

router.get('/api/list', listMovementsApi);

module.exports = router;