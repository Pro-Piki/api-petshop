// src/services/petService.js
const fs = require('fs').promises;
const path = require('path');
const Pet = require('../models/class/pet');

const petsPath = path.join(__dirname, '../data/pets.json');

async function getAllPets() {
  try {
    const data = await fs.readFile(petsPath, 'utf-8');
    const rawPets = JSON.parse(data);
    return rawPets.map(p => new Pet(p.name, p.type, p.ownerDni, p.ownerName));
  } catch (err) {
    return [];
  }
}


async function saveAllPets(pets) {
  await fs.writeFile(petsPath, JSON.stringify(pets, null, 2));
}

async function createPet(name, type, ownerDni, ownerName) {
  return new Pet(name, type, ownerDni, ownerName);
}

module.exports = {
  getAllPets,
  saveAllPets,
  createPet
};