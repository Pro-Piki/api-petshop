// src/services/ownerService.js
const Owner = require('../models/Owner');
const Pet = require('../models/Pet');

async function getAllOwners() {
  try {
    return await Owner.find().lean();
  } catch (error) {
    console.error('Error al obtener dueños:', error);
    return [];
  }
}

async function findOwnerByDni(dni) {
  return await Owner.findOne({ dni }).lean();
}

async function registerOwnerIfNotExists(dni, name, phone, address) {
  let alreadyExists = false;

  let owner = await Owner.findOne({ dni });

  if (!owner) {
    owner = new Owner({ dni, name, phone, address });
    await owner.save();
  } else {
    alreadyExists = true;
  }

  return { owner, alreadyExists };
}

async function getOwnerById(id) {
  return await Owner.findById(id);
}

async function deleteOwnerById(id) {
  const owner = await Owner.findById(id);
  if (!owner) throw new Error('Dueño no encontrado');

  const mascotas = await Pet.find({ ownerDni: owner.dni });
  if (mascotas.length > 0) {
    throw new Error('No se puede eliminar un dueño con mascotas asociadas');
  }

  await Owner.findByIdAndDelete(id);
}

module.exports = {
  getAllOwners,
  findOwnerByDni,
  registerOwnerIfNotExists,
  getOwnerById,
  deleteOwnerById 
};