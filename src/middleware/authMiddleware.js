//src\middleware\authMiddleware.js
const { getCurrentUser } = require('../controllers/authController');

function checkRole(role) {
  return (req, res, next) => {
    const user = getCurrentUser(req); 
    if (user && user.role === role) {
      next();
    } else {
      res.status(403).send('Acceso denegado');
    }
  };
}


module.exports = { checkRole };  