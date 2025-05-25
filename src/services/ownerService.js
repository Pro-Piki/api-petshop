// src/services/ownerService.js
const fs = require('fs').promises;
const path = require('path');
const Owner = require('../models/class/owner');

const ownersPath = path.join(__dirname, '../data/owners.json');

async function getAllOwners() {
  try {
    const data = await fs.readFile(ownersPath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

async function saveAllOwners(owners) {
  await fs.writeFile(ownersPath, JSON.stringify(owners, null, 2));
}

async function findOwnerByDni(dni) {
  const owners = await getAllOwners();
  return owners.find(o => o.dni === dni);
}

async function registerOwnerIfNotExists(dni, name, phone, address) {
  let owner = await findOwnerByDni(dni);
  let alreadyExists = false;

  if (!owner) {
    const id = Date.now().toString();  
    owner = new Owner(id, dni, name, phone, address);
    const owners = await getAllOwners();
    owners.push(owner);
    await saveAllOwners(owners);
  }  else {
    alreadyExists = true;
  }

  return { owner, alreadyExists };
}

module.exports = {
  getAllOwners,
  saveAllOwners,
  findOwnerByDni,
  registerOwnerIfNotExists
};