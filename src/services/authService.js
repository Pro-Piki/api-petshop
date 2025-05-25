// src\services\authService.js
const fs = require('fs').promises;
const path = require('path');
const User = require('../models/class/user');

const usersPath = path.join(__dirname, '../data/users.json');

async function getAllUsers() {
  const data = await fs.readFile(usersPath, 'utf-8');
  const parsed = data.trim() ? JSON.parse(data) : [];
  return parsed.map(u => new User(u.id, u.username, u.password, u.role));
}

async function findUserByCredentials(username, password) {
  const users = await getAllUsers();
  return users.find(u => u.username === username && u.password === password);
}

module.exports = {
  getAllUsers,
  findUserByCredentials
};