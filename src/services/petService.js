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

async function getPetsByOwnerDni(ownerDni) {
  return await Pet.find({ ownerDni });
}

async function getPetById(id) {
  return await Pet.findById(id);
}

async function updatePetById(id, updatedData) {
  return await Pet.findByIdAndUpdate(id, updatedData, { new: true });
}

async function deletePetById(id) {
  return await Pet.findByIdAndDelete(id);
}


module.exports = {
  getAllPets,
  createPet,
  getPetsByOwnerDni,
  getPetById,
  updatePetById,
  deletePetById
};