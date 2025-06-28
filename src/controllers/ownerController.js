// src/controllers/ownerController.js
const { findOwnerByDni, getAllOwners, registerOwnerIfNotExists } = require('../services/ownerService');

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

module.exports = {
  registerOwner,
  handleOwnerCreation
};