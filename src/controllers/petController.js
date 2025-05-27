// src/controllers/petController.js
const { findOwnerByDni } = require('../services/ownerService');
const { getAllPets, saveAllPets, createPet } = require('../services/petService');

// Lógica reutilizable para registrar mascota
async function handlePetCreation(name, type, ownerDni) {
  const owner = await findOwnerByDni(ownerDni);

  if (!owner) {
    return { error: 'No se encontró un dueño con ese DNI. Primero registre al dueño.' };
  }

  const pets = await getAllPets();
  const newPet = await createPet(name, type, owner.dni, owner.name);
  pets.push(newPet);
  await saveAllPets(pets);

  return { message: 'Mascota registrada exitosamente.', pet: newPet };
}

// Renderizar formulario y pasar mascotas
async function renderRegisterPetForm(req, res) {
  const pets = await getAllPets();
  res.render('registerPet', { pets });
}

// Usado por el formulario para agregar nueva mascota
async function registerPet(req, res) {
  const { name, type, ownerDni, ownerName } = req.body;
  const result = await handlePetCreation(name, type, ownerDni, ownerName);

  const pets = await getAllPets();

  if (result.error) {
    return res.render('registerPet', { errorMessage: result.error, pets });
  }

  //res.render('registerPet', { successMessage: result.message, pets });
   res.redirect('/pets/register');
}

module.exports = {
  registerPet,
  handlePetCreation,
  renderRegisterPetForm
};