// src/controllers/ownerController.js
const { findOwnerByDni, getAllOwners, saveAllOwners } = require('../services/ownerService');
const Owner = require('../models/class/owner');

// Lógica reutilizable para registrar dueños
async function handleOwnerCreation(dni, name, phone, address) {
  const existingOwner = await findOwnerByDni(dni);
  if (existingOwner) {
    return { error: 'Ya existe un dueño con ese DNI.' };
  }

  const id = Date.now().toString();
  const newOwner = new Owner(id, dni, name, phone, address);
  const owners = await getAllOwners();
  owners.push(newOwner);
  await saveAllOwners(owners);

  return { owner: newOwner };
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

  // res.render('registerOwner', {
  //   successMessage: 'Dueño registrado exitosamente.',
  //   owners
  // });
  
  res.redirect('/owners/register');

}

module.exports = {
  registerOwner,
  handleOwnerCreation
};