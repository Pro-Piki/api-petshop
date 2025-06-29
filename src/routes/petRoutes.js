// src/routes/petRoutes.js
const express = require('express');
const router = express.Router();
const { registerPet, handlePetCreation, renderRegisterPetForm, renderPetDetails } = require('../controllers/petController');
const { getAllPets } = require('../services/petService');

const { renderEditPetForm, updatePet, deletePet } = require('../controllers/petController');

// Mostrar formulario con tabla de mascotas
router.get('/register', renderRegisterPetForm);

// Ver todas las mascotas en JSON
router.get('/json', async (req, res) => {
  const pets = await getAllPets();
  res.json(pets);
});

// Procesar formulario para agregar nueva mascota
router.post('/register', registerPet);

// Agregar nueva mascota vía API
router.post('/api', async (req, res) => {
  const { name, type, ownerDni, ownerName } = req.body;
  const result = await handlePetCreation(name, type, ownerDni, ownerName);

  if (result.error) {
    return res.status(400).json({ error: result.error });
  }

  res.status(201).json({
    message: result.message,
    pet: result.pet
  });
});

// Para ver el detalle de la mascota
router.get('/details/:id', renderPetDetails);

// Formulario para editar
router.get('/edit/:id', renderEditPetForm);

// Procesar formulario de edición
router.post('/edit/:id', updatePet);

// Eliminar mascota
router.get('/delete/:id', deletePet);

module.exports = router;