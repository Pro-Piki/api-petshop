// src/controllers/petController.js
const { findOwnerByDni } = require('../services/ownerService');
const { getAllPets, createPet } = require('../services/petService');

async function handlePetCreation(name, type, ownerDni, ownerName) {
  const owner = await findOwnerByDni(ownerDni);

  if (!owner) {
    return { error: 'No se encontró un dueño con ese DNI. Primero registre al dueño.' };
  }

  const pet = await createPet(name, type, owner.dni, owner.name);
  return { message: 'Mascota registrada exitosamente.', pet };
}

async function renderRegisterPetForm(req, res) {
  const pets = await getAllPets();
  res.render('registerPet', { pets });
}

async function registerPet(req, res) {
  const { name, type, ownerDni, ownerName } = req.body;
  const result = await handlePetCreation(name, type, ownerDni, ownerName);
  const pets = await getAllPets();

  if (result.error) {
    return res.render('registerPet', { errorMessage: result.error, pets });
  }

  res.redirect('/pets/register');
}

module.exports = {
  registerPet,
  handlePetCreation,
  renderRegisterPetForm
};