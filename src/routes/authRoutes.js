// src\routes\authRoutes.js
const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { checkRole } = require('../middleware/authMiddleware');

router.get('/login', (req, res) => res.render('login'));  // Sin restricción de rol
router.post('/login', login);  // El login no debe requerir un rol

// Aplicar `checkRole` en rutas protegidas después del login
router.get('/admin-panel', checkRole('Admin'), (req, res) => {
    res.render('admin-panel');
});

module.exports = router;