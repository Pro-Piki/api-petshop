// src/routes/ownerRoutes.js
const express = require('express');
const router = express.Router();
const { registerOwner, handleOwnerCreation } = require('../controllers/ownerController');
const { getAllOwners } = require('../services/ownerService');
const { authenticateToken } = require('../middleware/authMiddleware');
const { getOwnerDetails } = require('../controllers/ownerController');
const Owner = require('../models/Owner');
const { getOwnerById } = require('../controllers/ownerController');
const { deleteOwner } = require('../controllers/ownerController');


router.get('/owners/json', authenticateToken, async (req, res) => {
  const owners = await getAllOwners();
  res.json(owners);
});

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

// Para ver los detalles del cliente
router.get('/details/:id', getOwnerDetails);

// Mostrar formulario para editar cliente
router.get('/edit/:id', async (req, res) => {
  const owner = await getOwnerById(req.params.id);
  if (!owner) {
    return res.status(404).render('error', { title: 'No encontrado', mensaje: 'Cliente no encontrado.' });
  }
  res.render('editOwner', { owner });
});

// Procesar actualización del cliente
router.post('/edit/:id', async (req, res) => {
  const { dni, name, phone, address } = req.body;
  try {
    const owner = await Owner.findByIdAndUpdate(req.params.id, {
      dni,
      name,
      phone,
      address
    });

    if (!owner) {
      return res.status(404).render('error', { title: 'No encontrado', mensaje: 'Cliente no encontrado para editar.' });
    }

    res.redirect('/owners/register');
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    res.status(500).render('error', { title: 'Error', mensaje: 'No se pudo actualizar el cliente.' });
  }
});

// Proceso eliminar un cliente
router.get('/delete/:id', deleteOwner);


module.exports = router;
