// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');

function authenticateToken(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).send('No autenticado');
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send('Token inválido o expirado');
  }
}

function checkRole(...roles) {
  return (req, res, next) => {
    if (req.user && roles.includes(req.user.role)) {
      next();
    } else {
      res.status(403).send('Acceso denegado');
    }
  };
}


module.exports = { authenticateToken, checkRole };