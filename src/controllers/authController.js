// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const { findUserByCredentials, createUser } = require('../services/authService');
const { secret, expiresIn } = require('../config/jwt');

// LOGIN
async function login(req, res) {
  const { username, password } = req.body;
  const user = await findUserByCredentials(username, password);

  if (!user) {
    return res.status(401).send('Credenciales inválidas');
  }

  const token = jwt.sign(
    { id: user._id, username: user.username, role: user.role },
    secret,
    { expiresIn }
  );

  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    maxAge: 3600000
  });

  res.redirect('/panel');
}

// REGISTRO
async function register(req, res) {
  const { username, password, role } = req.body;

  try {
    await createUser(username, password, role);
    res.redirect('/login');
  } catch (err) {
    console.error('Error al registrar usuario:', err.message);
    res.status(400).send(err.message);
  }
}

function logout(req, res) {
  res.clearCookie('token');
  res.redirect('/login');
}

function getCurrentUser(req) {
  return req.user;
}

module.exports = {
  login,
  register,
  logout,
  getCurrentUser
};