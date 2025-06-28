// src/services/ownerService.js
const Owner = require('../models/Owner');

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

module.exports = {
  getAllOwners,
  findOwnerByDni,
  registerOwnerIfNotExists
};