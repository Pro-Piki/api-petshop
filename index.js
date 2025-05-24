const express = require('express');
const path = require('path');
const app = express();

// Configuraciones
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src', 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // para leer formularios
app.use(express.json()); // para APIs JSON

// Rutas
const turnosRoutes = require('./src/routes/turnos.routes');
app.use('/turnos', turnosRoutes);
const mascotasAdopcionRoutes = require('./src/routes/mascotasAdopcion.routes');
app.use('/mascotasAdopcion', mascotasAdopcionRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
