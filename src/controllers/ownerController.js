// src/controllers/ownerController.js
const { findOwnerByDni, getAllOwners, registerOwnerIfNotExists } = require('../services/ownerService');

const { getOwnerById } = require('../services/ownerService');
const { getPetsByOwnerDni } = require('../services/petService');

const { deleteOwnerById } = require('../services/ownerService');

// Lógica reutilizable para registrar dueños
async function handleOwnerCreation(dni, name, phone, address) {
  const existingOwner = await findOwnerByDni(dni);
  if (existingOwner) {
    return { error: 'Ya existe un dueño con ese DNI.' };
  }

  const result = await registerOwnerIfNotExists(dni, name, phone, address);
  return { owner: result.owner };
}

// Usado por el formulario para agregar nuevo dueño
async function registerOwner(req, res) {
  const { dni, name, phone, address } = req.body;
  const result = await handleOwnerCreation(dni, name, phone, address);
  const owners = await getAllOwners();

  if (result.error) {
    return res.render('registerOwner', {
      errorMessage: result.error,
      owners
    });
  }

  res.redirect('/owners/register');
}

async function getOwnerDetails(req, res) {
  const ownerId = req.params.id;

  try {
    const owner = await getOwnerById(ownerId);

    if (!owner) {
      return res.status(404).render('error', {
        title: 'No encontrado',
        mensaje: 'No se encontró el cliente solicitado.'
      });
    }

    const pets = await getPetsByOwnerDni(owner.dni);

    res.render('ownerDetails', { owner, pets });
  } catch (err) {
    console.error('Error al obtener detalles del cliente:', err);
    res.status(500).render('error', {
      title: 'Error',
      mensaje: 'Hubo un problema al obtener los datos del cliente.'
    });
  }
}

async function deleteOwner(req, res) {
  const ownerId = req.params.id;

  try {
    await deleteOwnerById(ownerId);
    res.redirect('/owners/register');
  } catch (error) {
    console.error('Error al eliminar dueño:', error.message);
    const owners = await getAllOwners();
    res.render('registerOwner', {
      errorMessage: error.message,
      owners
    });
  }
}

module.exports = {
  registerOwner,
  handleOwnerCreation,
  getOwnerDetails,
  getOwnerById,
  deleteOwner
};
