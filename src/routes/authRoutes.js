// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { login, register, logout } = require('../controllers/authController');
const { authenticateToken, checkRole } = require('../middleware/authMiddleware');


// Vista login
router.get('/login', (req, res) => res.render('login'));

// Envío login
router.post('/login', login);

// Panel protegido por JWT y rol
router.get(
  '/panel',
  authenticateToken,
  checkRole('Admin', 'Empleado', 'Profesional', 'Cliente'),
  (req, res) => {
    res.render('panel', { user: req.user });
  }
);

// Mostrar formulario de registro solo a Admin o Empleado
router.get(
  '/panel/register',
  authenticateToken,
  checkRole('Admin', 'Empleado'),
  (req, res) => {
    res.render('register');
  }
);

// Procesar creación de usuario solo si es Admin o Empleado
router.post(
  '/panel/register',
  authenticateToken,
  checkRole('Admin', 'Empleado'),
  register
);

router.get('/logout', logout);

module.exports = router;