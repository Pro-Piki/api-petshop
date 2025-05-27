// src\controllers\authController.js
const { findUserByCredentials } = require('../services/authService');

async function login(req, res) {
  const { username, password } = req.body;
  const user = await findUserByCredentials(username, password);

  if (user) {
    req.user = user;
    res.render('panel', { user });
  } else {
    res.status(401).send('Credenciales inválidas');
  }
}

module.exports = { login };