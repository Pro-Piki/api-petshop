const express = require('express');
const path = require('path');
const app = express();

const authRoutes = require('./src/routes/authRoutes');
const petRoutes = require('./src/routes/petRoutes');
const ownerRoutes = require('./src/routes/ownerRoutes'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src/views'));

// Rutas
app.use('/', authRoutes);
app.use('/pets', petRoutes);
app.use('/owners', ownerRoutes); 

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));