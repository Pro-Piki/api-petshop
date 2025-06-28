// src/services/authService.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function getAllUsers() {
  return await User.find();
}

async function findUserByCredentials(username, password) {
  const user = await User.findOne({ username });
  if (!user) return null;

  const match = await bcrypt.compare(password, user.password);
  return match ? user : null;
}

async function createUser(username, password, role) {
  const existing = await User.findOne({ username });
  if (existing) {
    throw new Error('El usuario ya existe');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role });
  await user.save();
  return user;
}

module.exports = {
  getAllUsers,
  findUserByCredentials,
  createUser
};