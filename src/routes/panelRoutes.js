const express = require('express');
const router = express.Router();

// Ruta para mostrar el panel 
router.get('/', (req, res) => {
  const user = req.user || { username: 'Luis', role: 'admin' }; 
   res.redirect('/panel');
});

module.exports = router;