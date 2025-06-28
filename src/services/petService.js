// src/services/petService.js
const Pet = require('../models/Pet');

async function getAllPets() {
  return await Pet.find();
}

async function createPet(name, type, ownerDni, ownerName) {
  const pet = new Pet({ name, type, ownerDni, ownerName });
  await pet.save();
  return pet;
}

module.exports = {
  getAllPets,
  createPet
};