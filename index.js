const express = require('express');
const path = require('path');
const app = express();

// Configuraciones
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src', 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas Matayoshi
const authRoutes = require('./src/routes/authRoutes');
const petRoutes = require('./src/routes/petRoutes');
const ownerRoutes = require('./src/routes/ownerRoutes');
app.use('/', authRoutes);
app.use('/pets', petRoutes);
app.use('/owners', ownerRoutes);

// Rutas Ginart
const turnosRoutes = require('./src/routes/turnos.routes');
app.use('/turnos', turnosRoutes);
const mascotasAdopcionRoutes = require('./src/routes/mascotasAdopcion.routes');
app.use('/mascotasAdopcion', mascotasAdopcionRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});