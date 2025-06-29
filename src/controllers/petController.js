// src/controllers/petController.js
const { findOwnerByDni } = require('../services/ownerService');
const { getAllPets, createPet } = require('../services/petService');

const petService = require('../services/petService');

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

async function renderPetDetails(req, res) {
  try {
    const petId = req.params.id;
    const pet = await petService.getPetById(petId);

    if (!pet) {
      return res.status(404).render('error', { message: 'Mascota no encontrada' });
    }

    res.render('petDetails', { pet });
  } catch (error) {
    console.error('Error al obtener detalles de mascota:', error);
    res.status(500).render('error', { message: 'Error al cargar detalles de la mascota' });
  }
}

async function renderEditPetForm(req, res) {
  try {
    const petId = req.params.id;
    const pet = await petService.getPetById(petId);

    if (!pet) {
      return res.status(404).render('error', { message: 'Mascota no encontrada' });
    }

    res.render('editPet', { pet });
  } catch (error) {
    console.error('Error al cargar formulario de edición:', error);
    res.status(500).render('error', { message: 'Error al cargar la mascota para edición' });
  }
}

async function updatePet(req, res) {
  try {
    const petId = req.params.id;
    const { name, type, ownerDni, ownerName } = req.body;

    const pet = await petService.updatePetById(petId, {
      name,
      type,
      ownerDni,
      ownerName,
    });

    if (!pet) {
      return res.status(404).render('error', { message: 'Mascota no encontrada' });
    }

    res.redirect('/pets/register');
  } catch (error) {
    console.error('Error al actualizar mascota:', error);
    res.status(500).render('error', { message: 'Error al actualizar la mascota' });
  }
}

async function deletePet(req, res) {
  try {
    const petId = req.params.id;
    const deleted = await petService.deletePetById(petId);

    if (!deleted) {
      return res.status(404).render('error', { message: 'Mascota no encontrada' });
    }

    res.redirect('/pets/register');
  } catch (error) {
    console.error('Error al eliminar mascota:', error);
    res.status(500).render('error', { message: 'Error al eliminar la mascota' });
  }
}


module.exports = {
  registerPet,
  handlePetCreation,
  renderRegisterPetForm,
  renderPetDetails,
  renderEditPetForm,
  updatePet,
  deletePet
};