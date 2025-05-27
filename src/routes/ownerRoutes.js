// src/routes/ownerRoutes.js
const express = require('express');
const router = express.Router();
const { registerOwner, handleOwnerCreation } = require('../controllers/ownerController');
const { getAllOwners } = require('../services/ownerService');

// Formulario HTML
router.get('/register', async (req, res) => {
  const owners = await getAllOwners();
  res.render('registerOwner', { owners });
});

// Ver todos los dueños del JSON
router.get('/json', async (req, res) => {
  const owners = await getAllOwners();
  res.json(owners);
});

// Procesar formulario para agregar nuevo dueño
router.post('/register', registerOwner);

// Agregar nuevo dueño en el JSON
router.post('/api', async (req, res) => {
  const { dni, name, phone, address } = req.body;
  const result = await handleOwnerCreation(dni, name, phone, address);

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  res.status(201).json({
    message: 'Dueño registrado exitosamente.',
    owner: result.owner
  });
});

module.exports = router;
